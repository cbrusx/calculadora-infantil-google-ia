import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';

interface TopNavProps {
  activeTab: 'calculator' | 'quiz' | 'python' | 'terminal';
  setActiveTab: (tab: 'calculator' | 'quiz' | 'python' | 'terminal') => void;
  audioEnabled: boolean;
  setAudioEnabled: (val: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  audioEnabled,
  setAudioEnabled,
}) => {
  const toggleAudio = () => {
    const nextState = !audioEnabled;
    setAudioEnabled(nextState);
    sound.enabled = nextState;
    speech.enabled = nextState;
    if (nextState) {
      sound.playSuccess();
    }
  };

  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-50">
      {/* Zone 1: Single Brand Wordmark */}
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs text-xl">
          🐾
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
            Calculadora Infantil
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:block">
            4 Operações Básicas da Matemática
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => {
            sound.playPop(500);
            setActiveTab('calculator');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'calculator'
              ? 'bg-amber-100 text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🔢 Calculadora
        </button>

        <button
          onClick={() => {
            sound.playPop(550);
            setActiveTab('quiz');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'quiz'
              ? 'bg-emerald-100 text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🎮 Joguinho
        </button>

        <button
          onClick={() => {
            sound.playPop(600);
            setActiveTab('python');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'python'
              ? 'bg-sky-100 text-sky-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          🐍 Código Python
        </button>

        <button
          onClick={() => {
            sound.playPop(650);
            setActiveTab('terminal');
          }}
          className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'terminal'
              ? 'bg-purple-100 text-purple-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          💻 Testar no Terminal
        </button>
      </nav>

      {/* Zone 3: Primary Action / Audio Narration Control */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleAudio}
          title={audioEnabled ? 'Sons e voz ativados (clique para silenciar)' : 'Sons mutados (clique para ativar)'}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
            audioEnabled
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
          }`}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden md:inline">
            {audioEnabled ? 'Som & Voz Ativos' : 'Som Mutado'}
          </span>
        </button>
      </div>
    </header>
  );
};
