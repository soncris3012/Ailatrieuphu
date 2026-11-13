// src/types/game.ts

export type LifelineType = '5050' | 'phone' | 'companion' | 'sage';

export interface Question {
  id?: number;
  level: number;
  category: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  difficulty: number;
}

export interface GameSetup {
  playerName: string;
  companionName: string;
  companionRelation: string;
  companionField: string;
  phoneFriendName: string;
  sage1Name: string;
  sage1Field: string;
  sage2Name: string;
  sage2Field: string;
}

export interface PrizeLevel {
  level: number;
  prize: number;
  prizeFormatted: string;
  isMilestone: boolean;
  hasCheck: boolean;
}

export const PRIZE_LADDER: PrizeLevel[] = [
  { level: 15, prize: 150000000, prizeFormatted: '150.000.000 ₫', isMilestone: true, hasCheck: true },
  { level: 14, prize: 85000000, prizeFormatted: '85.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 13, prize: 60000000, prizeFormatted: '60.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 12, prize: 40000000, prizeFormatted: '40.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 11, prize: 30000000, prizeFormatted: '30.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 10, prize: 22000000, prizeFormatted: '22.000.000 ₫', isMilestone: true, hasCheck: true },
  { level: 9, prize: 14000000, prizeFormatted: '14.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 8, prize: 10000000, prizeFormatted: '10.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 7, prize: 6000000, prizeFormatted: '6.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 6, prize: 3000000, prizeFormatted: '3.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 5, prize: 2000000, prizeFormatted: '2.000.000 ₫', isMilestone: true, hasCheck: false },
  { level: 4, prize: 1000000, prizeFormatted: '1.000.000 ₫', isMilestone: false, hasCheck: false },
  { level: 3, prize: 600000, prizeFormatted: '600.000 ₫', isMilestone: false, hasCheck: false },
  { level: 2, prize: 400000, prizeFormatted: '400.000 ₫', isMilestone: false, hasCheck: false },
  { level: 1, prize: 200000, prizeFormatted: '200.000 ₫', isMilestone: false, hasCheck: false }
];

export const CATEGORIES = [
  'Lịch sử',
  'Địa lý',
  'Khoa học',
  'Văn học',
  'Hội họa',
  'Âm nhạc',
  'Thể thao',
  'Văn hóa xã hội',
  'Kinh tế',
  'Công nghệ',
  'Ẩm thực',
  'Thiên nhiên'
];

export const COMPANION_RELATIONS = [
  'Bạn thân',
  'Vợ',
  'Chồng',
  'Người yêu',
  'Bố',
  'Mẹ',
  'Đồng nghiệp',
  'Anh trai',
  'Chị gái',
  'Em',
  'Họ hàng'
];
