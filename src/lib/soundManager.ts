// src/lib/soundManager.ts

type Choice = 'A' | 'B' | 'C' | 'D';

const QUESTION_B_VARIANTS = new Set([1, 2, 3, 4, 5, 7, 8, 9]);

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

class SoundManager {
  private bgm: HTMLAudioElement | null = null;
  private currentSfx: HTMLAudioElement | null = null;
  public isMuted: boolean = false;

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgm) {
      this.bgm.muted = this.isMuted;
    }
    if (this.currentSfx) {
      this.currentSfx.muted = this.isMuted;
    }
    return this.isMuted;
  }

  public playBGM(level: number): void {
    if (typeof window === 'undefined') return;
    let file = '/audio/background_music.mp3';
    if (level >= 6 && level <= 10) file = '/audio/background_music_b.mp3';
    if (level >= 11) file = '/audio/background_music_c.mp3';

    if (this.bgm && this.bgm.src.endsWith(file)) {
      this.bgm.muted = this.isMuted;
      if (this.bgm.paused) {
        this.bgm.play().catch(() => {});
      }
      return;
    }

    this.stopBGM();
    this.bgm = new Audio(file);
    this.bgm.loop = true;
    this.bgm.volume = 0.3;
    this.bgm.muted = this.isMuted;
    this.bgm.play().catch(() => {});
  }

  public stopBGM(): void {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm.currentTime = 0;
      this.bgm = null;
    }
  }

  public stopAll(): void {
    this.stopBGM();
    if (this.currentSfx) {
      this.currentSfx.pause();
      this.currentSfx.currentTime = 0;
      this.currentSfx = null;
    }
  }

  public playSFX(path: string, onEnded?: () => void): void {
    if (typeof window === 'undefined') {
      if (onEnded) onEnded();
      return;
    }

    if (this.currentSfx) {
      this.currentSfx.pause();
      this.currentSfx.currentTime = 0;
    }

    const audio = new Audio(path);
    audio.volume = 0.88;
    audio.muted = this.isMuted;
    this.currentSfx = audio;

    if (onEnded) {
      audio.onended = () => onEnded();
      audio.onerror = () => onEnded();
    }

    audio.play().catch(() => {
      if (onEnded) onEnded();
    });
  }

  public playEnterHotSeat(): void {
    this.playSFX(pickRandom(['/audio/gofind.mp3', '/audio/gofind_b.mp3'] as const));
  }

  public playImportantCue(): void {
    this.playSFX('/audio/important.mp3');
  }

  public playVictoryCue(): void {
    this.playSFX('/audio/best_player.mp3');
  }

  public playQuestionSound(level: number): void {
    const safeLevel = Math.min(15, Math.max(1, level));
    if (QUESTION_B_VARIANTS.has(safeLevel) && Math.random() < 0.45) {
      this.playSFX(`/audio/ques${safeLevel}_b.mp3`);
      return;
    }
    this.playSFX(`/audio/ques${safeLevel}.mp3`);
  }

  public playAnswerSound(choice: Choice): void {
    const c = choice.toLowerCase();
    this.playSFX(pickRandom([`/audio/ans_${c}.mp3`, `/audio/ans_${c}2.mp3`] as const));
  }

  public playSuspense(): void {
    this.playSFX(
      pickRandom(['/audio/ans_now1.mp3', '/audio/ans_now2.mp3', '/audio/ans_now3.mp3'] as const)
    );
  }

  public playCorrectSound(choice: Choice): void {
    const c = choice.toLowerCase();
    this.playSFX(
      pickRandom([
        `/audio/true_${c}.mp3`,
        `/audio/true_${c}2.mp3`,
        `/audio/true_${c}3.mp3`,
      ] as const)
    );
  }

  public playWrongSound(correctChoice?: Choice): void {
    if (correctChoice) {
      const c = correctChoice.toLowerCase();
      this.playSFX(pickRandom([`/audio/lose_${c}.mp3`, `/audio/lose_${c}2.mp3`] as const));
      return;
    }
    this.playSFX(pickRandom(['/audio/lose.mp3', '/audio/lose2.mp3'] as const));
  }

  public play5050(): void {
    this.playSFX(pickRandom(['/audio/sound5050.mp3', '/audio/sound5050_2.mp3'] as const));
  }

  public playCallFriend(): void {
    this.playSFX('/audio/call.mp3');
  }

  public playWiseMen(): void {
    this.playSFX('/audio/hoi_y_kien_chuyen_gia_01b.mp3');
  }

  public playAskAudience(): void {
    this.playSFX('/audio/khan_gia.mp3');
  }

  public playMilestone1(): void {
    this.playSFX(
      pickRandom(['/audio/chuc_mung_vuot_moc_01_0.mp3', '/audio/chuc_mung_vuot_moc_01_1.mp3'] as const)
    );
  }

  public playMilestone2(): void {
    this.playSFX('/audio/chuc_mung_vuot_moc_02_0.mp3');
  }

  public playOutOfTime(): void {
    this.playSFX('/audio/out_of_time.mp3');
  }
}

export const soundManager = new SoundManager();
