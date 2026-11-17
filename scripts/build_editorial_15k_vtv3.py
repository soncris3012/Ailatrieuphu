# scripts/build_editorial_15k_vtv3.py
# Builds the Editorial-Grade 15,000 Native Vietnamese Question Bank for "Ai Là Triệu Phú" (VTV3)
# Strict 4-Tier Difficulty Calibration, ZERO machine-translated English trivia,
# Strict interrogative & anti-giveaway/anti-duplicate/anti-self-answering quality gates.

import os
import sys
import re
import json
import sqlite3
import tarfile
import random
import unicodedata
from collections import Counter, defaultdict

random.seed(20261118)

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPTS_DIR)
CACHE_DIR = "/tmp/altp_vn_sources"

sys.path.append(SCRIPTS_DIR)
import curated_vtv3_warmup as cvw
import banks_data as bd
import native_bank_easy as nbe
import native_bank_more as nbm
import vietnamese_t1_rich_bank as vtr
import vietnamese_t1_part2 as vtp2
import vietnamese_t1_part3 as vtp3
import vietnamese_t1_part4 as vtp4
import vietnamese_t1_part5 as vtp5
import vietnamese_t1_part6 as vtp6
import vtv3_curated_banks as vcb

STOPWORDS = {
    'là', 'gì', 'nào', 'của', 'và', 'trong', 'có', 'được', 'với', 'cho', 'khi', 'từ',
    'năm', 'bao', 'nhiêu', 'đâu', 'ai', 'người', 'sau', 'đây', 'một', 'những', 'các',
    'tại', 'về', 'bằng', 'theo', 'gọi', 'tên', 'biết', 'đến', 'thường', 'để', 'làm',
    'nhất', 'nổi', 'tiếng', 'thuộc', 'nằm', 'ở', 'loại', 'nước', 'nếu', 'hay', 'vào',
    'ra', 'trên', 'dưới', 'còn', 'thiếu', 'câu', 'điền', 'chữ', 'hãy', 'chọn', 'đúng',
    'mà', 'bị', 'đã', 'sẽ', 'cùng', 'vì', 'do', 'nên', 'qua', 'lại', 'hiện', 'nay'
}

SELF_ANS_HELPERS = {
    'tỉnh', 'thành', 'phố', 'tp', 'nước', 'quốc', 'gia', 'con', 'quả', 'trái', 'cây',
    'hoa', 'người', 'sông', 'núi', 'biển', 'đảo', 'quần', 'hồ', 'màu', 'tiếng',
    'tháng', 'năm', 'ngày', 'nhà', 'văn', 'thơ', 'nhạc', 'sĩ', 'họa', 'đồng', 'bộ',
    'cái', 'chiếc', 'khu', 'vực', 'dãy', 'đèo', 'vịnh', 'chùa', 'đền', 'làng', 'loài',
    'bánh', 'món', 'củ', 'hạt', 'chất', 'khí', 'kim', 'nguyên', 'tố', 'động', 'vật'
}

EXAM_FORMULA_BLACKLIST = [
    'atlat', 'át-lát', 'biểu đồ', 'bảng số liệu', 'hình vẽ', 'hình bên', 'hình ảnh trên',
    'sơ đồ', 'đoạn trích', 'đoạn tư liệu', 'khổ thơ trên', 'bài thơ trên', 'đoạn văn trên',
    'nhận xét nào sau đây', 'nội dung nào sau đây phản ánh', 'căn cứ vào', 'theo bảng',
    '$', '\\frac', '\\sqrt', '^2', 'm/s', 'mol/', 'mol ', 'điện trở', 'cường độ dòng điện',
    'biên độ dao động', 'tần số góc', 'từ thông', 'suất điện động', 'quang phổ',
    'tỉnh hà tây', '64 tỉnh', '61 tỉnh', 'chưa có tỉnh đắc nông', 'chưa có tỉnh đắk nông',
    'webcame', 'sfone', 'yahoo messenger', 'imagine cup', 'mô hình osi', 'hust là',
    'trong tiếng anh là tháng', 'quốc khánh của quốc gia nào', 'đầu số của mạng di động',
    'windows xp', 'chương trình pascal', 'ngôn ngữ lập trình c++', 'phenomenon',
    'biển số xe dân sự nào'
]

VA_SUBJECTIVE_FILLER = [
    'nổi bật hơn so với', 'mang ý nghĩa gì', 'nổi tiếng vì điều gì',
    'đóng vai trò gì', 'ý nghĩa gì trong', 'tạo nên sự khác biệt nào',
    'tại sao câu', 'được biết đến với đặc điểm nào nổi bật nhất',
    'có tác động như thế nào đến'
]

GIVEAWAY_OPTION_PATTERNS = [
    r'^cả\s*(a|b|c|hai|ba|4|bốn)\b',
    r'^tất\s*cả\b',
    r'^không\s*(có|phải|phương\s*án|đáp\s*án)',
    r'^a\s*(,|và)\s*b\b',
    r'^b\s*(,|và)\s*c\b',
    r'^đáp\s*án\s*khác\b',
    r'^cả\s*hai\s*đáp\s*án',
    r'^tất\s*cả\s*đều'
]

T1_BANNED_TERMS = [
    'patton', 'macarthur', 'mcarthur', 'truman', 'watergate', 'vaaler', 'teutoburg',
    'jutland', 'sobieski', 'magna carta', 'armada', 'chanakya', 'arthashastra',
    'kalidasa', 'toussaint', 'gallipoli', 'petrarch', 'habsburg', 'charlemagne',
    'euglena', 'paraskevidekatriaphobia', 'ti lạp thể', 'ribosome', 'axit nucleic',
    'arpanet', 'gary thuerk', 'moliere', 'poquelin', 'ostrogoth', 'byzantine',
    'alexander đại đế', 'napoléon', 'napoleon', 'louis xiv', 'louis xvi', 'hiệp ước',
    'chiến lược toàn cầu', 'cục diện', 'trật tự hai cực', 'ianta', 'potsdam',
    'versailles', 'kế hoạch mác-san', 'nato', 'asean là tổ chức gì', 'nguyên tử khối',
    'hóa trị của', 'nhiệt độ nóng chảy', 'quá trình giảm phân', 'nguyên phân',
    'đột biến gen', 'nhiễm sắc thể', 'arn thông tin', 'điện phân nóng chảy',
    'polime', 'este', 'lipit', 'peptit', 'ishtar', 'dillinger', 'daytona',
    'super bowl', 'nhl', 'nfl', 'ncaa', 'mlb', 'nascar', 'cắt lớp', 'hằng số',
    'sau công nguyên', 'trước công nguyên', 'socrates', 'peloponnese',
    'alexander hamilton', 'muhammad', 'minsk', 'reykjavik', 'belarus', 'hemlock'
]


def nfc(s):
    if s is None:
        return ""
    return unicodedata.normalize("NFC", str(s))


def clean_text(s):
    s = nfc(s).replace('\u200b', '').replace('\xa0', ' ')
    s = re.sub(r'\s+', ' ', s).strip()
    return s


def clean_question_stem(q):
    q = clean_text(q)
    # Strip question number tags like "Câu 1:", "Câu 12.", "(Câu 177)"
    q = re.sub(r'^\(?(?:Câu|Mã|ID)\s*\d*\)?\s*[:\.\-]?\s*', '', q, flags=re.I)
    q = re.sub(r'\s*\((?:Câu|Mã|ID|Lần|Tư liệu)[^)]*\)\s*', ' ', q, flags=re.I)
    q = re.sub(r'\s+', ' ', q).strip()
    # Fix common Vietnamese typos from legacy DBs
    q = re.sub(r'\blà gỉ\?', 'là gì?', q, flags=re.I)
    q = re.sub(r'\bđang cai\b', 'đăng cai', q, flags=re.I)
    return q


def clean_option(o):
    o = clean_text(o)
    o = re.sub(r'^[A-Da-d][\.\:\)]\s+', '', o)
    # Strip trailing period unless it's abbreviation like D.C., Jr., Tp.
    if len(o) > 2 and o.endswith('.') and not o.endswith(('D.C.', 'Jr.', 'Sr.', 'St.', 'Ltd.', 'Inc.')):
        o = o[:-1].strip()
    return o


def ensure_interrogative(q, opts):
    if '?' in q:
        return q
    # Do not force '?' onto multi-sentence broken fragments or ellipses without interrogative ending
    q_strip = q.rstrip(' .,:;')
    ql = q_strip.lower()
    if ql.endswith(' là gì') or ql.endswith(' là ai') or ql.endswith(' ở đâu') or ql.endswith(' bao nhiêu') or ql.endswith(' khi nào'):
        return q_strip + '?'
    # If stem ends cleanly with " là" or " là:" and options don't look like continuation clauses
    if re.search(r'\s+là$', ql) and not any(o[0].islower() for o in opts if o):
        return q_strip + ' gì?'
    if q_strip.endswith('...'):
        return q_strip + '?'
    return None


def norm_tokens(s):
    words = re.findall(r'[0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+', nfc(s).lower())
    return [w for w in words if w not in STOPWORDS and len(w) >= 2]


def core_answer_tokens(ans):
    words = re.findall(r'[0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+', nfc(ans).lower())
    return [w for w in words if w not in STOPWORDS and w not in SELF_ANS_HELPERS and not w.isdigit()]


def is_self_answering(q, correct_opt):
    ql = " " + re.sub(r'[^\w\s]', ' ', nfc(q).lower()) + " "
    ql = re.sub(r'\s+', ' ', ql)
    cl = re.sub(r'[^\w\s]', ' ', nfc(correct_opt).lower()).strip()
    cl = re.sub(r'\s+', ' ', cl)
    # Remove parenthetical alias when checking
    cl_main = re.sub(r'\s*\([^)]*\)', '', correct_opt.lower()).strip()
    cl_main_clean = re.sub(r'\s+', ' ', re.sub(r'[^\w\s]', ' ', cl_main)).strip()

    # Check if stripped core answer tokens form a multi-char phrase literally in the question
    core_toks = core_answer_tokens(cl_main)
    if core_toks:
        phrase = " ".join(core_toks)
        if len(phrase) >= 4 and f" {phrase} " in ql:
            return True
    # Also check exact cl_main if >= 4 chars and not pure number
    if len(cl_main_clean) >= 4 and not cl_main_clean.isdigit() and f" {cl_main_clean} " in ql:
        return True
    return False


def has_giveaway_or_bad_options(opts, ans_idx):
    # Check length balance
    ans_len = len(opts[ans_idx])
    wrong_lens = [len(o) for i, o in enumerate(opts) if i != ans_idx]
    if ans_len > 28 and ans_len > 2.1 * max(wrong_lens):
        return True
    # Check forbidden "all of the above" / "both A and B" options
    for o in opts:
        ol = o.lower().strip()
        for pat in GIVEAWAY_OPTION_PATTERNS:
            if re.match(pat, ol):
                return True
    # Check near-identical pairs among options (e.g. "Pierre Coubertin" vs "Pierre de Coubertin")
    tok_sets = []
    for o in opts:
        s = set(w for w in re.findall(r'[0-9a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+', o.lower()) if w not in {'de', 'the', 'of', 'và', 'của', 'tỉnh', 'tp'})
        tok_sets.append(s)
    for i in range(4):
        for j in range(i + 1, 4):
            if tok_sets[i] and tok_sets[j]:
                jacc = len(tok_sets[i] & tok_sets[j]) / len(tok_sets[i] | tok_sets[j])
                if jacc >= 0.85:
                    return True
    return False


def normalize_category(cat_raw, q_text="", opt_text=""):
    c = nfc(cat_raw).lower().strip()
    full_text = nfc(q_text + " " + opt_text).lower()

    if any(k in c for k in ['sport', 'thể thao', 'bóng đá', 'olympic']) or any(k in full_text for k in ['world cup', 'olympic', 'sea games', 'cầu thủ', 'bóng đá', 'quần vợt', 'bóng chuyền', 'bóng rổ', 'grand slam', 'huy chương vàng']):
        return "Thể thao"
    if any(k in c for k in ['ẩm thực', 'food']) or any(k in full_text for k in ['món ăn', 'đặc sản', 'nước mắm', 'bánh chưng', 'bánh tét', 'bánh xèo', 'bún bò', 'canh cua', 'gói bằng lá']):
        return "Ẩm thực & Văn hóa"
    if any(k in c for k in ['văn học', 'thơ', 'truyện', 'tiểu thuyết']) or any(k in full_text for k in ['nhà thơ', 'nhà văn', 'tác phẩm', 'tiểu thuyết', 'truyện kiều', 'tập thơ', 'bài thơ', 'câu ca dao', 'câu tục ngữ', 'cổ tích', 'nhân vật']):
        return "Văn học"
    if any(k in c for k in ['lịch sử', 'quân sự']) or any(k in full_text for k in ['vua ', 'triều đại', 'khởi nghĩa', 'chiến dịch', 'chiến tranh', 'thống tướng', 'hiệp ước', 'đế quốc', 'cách mạng', 'bạch đằng', 'điện biên phủ', 'tổng thống', 'hoàng đế']):
        return "Lịch sử"
    if any(k in c for k in ['địa lý', 'tỉnh', 'quốc gia', 'thành phố']) or any(k in full_text for k in ['thủ đô', 'tỉnh lỵ', 'châu lục', 'con sông', 'dãy núi', 'đỉnh núi', 'quần đảo', 'hòn đảo', 'đại dương', 'sa mạc', 'eo biển']):
        return "Địa lý"
    if any(k in c for k in ['nghệ thuật', 'âm nhạc', 'hội họa', 'điện ảnh', 'phim', 'sân khấu', 'kiến trúc', 'music', 'art']) or any(k in full_text for k in ['bài hát', 'ca khúc', 'nhạc sĩ', 'ca sĩ', 'họa sĩ', 'bức tranh', 'bức họa', 'bộ phim', 'đạo diễn', 'diễn viên', 'giải oscar', 'nhạc cụ', 'đàn bầu', 'múa rối']):
        return "Nghệ thuật & Giải trí"
    if any(k in c for k in ['khoa học', 'hóa học', 'vật lý', 'sinh học', 'thiên văn', 'trái đất', 'phát minh', 'công nghệ', 'động vật', 'thực vật', 'cơ thể', 'thiên nhiên']) or any(k in full_text for k in ['nguyên tố', 'hóa học', 'vật lý', 'sinh học', 'hành tinh', 'hệ mặt trời', 'tế bào', 'nhiệt độ', 'động vật', 'thực vật', 'loài chim', 'loài cá', 'quang hợp', 'vitamin', 'hóa thạch']):
        return "Khoa học & Tự nhiên"
    if any(k in c for k in ['văn hóa', 'xã hội', 'giáo dục công dân', 'thần thoại', 'di sản']):
        return "Văn hóa & Xã hội"
    return "Đời sống & Thường thức"


def is_tier1_allowed(q_text, opts):
    full = nfc(q_text + " " + " ".join(opts)).lower()
    if any(t in full for t in T1_BANNED_TERMS):
        return False
    if re.search(r'\b(tcn|scn)\b', full):
        return False
    # Avoid obscure years outside landmark Vietnamese / modern cultural range
    years = re.findall(r'\b(1[0-9]{3})\b', full)
    allowed_easy_years = {'1945', '1954', '1975', '1930', '1911', '1890', '1969', '1010', '1789', '1288', '1428', '1976', '2008', '2018', '2022', '2023', '2024', '2025'}
    for y in years:
        if y not in allowed_easy_years:
            return False
    if 'vào năm nào' in q_text.lower() or 'khoảng năm nào' in q_text.lower():
        for o in opts:
            om = re.findall(r'\b(\d{3,4})\b', o)
            for y in om:
                if y not in allowed_easy_years:
                    return False
    return True


def is_proverb_fill(q_text):
    ql = q_text.lower()
    return ql.startswith('điền') or 'câu tục ngữ' in ql or 'câu thành ngữ' in ql or 'câu ca dao' in ql


# ---------------------------------------------------------------------------
# Candidate Storage & Editorial Pipeline
# Priority score: higher is cleaner/more editorial
# ---------------------------------------------------------------------------
all_candidates = []  # list of dicts


def push_candidate(source_name, priority, raw_level, category, q_raw, opts_raw, ans_idx_or_letter):
    q = clean_question_stem(q_raw)
    if not q or len(q) < 14 or len(q) > 210:
        return
    opts = [clean_option(o) for o in opts_raw]
    if len(opts) != 4 or any(len(o) == 0 or len(o) > 75 for o in opts):
        return
    if len(set(o.lower() for o in opts)) < 4:
        return

    # Normalize answer index 0..3
    ans_idx = None
    if isinstance(ans_idx_or_letter, int):
        if 0 <= ans_idx_or_letter <= 3:
            ans_idx = ans_idx_or_letter
    elif isinstance(ans_idx_or_letter, str):
        s = ans_idx_or_letter.strip().upper()
        if s in ('A', 'B', 'C', 'D'):
            ans_idx = 'ABCD'.index(s)
        elif s in ('1', '2', '3', '4'):
            ans_idx = int(s) - 1
        else:
            sc = clean_option(ans_idx_or_letter).lower()
            for idx, o in enumerate(opts):
                if o.lower() == sc:
                    ans_idx = idx
                    break
    if ans_idx is None:
        return

    q = ensure_interrogative(q, opts)
    if not q or '?' not in q:
        return

    full_lower = (q + ' ' + ' '.join(opts)).lower()
    if any(b in full_lower for b in EXAM_FORMULA_BLACKLIST):
        return
    if any(b in full_lower for b in VA_SUBJECTIVE_FILLER):
        return

    # Catch broken historic bug: Versailles + World War II, Division 308 + 1969, etc.
    if 'thế giới thứ hai' in full_lower and 'versailles' in full_lower:
        return
    if 'sư đoàn 308' in full_lower and '1969' in full_lower:
        return
    if 'trong tiếng anh' in full_lower and 'tháng' in full_lower:
        return
    # Guard against weird typos like "cách mạng hố lớn", "đại hội ... xẩy ra" typo
    if 'mặt trước của tờ' in full_lower and '500 đồng' in full_lower:
        return

    if is_self_answering(q, opts[ans_idx]):
        return
    if has_giveaway_or_bad_options(opts, ans_idx):
        return

    cat_vn = normalize_category(category, q, ' '.join(opts))
    lv = max(1, min(15, int(raw_level)))

    # Enforce difficulty sanity
    if lv <= 5 and not is_tier1_allowed(q, opts):
        lv = 7 if source_name in ('vietanalytics', 'Question_sqlite', 'ledinhtuyen') else 6
    # Cap proverb fill-in-the-blank to Level 1-3
    if is_proverb_fill(q) and lv > 3:
        lv = 2

    all_candidates.append({
        'source': source_name,
        'priority': priority,
        'level': lv,
        'category': cat_vn,
        'question': q,
        'opts': opts,
        'ans_idx': ans_idx,
        'is_proverb': is_proverb_fill(q),
    })


print("=== NẠP NGUỒN DỮ LIỆU THUẦN VIỆT ===")

# 1. Curated VTV3 Warmup (Highest priority for Tầng 1 variety)
for lv, cat, q, ans, d1, d2, d3 in cvw.CURATED_VTV3_WARMUP:
    push_candidate('curated_warmup', 100, lv, cat, q, [ans, d1, d2, d3], 0)

# 2. Local curated native T1 banks (vtr, vtp2, vtp4-6, nbe, nbm, vcb + selective vtp3)
for src_name, items in [
    ('vtr', vtr.RICH_T1_QUESTIONS),
    ('vtp2', vtp2.MORE_T1_QUESTIONS),
    ('vtp4', vtp4.FINAL_EXPANSION_QUESTIONS),
    ('vtp5', vtp5.EXTRA_AUTHENTIC_QUESTIONS),
    ('vtp6', vtp6.TOPUP_T1_QUESTIONS),
    ('nbe', nbe.EASY_QUESTIONS),
    ('nbm', nbm.MORE_VIETNAMESE_QUESTIONS),
]:
    for it in items:
        lv, cat, q, a, b, c, d, ans = it
        push_candidate(src_name, 92, lv, cat, q, [a, b, c, d], ans)

# From vtp3, keep only non-repetitive non-license-plate questions (license plates are skipped via EXAM_FORMULA_BLACKLIST anyway)
for it in vtp3.EXPANDED_T1_QUESTIONS:
    lv, cat, q, a, b, c, d, ans = it
    push_candidate('vtp3', 90, lv, cat, q, [a, b, c, d], ans)

for q_stem, ans, d1, d2, d3 in vcb.PROVERBS_LEVEL_1:
    push_candidate('vcb', 88, 1, 'Văn học', f"Điền từ còn thiếu vào câu tục ngữ: '{q_stem} ...'?", [ans, d1, d2, d3], 0)
for q, ans, d1, d2, d3 in vcb.EVERYDAY_LIFE_LEVEL_1:
    push_candidate('vcb', 92, 1, 'Đời sống & Thường thức', q, [ans, d1, d2, d3], 0)
for q, ans, d1, d2, d3 in vcb.FOLKTALES_LEVEL_2:
    push_candidate('vcb', 92, 2, 'Văn học', q, [ans, d1, d2, d3], 0)
for q, ans, d1, d2, d3 in vcb.PROVINCES_AND_TOURISM_LEVEL_3:
    push_candidate('vcb', 92, 3, 'Địa lý', q, [ans, d1, d2, d3], 0)
for q, ans, d1, d2, d3 in vcb.ELEMENTARY_KNOWLEDGE_LEVEL_4:
    push_candidate('vcb', 92, 4, 'Khoa học & Tự nhiên', q, [ans, d1, d2, d3], 0)
for q, ans, d1, d2, d3 in vcb.CURATED_CAPITALS_LEVEL_5:
    push_candidate('vcb', 92, 5, 'Địa lý', q, [ans, d1, d2, d3], 0)

# 3. Fixed banks_data.py with PROPER plausible distractors (NEVER fixed dummy cities!)
prov_names = [p[0] for p in bd.PROVINCES_63]
prov_centers = list(dict.fromkeys([p[1] for p in bd.PROVINCES_63 if p[1] not in prov_names]))
for p in bd.PROVINCES_63:
    name, center, region, landmark, food, feat = p
    same_reg_provs = [x[0] for x in bd.PROVINCES_63 if x[2] == region and x[0] != name]
    other_provs = [x for x in prov_names if x != name]
    d_provs = random.sample(same_reg_provs, min(2, len(same_reg_provs)))
    while len(d_provs) < 3:
        cand = random.choice(other_provs)
        if cand not in d_provs:
            d_provs.append(cand)
    push_candidate('banks_data', 85, 3, 'Địa lý', f"Địa danh thắng cảnh '{landmark}' nổi tiếng tọa lạc tại tỉnh hay thành phố nào?", [name] + d_provs, 0)
    d_foods = random.sample([x for x in other_provs], 3)
    push_candidate('banks_data', 85, 2, 'Ẩm thực & Văn hóa', f"Món đặc sản '{food}' nức tiếng gần xa là đặc sản nổi tiếng của địa phương nào?", [name] + d_foods, 0)
    if center != name:
        c_pool = [x[1] for x in bd.PROVINCES_63 if x[1] != center and x[1] != name]
        d_centers = random.sample(c_pool, 3)
        push_candidate('banks_data', 82, 4, 'Địa lý', f"Trung tâm hành chính (tỉnh lỵ) của tỉnh {name} là thành phố hoặc thị xã nào?", [center] + d_centers, 0)

cap_by_cont = defaultdict(list)
all_caps = [c[1] for c in bd.COUNTRIES_WORLD]
all_curr = list(dict.fromkeys(c[3].split('(')[0].strip() for c in bd.COUNTRIES_WORLD))
for c in bd.COUNTRIES_WORLD:
    cap_by_cont[c[2]].append(c[1])

for name, cap, cont, curr, lang in bd.COUNTRIES_WORLD:
    if cap == name:
        continue
    pool_caps = [x for x in cap_by_cont[cont] if x != cap]
    if len(pool_caps) < 3:
        pool_caps = [x for x in all_caps if x != cap]
    d_caps = random.sample(pool_caps, 3)
    easy_countries = {'Việt Nam', 'Lào', 'Campuchia', 'Thái Lan', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Pháp', 'Đức', 'Vương quốc Anh', 'Hoa Kỳ (Mỹ)', 'Nga', 'Úc (Australia)', 'Canada'}
    lv_cap = 5 if name in easy_countries else 8
    push_candidate('banks_data', 85, lv_cap, 'Địa lý', f"Thủ đô của quốc gia {name} là thành phố nào?", [cap] + d_caps, 0)
    # Continent question for well-known countries (Levels 4-7)
    all_conts = ['Châu Á', 'Châu Âu', 'Châu Mỹ', 'Châu Phi', 'Châu Đại Dương']
    d_conts = random.sample([ct for ct in all_conts if ct != cont], 3)
    push_candidate('banks_data', 83, 4 if name in easy_countries else 7, 'Địa lý', f"Quốc gia {name} nằm ở châu lục nào trên bản đồ thế giới?", [cont] + d_conts, 0)
    # Currency question for iconic distinct currencies (Level 4-6)
    curr_main = curr.split('(')[0].strip()
    if curr_main and 'Euro' not in curr_main and 'Đô la Mỹ' not in curr_main and name not in {'Việt Nam', 'Nhật Bản', 'Hàn Quốc', 'Thái Lan'}:
        d_currs = random.sample([cr for cr in all_curr if cr != curr_main], 3)
        push_candidate('banks_data', 83, 5 if name in easy_countries else 8, 'Đời sống & Thường thức', f"Đơn vị tiền tệ chính thức lưu hành tại quốc gia {name} là đồng gì?", [curr_main] + d_currs, 0)

el_names = [e[0] for e in bd.ELEMENTS_CHEMISTRY]
el_syms = [e[1] for e in bd.ELEMENTS_CHEMISTRY]
for name, sym, num, feat, desc in bd.ELEMENTS_CHEMISTRY:
    d_syms = random.sample([s for s in el_syms if s != sym], 3)
    push_candidate('banks_data', 86, 6, 'Khoa học & Tự nhiên', f"Ký hiệu hóa học của nguyên tố {name} trong bảng tuần hoàn là gì?", [sym] + d_syms, 0)
    d_els = random.sample([e for e in el_names if e != name], 3)
    push_candidate('banks_data', 86, 9, 'Khoa học & Tự nhiên', f"Nguyên tố hóa học nào có đặc điểm '{feat}'?", [name] + d_els, 0)

for q, a, b, c, d, cat, lv in bd.HISTORICAL_VN:
    push_candidate('banks_data', 92, lv, cat, q, [a, b, c, d], 0)
for q, a, b, c, d, cat, lv in bd.LITERATURE_VN:
    push_candidate('banks_data', 92, lv, cat, q, [a, b, c, d], 0)
for q, a, b, c, d, cat, lv in bd.SPORTS_DATA:
    push_candidate('banks_data', 92, lv, cat, q, [a, b, c, d], 0)
for q, a, b, c, d, cat, lv in bd.ARTS_AND_MUSIC:
    push_candidate('banks_data', 92, lv, cat, q, [a, b, c, d], 0)

# 4. m1804, m1805, m1806 SQLite (Genuine VTV3 broadcast questions)
for p in ['/tmp/m1804.sqlite', '/tmp/m1805.sqlite', '/tmp/m1806.sqlite']:
    if os.path.exists(p):
        conn = sqlite3.connect(p)
        cu = conn.cursor()
        for tbl, lv_pool in [('CauHoiDe', [1, 2, 3, 4, 5]), ('CauHoiThuong', [6, 7, 8, 9]), ('CauHoiKho', [11, 12, 13, 14])]:
            try:
                cu.execute(f"SELECT cauHoi, dapAnA, dapAnB, dapAnC, dapAnD, cauTraLoi FROM {tbl}")
                for q, a, b, c, d, ans in cu.fetchall():
                    lv = random.choice(lv_pool)
                    push_candidate('m18xx', 96, lv, 'VTV3', q, [a, b, c, d], ans)
            except Exception:
                pass
        conn.close()

# 5. buiducnhat.json (1,204 curated VTV3 questions)
with open(os.path.join(CACHE_DIR, 'buiducnhat.json'), encoding='utf-8') as f:
    for it in json.load(f):
        push_candidate('buiducnhat', 95, it.get('level', 5), it.get('category', ''), it['question'], it['options'], it['answer'])

# 6. duongbui_1..5.json
for i in range(1, 6):
    with open(os.path.join(CACHE_DIR, f'duongbui_{i}.json'), encoding='utf-8') as f:
        for it in json.load(f):
            opts_map = it.get('options', {})
            opts = [opts_map.get(k, '') for k in ('A', 'B', 'C', 'D')]
            push_candidate('duongbui', 94, it.get('level', 1), 'VTV3', it['question'], opts, it.get('answer', 'A'))

# 7. Question_sqlite (filtered carefully)
sq_path = os.path.join(PROJECT_DIR, 'Question_sqlite')
if os.path.exists(sq_path):
    conn = sqlite3.connect(sq_path)
    cu = conn.cursor()
    for lv in range(1, 16):
        cu.execute(f"SELECT question, casea, caseb, casec, cased, truecase FROM Question{lv}")
        for q, a, b, c, d, ans in cu.fetchall():
            push_candidate('Question_sqlite', 76, lv, 'VTV3', q, [a, b, c, d], ['A', 'B', 'C', 'D'][int(ans) - 1])
    conn.close()

# 8. ledinhtuyen.sql (filtered carefully)
lt_path = os.path.join(CACHE_DIR, 'ledinhtuyen.sql')
sql_raw = open(lt_path, encoding='utf-8', errors='ignore').read()
lt_rows = re.findall(
    r"\(\d+,\s*(\d+),\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*'((?:\\'|[^'])*)',\s*(\d+),\s*\d+\)",
    sql_raw
)
for lv_s, q, a, b, c, d, ans_s in lt_rows:
    push_candidate(
        'ledinhtuyen', 72, int(lv_s), 'VTV3',
        q.replace("\\'", "'"),
        [x.replace("\\'", "'") for x in (a, b, c, d)],
        ['A', 'B', 'C', 'D'][int(ans_s) - 1]
    )

# 9. vietanalytics_chibi (39 pure VI topic files ONLY! Skip data/en/ and data/zh/)
VA_T1_ELIGIBLE_FILES = {
    '11_Lich_su_Viet_Nam.json',
    '12_Dia_ly_Viet_Nam.json',
    '12_Sinh_hoc_Dong_vat.json',
    '13_Sinh_hoc_Dong_vat.json',
    '13_Sinh_hoc_Thuc_vat_nam.json',
    '14_Sinh_hoc_Co_the_nguoi.json',
    '14_Sinh_hoc_Thuc_vat_Nam.json',
    '15_Sinh_hoc_Co_the_nguoi.json',
    '17_Khoa_hoc_Vat_ly.json',
    '18_Khoa_hoc_Hoa_hoc.json',
    '19_Khoa_hoc_Thien_van.json',
    '20_Khoa_hoc_Trai_Dat.json',
    '22_Dia_ly_Viet_Nam.json',
    '23_Van_hoa_Viet_Nam.json',
    '24_Van_hoa_the_gioi.json',
    '25_Hoi_hoa_Kien_truc.json',
    '26_Am_nhac_San_khau.json',
    '27_Than_thoai_Van_hoc.json',
    '28_The_thao_Olympic.json',
}

va_tar = os.path.join(CACHE_DIR, 'vietanalytics_chibi.tar.gz')
with tarfile.open(va_tar, 'r:gz') as tf:
    for m in tf.getmembers():
        if m.isfile() and m.name.endswith('.json'):
            parts = m.name.split('/')
            if len(parts) == 3 and parts[1] == 'data':
                fname = os.path.basename(m.name)
                t1_eligible = fname in VA_T1_ELIGIBLE_FILES
                items = json.load(tf.extractfile(m))
                for it in items:
                    muc = int(it.get('muc_do', 8))
                    cat_raw = it.get('linh_vuc', '') or it.get('chu_de', '')
                    q_txt = str(it.get('cau_hoi', ''))
                    opts = [it.get('A', ''), it.get('B', ''), it.get('C', ''), it.get('D', '')]
                    if muc <= 5:
                        if t1_eligible:
                            if fname.startswith(('17_', '18_', '19_', '20_', '24_', '25_')):
                                mapped_lv = 2 if muc == 1 else (3 if muc == 2 else (4 if muc <= 4 else 5))
                            else:
                                mapped_lv = 2 if muc == 1 else (3 if muc <= 3 else (4 if muc == 4 else 5))
                        else:
                            mapped_lv = 6 if muc <= 3 else 7
                    elif muc <= 10:
                        mapped_lv = muc
                    else:
                        # Check if genuinely specialized (years, proper nouns, scientific terminology) vs generic textbook prompt
                        has_specifics = bool(re.search(r'\b1[0-9]{3}\b|\b20[0-2][0-9]\b|[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zà-ỹ]+\s+[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]', q_txt))
                        if has_specifics or len(q_txt) >= 62:
                            mapped_lv = muc
                        else:
                            mapped_lv = random.choice([7, 8, 9, 10])
                    push_candidate('vietanalytics', 84, mapped_lv, cat_raw, q_txt, opts, it.get('dap_an', 'A'))

# 10. cleaned_VNHSGE.json (Official national curriculum MCQ, L6-L15)
with open(os.path.join(CACHE_DIR, 'cleaned_VNHSGE.json'), encoding='utf-8') as f:
    for idx, it in enumerate(json.load(f)):
        cat = it.get('category_original_lang', '')
        if cat in ('Toán học', 'Tiếng Anh', 'Ngữ văn'):
            continue
        opts = it.get('options', [])
        if len(opts) != 4:
            continue
        # Distribute across Tầng 2, Tầng 3, and harder History/Bio/Phys in Tầng 4
        lv_v = 6 + (idx % 10)  # L6..L15
        push_candidate('cleaned_vnhsge', 78, lv_v, cat, it.get('question', ''), opts, str(it.get('answer', '1')))

# 11. xdao_vnhsge.tar.gz (Official national exam files mapped by question index difficulty!)
xdao_tar = os.path.join(CACHE_DIR, 'xdao_vnhsge.tar.gz')
with tarfile.open(xdao_tar, 'r:gz') as tf:
    for m in tf.getmembers():
        if m.isfile() and m.name.endswith('.json') and '/VNHSGE-V/JSON format/' in m.name:
            subj = m.name.split('/')[-2]
            if subj in ('Mathematics', 'English', 'Literature'):
                continue
            try:
                items = json.load(tf.extractfile(m))
            except Exception:
                continue
            subj_map = {
                'History': 'Lịch sử',
                'Geography': 'Địa lý',
                'CivicEducation': 'Văn hóa & Xã hội',
                'Biology': 'Khoa học & Tự nhiên',
                'Physics': 'Khoa học & Tự nhiên',
                'Chemistry': 'Khoa học & Tự nhiên',
            }
            cat_vn = subj_map.get(subj, 'Khoa học & Tự nhiên')
            for idx, it in enumerate(items):
                if it.get('Image_Question') or it.get('Image_Answer'):
                    continue
                qraw = it.get('Question', '')
                ans = str(it.get('Choice', '')).strip().upper()
                match = re.search(r'\n\s*A[\.\:]\s*(.*?)\n\s*B[\.\:]\s*(.*?)\n\s*C[\.\:]\s*(.*?)\n\s*D[\.\:]\s*(.*)$', qraw, re.S)
                if not match:
                    continue
                stem = qraw[:match.start()].strip()
                opts = list(match.groups())
                # Real exam progression: first items easier (L6-8), middle (L9-10), final deep items (L11-15)
                if idx < 15:
                    lv_x = 6 + (idx % 3)
                elif idx < 26:
                    lv_x = 9 + (idx % 2)
                elif idx < 34:
                    lv_x = 11 + (idx % 3)
                else:
                    lv_x = 14 + (idx % 2)
                push_candidate('xdao_vnhsge', 82, lv_x, cat_vn, stem, opts, ans)

# 12. VMLU train + valid (Academic university/specialized Tầng 3-4)
for fn in ['vmlu_train.jsonl', 'vmlu_valid.jsonl']:
    with open(os.path.join(CACHE_DIR, fn), encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if not line.strip():
                continue
            obj = json.loads(line)
            ch = obj.get('choices', [])
            ans = obj.get('answer', '')
            if len(ch) == 4 and ans in ('A', 'B', 'C', 'D'):
                lv_vm = 14 if idx % 2 == 0 else 15
                push_candidate('vmlu', 86, lv_vm, 'Khoa học & Tự nhiên', obj['question'], ch, ans)

print(f"Tổng ứng viên thô đạt bộ lọc hình thức ban đầu: {len(all_candidates)}")
by_src = Counter(c['source'] for c in all_candidates)
print("Phân bổ theo nguồn trước khử trùng ngữ nghĩa:", dict(by_src))

# ---------------------------------------------------------------------------
# Global Deduplication (Exact Normalized Question + Semantic Near-Duplicate Filter)
# Sort by priority descending so highest editorial quality version ALWAYS wins!
# ---------------------------------------------------------------------------
all_candidates.sort(key=lambda c: (-c['priority'], -len(c['question'])))

seen_exact = set()
seen_by_answer = defaultdict(list)  # ans_lower -> list of token sets
deduped = []
removed_exact = 0
removed_semantic = 0

for c in all_candidates:
    norm_q = re.sub(r'[^\w\s]', '', c['question'].lower())
    norm_q = re.sub(r'\s+', ' ', norm_q).strip()
    if norm_q in seen_exact:
        removed_exact += 1
        continue

    ans_key = re.sub(r'[^\w\s]', '', c['opts'][c['ans_idx']].lower()).strip()
    ans_key = re.sub(r'\s+', ' ', ans_key)
    toks = set(norm_tokens(c['question']))

    is_sem_dup = False
    if toks and len(ans_key) >= 2:
        for prev_toks in seen_by_answer[ans_key]:
            j = len(toks & prev_toks) / len(toks | prev_toks)
            if j >= 0.50:
                is_sem_dup = True
                break

    if is_sem_dup:
        removed_semantic += 1
        continue

    seen_exact.add(norm_q)
    seen_by_answer[ans_key].append(toks)
    deduped.append(c)

print(f"Sau khử trùng: {len(deduped)} câu duy nhất! (loại {removed_exact} trùng hoàn toàn, {removed_semantic} cận trùng ngữ nghĩa)")

raw_lv_counts = Counter(c['level'] for c in deduped)
print("Ứng viên sạch theo level gốc:", sorted(raw_lv_counts.items()))

# ---------------------------------------------------------------------------
# Assemble Exactly 1,000 Questions Per Level (Levels 1..15)
# Respect Tầng 1..4 boundaries cleanly + Cap proverbs + Cap identical answers
# ---------------------------------------------------------------------------
pools = {lv: [] for lv in range(1, 16)}
for c in deduped:
    pools[c['level']].append(c)

# Shuffle inside identical priority buckets so categories interleave naturally
for lv in range(1, 16):
    random.shuffle(pools[lv])
    pools[lv].sort(key=lambda c: -c['priority'])

PROVERB_CAPS = {1: 200, 2: 145, 3: 80, 4: 35}
selected = {lv: [] for lv in range(1, 16)}
ans_cap_per_level = defaultdict(Counter)
proverb_used = Counter()
used_ids = set()


def try_add(target_lv, cand):
    cid = id(cand)
    if cid in used_ids:
        return False
    if cand['is_proverb']:
        cap = PROVERB_CAPS.get(target_lv, 0)
        if proverb_used[target_lv] >= cap:
            return False
    if target_lv <= 5 and not is_tier1_allowed(cand['question'], cand['opts']):
        return False
    ans_txt = cand['opts'][cand['ans_idx']].lower().strip()
    max_same = 12 if target_lv <= 5 else 8
    if ans_cap_per_level[target_lv][ans_txt] >= max_same:
        return False

    used_ids.add(cid)
    selected[target_lv].append(cand)
    ans_cap_per_level[target_lv][ans_txt] += 1
    if cand['is_proverb']:
        proverb_used[target_lv] += 1
    return True


# Pass 1: Take each candidate at its primary calibrated level
for lv in range(1, 16):
    for cand in pools[lv]:
        if len(selected[lv]) >= 1000:
            break
        try_add(lv, cand)

# Pass 2: Top up any underfilled levels WITHIN the same Tier first!
TIERS = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13],
    [14, 15],
]

for tier in TIERS:
    # Build leftover pool from this tier
    tier_leftovers = []
    for src_lv in tier:
        for cand in pools[src_lv]:
            if id(cand) not in used_ids:
                tier_leftovers.append(cand)
    random.shuffle(tier_leftovers)
    tier_leftovers.sort(key=lambda c: -c['priority'])

    for target_lv in tier:
        for cand in tier_leftovers:
            if len(selected[target_lv]) >= 1000:
                break
            try_add(target_lv, cand)

print("\n=== TRẠNG THÁI SAU PHÂN BỔ NỘI BỘ 4 TẦNG ===")
for lv in range(1, 16):
    print(f"  Level {lv:2d}: {len(selected[lv])}/1000 (Tục ngữ/ca dao: {proverb_used[lv]})")

# Pass 3: Cross-adjacent backfill ONLY if needed (strictly respecting T1 boundaries!)
# Tầng 1 can borrow L6 easy items that pass is_tier1_allowed; Tầng 2/3/4 can borrow adjacent non-proverb leftovers.
all_leftovers = [c for lv in range(1, 16) for c in pools[lv] if id(c) not in used_ids]
all_leftovers.sort(key=lambda c: -c['priority'])

backfill_order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
for target_lv in backfill_order:
    if len(selected[target_lv]) >= 1000:
        continue
    # Sort leftovers by closeness to target_lv
    ranked = sorted(
        (c for c in all_leftovers if id(c) not in used_ids),
        key=lambda c: (abs(c['level'] - target_lv), -c['priority'])
    )
    for cand in ranked:
        if len(selected[target_lv]) >= 1000:
            break
        # Hard rules to keep Tầng 1 warm-up pure:
        if target_lv <= 4 and cand['source'] in ('cleaned_vnhsge', 'xdao_vnhsge', 'vmlu'):
            continue
        if target_lv <= 3 and cand['level'] > 6:
            continue
        if target_lv == 4 and cand['level'] > 8:
            continue
        if target_lv == 5 and cand['level'] > 10:
            continue
        # Never allow L1-2 super easy items into L11-15
        if target_lv >= 11 and cand['level'] < 8:
            continue
        try_add(target_lv, cand)

print("\n=== KẾT QUẢ PHÂN BỔ CUỐI CÙNG (15 CẤP ĐỘ) ===")
final_list = []
ans_dist = Counter()
cat_dist = Counter()
src_dist = Counter()

for lv in range(1, 16):
    items = selected[lv]
    if len(items) != 1000:
        raise RuntimeError(f"Level {lv} has {len(items)} questions, expected 1000!")
    random.shuffle(items)
    for c in items:
        opts = list(c['opts'])
        correct_text = opts[c['ans_idx']]
        random.shuffle(opts)
        new_letter = ['A', 'B', 'C', 'D'][opts.index(correct_text)]
        ans_dist[new_letter] += 1
        cat_dist[c['category']] += 1
        src_dist[c['source']] += 1
        final_list.append({
            'level': lv,
            'difficulty': lv,
            'category': c['category'],
            'question': c['question'],
            'option_a': opts[0],
            'option_b': opts[1],
            'option_c': opts[2],
            'option_d': opts[3],
            'correct_answer': new_letter,
        })
    print(f"  Level {lv:2d}: {len(items)} câu (tục ngữ: {proverb_used[lv]})")

print(f"\nTỔNG CỘNG: {len(final_list)} CÂU HỎI THUẦN VIỆT!")
print("Phân bố đáp án đúng:", dict(ans_dist))
print("Phân bố chuyên đề:", dict(cat_dist))
print("Phân bố theo nguồn:", dict(src_dist))

out_paths = [
    os.path.join(PROJECT_DIR, 'src/data/questions_15k.json'),
    os.path.join(PROJECT_DIR, 'data/questions_15k.json'),
]
for p in out_paths:
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)
    print(f"Đã ghi: {p}")
