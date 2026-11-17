#!/usr/bin/env python3
"""Replace all rows in Supabase `questions` table with the clean 15,000-question bank."""

import json
import os
import sys
import urllib.error
import urllib.request

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env.local")
DATA_PATH = os.path.join(BASE_DIR, "data", "questions_15k.json")
BATCH_SIZE = 500


def load_env(path: str) -> dict:
    env = {}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def rest_request(url: str, key: str, method: str, endpoint: str, data=None, extra_headers=None):
    req_url = f"{url.rstrip('/')}/rest/v1/{endpoint.lstrip('/')}"
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
    }
    if extra_headers:
        headers.update(extra_headers)
    body = json.dumps(data, ensure_ascii=False).encode("utf-8") if data is not None else None
    req = urllib.request.Request(req_url, data=body, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.status, dict(resp.headers), resp.read().decode("utf-8", errors="replace")


def parse_content_range_total(headers: dict) -> int:
    for k, v in headers.items():
        if k.lower() == "content-range" and "/" in v:
            total_part = v.split("/")[-1].strip()
            return int(total_part) if total_part.isdigit() else 0
    return 0


def get_count(url: str, key: str, query_suffix: str = "") -> int:
    endpoint = "questions?select=id" + (f"&{query_suffix}" if query_suffix else "")
    _, headers, _ = rest_request(
        url,
        key,
        "HEAD",
        endpoint,
        extra_headers={"Prefer": "count=exact", "Range": "0-0"},
    )
    return parse_content_range_total(headers)


def main():
    env = load_env(ENV_PATH)
    supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or env.get("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or env.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
    if not supabase_url or not supabase_key:
        raise RuntimeError("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local")

    with open(DATA_PATH, encoding="utf-8") as f:
        questions = json.load(f)

    if len(questions) != 15000:
        raise RuntimeError(f"Expected 15000 questions in {DATA_PATH}, found {len(questions)}")

    before_count = get_count(supabase_url, supabase_key)
    print(f"Existing Supabase rows before cleanup: {before_count}")

    for filt in ("id=gt.0", "id=gte.0"):
        status, _, _ = rest_request(
            supabase_url,
            supabase_key,
            "DELETE",
            f"questions?{filt}",
            extra_headers={"Prefer": "return=minimal"},
        )
        print(f"DELETE /rest/v1/questions?{filt} -> HTTP {status}")

    after_delete = get_count(supabase_url, supabase_key)
    print(f"Rows remaining after delete: {after_delete}")
    if after_delete != 0:
        raise RuntimeError(f"Table not empty after delete ({after_delete} rows left)! Aborting insert.")

    total_batches = (len(questions) + BATCH_SIZE - 1) // BATCH_SIZE
    for i in range(0, len(questions), BATCH_SIZE):
        chunk = questions[i : i + BATCH_SIZE]
        batch_no = i // BATCH_SIZE + 1
        status, _, _ = rest_request(
            supabase_url,
            supabase_key,
            "POST",
            "questions",
            data=chunk,
            extra_headers={"Prefer": "return=minimal"},
        )
        print(f"Batch {batch_no:2d}/{total_batches} ({len(chunk)} rows) -> HTTP {status}")

    total_after = get_count(supabase_url, supabase_key)
    print(f"\nVerified total rows in Supabase `questions`: {total_after}")
    if total_after != 15000:
        raise RuntimeError(f"Expected 15000 total rows after upload, got {total_after}")

    for lv in range(1, 16):
        c = get_count(supabase_url, supabase_key, f"level=eq.{lv}")
        print(f"  Level {lv:2d}: {c} rows")
        if c != 1000:
            raise RuntimeError(f"Level {lv} has {c} rows in Supabase, expected 1000!")

    print("\nSUCCESS: All 15,000 editorial VTV3 questions uploaded and verified (1,000 per level).")


if __name__ == "__main__":
    try:
        main()
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"HTTP Error {e.code}: {body}", file=sys.stderr)
        sys.exit(1)
