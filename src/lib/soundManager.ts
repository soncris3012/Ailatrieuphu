// src/lib/soundManager.ts

class SoundManager {
  private bgm: HTMLAudioElement | null = null;
  private currentSfx: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  constructor() {}

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

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playBGM(level: number) {
    if (typeof window === 'undefined') return;
    
    // Select appropriate BGM based on tier
    let bgmFile = '/audio/background_music.mp3';
    if (level >= 6 && level <= 10) {
      bgmFile = '/audio/background_music_b.mp3';
    } else if (level >= 11) {
      bgmFile = '/audio/background_music_c.mp3';
    }

    if (this.bgm && this.bgm.src.endsWith(bgmFile)) {
      return; // Already playing this track
    }

    this.stopBGM();

    try {
      this.bgm = new Audio(bgmFile);
      this.bgm.loop = true;
      this.bgm.volume = 0.35;
      this.bgm.muted = this.isMuted;
      this.bgm.play().catch(() => {});
    } catch {}
  }

  public stopBGM() {
    if (this.bgm) {
      this.bgm.pause();
      this.bgm = null;
    }
  }

  public playSFX(fileName: string, volume: number = 0.8): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }
      
      try {
        if (this.currentSfx) {
          this.currentSfx.pause();
          this.currentSfx = null;
        }

        const audio = new Audio(`/audio/${fileName}`);
        audio.volume = volume;
        audio.muted = this.isMuted;
        this.currentSfx = audio;

        audio.onended = () => {
          resolve();
        };
        audio.onerror = () => {
          resolve();
        };

        audio.play().catch(() => {
          resolve();
        });
      } catch {
        resolve();
      }
    });
  }

  public stopSFX() {
    if (this.currentSfx) {
      this.currentSfx.pause();
      this.currentSfx = null;
    }
  }

  public playQuestionSound(level: number) {
    const soundFile = `ques${level}.mp3`;
    return this.playSFX(soundFile, 0.9);
  }

  public playAnswerSound(choice: 'A' | 'B' | 'C' | 'D') {
    const soundFile = `ans_${choice.toLowerCase()}.mp3`;
    return this.playSFX(soundFile, 0.85);
  }

  public playSuspense() {
    return this.playSFX('ans_now1.mp3', 0.85);
  }

  public playCorrectSound(choice: 'A' | 'B' | 'C' | 'D') {
    const soundFile = `true_${choice.toLowerCase()}.mp3`;
    return this.playSFX(soundFile, 0.95);
  }

  public playWrongSound() {
    return this.playSFX('lose.mp3', 0.95);
  }

  public play5050() {
    return this.playSFX('sound5050.mp3', 0.85);
  }

  public playCallFriend() {
    return this.playSFX('call.mp3', 0.85);
  }

  public playWiseMen() {
    return this.playSFX('hoi_y_kien_chuyen_gia_01b.mp3', 0.85);
  }

  public playMilestone1() {
    return this.playSFX('chuc_mung_vuot_moc_01_0.mp3', 1.0);
  }

  public playMilestone2() {
    return this.playSFX('chuc_mung_vuot_moc_02_0.mp3', 1.0);
  }

  public playOutOfTime() {
    return this.playSFX('out_of_time.mp3', 0.9);
  }
}

export const soundManager = new SoundManager();
