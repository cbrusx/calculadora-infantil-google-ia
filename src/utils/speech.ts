/**
 * Web Speech API helper for friendly kid-oriented Brazilian Portuguese narration.
 */

class SpeechNarrator {
  public enabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Look for pt-BR voices
    const ptVoices = voices.filter(v => v.lang.startsWith('pt'));
    if (ptVoices.length > 0) {
      // Prefer standard pt-BR voice
      const brVoice = ptVoices.find(v => v.lang === 'pt-BR' || v.lang === 'pt_BR');
      this.voice = brVoice || ptVoices[0];
    }
    this.initialized = true;
  }

  speak(text: string) {
    if (!this.enabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95; // slightly relaxed pace for kids
      utterance.pitch = 1.15; // slightly cheerful tone

      if (!this.initialized) {
        this.initVoices();
      }
      if (this.voice) {
        utterance.voice = this.voice;
      }

      window.speechSynthesis.speak(utterance);
    } catch {
      // Safe fallback
    }
  }

  speakOperation(num1: number, op: string, num2: number, result: number | null) {
    if (result === null) {
      this.speak("Atenção amiguinho! Não é possível dividir por zero. Tente outro número!");
      return;
    }

    const opMap: Record<string, string> = {
      '+': 'mais',
      '-': 'menos',
      '*': 'vezes',
      '/': 'dividido por',
    };

    const opWord = opMap[op] || 'operado com';
    const text = `${num1} ${opWord} ${num2} é igual a ${result}! Muito bem!`;
    this.speak(text);
  }
}

export const speech = new SpeechNarrator();
