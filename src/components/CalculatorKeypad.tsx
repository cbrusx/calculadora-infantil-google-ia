import React, { useEffect } from 'react';
import { Delete, RotateCcw, Volume2, Sparkles, Equal } from 'lucide-react';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';

interface CalculatorKeypadProps {
  num1: number;
  setNum1: (n: number) => void;
  op: string;
  setOp: (op: string) => void;
  num2: number;
  setNum2: (n: number) => void;
  result: number | null;
  setResult: (r: number | null) => void;
  displayValue: string;
  setDisplayValue: (v: string) => void;
  currentInput: 'num1' | 'num2';
  setCurrentInput: (target: 'num1' | 'num2') => void;
  historyText: string;
  setHistoryText: (h: string) => void;
}

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  num1,
  setNum1,
  op,
  setOp,
  num2,
  setNum2,
  result,
  setResult,
  displayValue,
  setDisplayValue,
  currentInput,
  setCurrentInput,
  historyText,
  setHistoryText,
}) => {
  const handleDigit = (digit: string) => {
    sound.playNumber(parseInt(digit, 10));

    if (result !== null && currentInput === 'num1') {
      // Starting fresh after prior equals
      setDisplayValue(digit);
      setNum1(parseInt(digit, 10));
      setResult(null);
      setHistoryText('');
      return;
    }

    if (displayValue === '0' || (currentInput === 'num2' && num2 === 0 && displayValue === '0')) {
      setDisplayValue(digit);
    } else {
      // Limit to 6 digits to keep child friendly
      if (displayValue.length >= 6) return;
      setDisplayValue(displayValue + digit);
    }

    const val = parseInt(displayValue === '0' ? digit : displayValue + digit, 10);
    if (currentInput === 'num1') {
      setNum1(val);
    } else {
      setNum2(val);
    }
  };

  const handleSelectOp = (selectedOp: string) => {
    sound.playPop(520);
    setOp(selectedOp);
    setCurrentInput('num2');
    setDisplayValue('0');
    setResult(null);

    const opSymbolMap: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
    };
    setHistoryText(`${num1} ${opSymbolMap[selectedOp] || selectedOp}`);
  };

  const handleCalculate = () => {
    let res: number | null = null;
    if (op === '+') res = num1 + num2;
    else if (op === '-') res = num1 - num2;
    else if (op === '*') res = num1 * num2;
    else if (op === '/') {
      if (num2 === 0) res = null;
      else res = num1 / num2;
    }

    const opSymbolMap: Record<string, string> = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
    };

    setResult(res);
    setHistoryText(`${num1} ${opSymbolMap[op] || op} ${num2} =`);

    if (res !== null) {
      sound.playSuccess();
      setDisplayValue(res.toString());
      speech.speakOperation(num1, op, num2, res);
    } else {
      sound.playBoing();
      setDisplayValue('Erro');
      speech.speakOperation(num1, op, num2, null);
    }
  };

  const handleClear = () => {
    sound.playBoing();
    setNum1(0);
    setNum2(0);
    setOp('+');
    setResult(null);
    setCurrentInput('num1');
    setDisplayValue('0');
    setHistoryText('');
  };

  const handleBackspace = () => {
    sound.playPop(300);
    if (displayValue.length <= 1) {
      setDisplayValue('0');
      if (currentInput === 'num1') setNum1(0);
      else setNum2(0);
    } else {
      const nextVal = displayValue.slice(0, -1);
      setDisplayValue(nextVal);
      const parsed = parseInt(nextVal, 10) || 0;
      if (currentInput === 'num1') setNum1(parsed);
      else setNum2(parsed);
    }
  };

  const handleSpeakCurrent = () => {
    if (result !== null) {
      speech.speakOperation(num1, op, num2, result);
    } else {
      speech.speak(`Você digitou ${displayValue}`);
    }
  };

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
        handleDigit(e.key);
      } else if (e.key === '+') {
        handleSelectOp('+');
      } else if (e.key === '-') {
        handleSelectOp('-');
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        handleSelectOp('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleSelectOp('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalculate();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayValue, currentInput, num1, num2, op, result]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border-4 border-amber-300">
      {/* Screen Display */}
      <div className="bg-slate-950 rounded-2xl p-4 sm:p-5 mb-5 border-2 border-slate-800 shadow-inner">
        <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1 min-h-[20px]">
          <span>{historyText || 'Digite uma continha...'}</span>
          <button
            onClick={handleSpeakCurrent}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors bg-slate-800/80 px-2 py-0.5 rounded-md"
            title="Ouvir a conta falada"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Ouvir</span>
          </button>
        </div>

        {/* Big Display Number */}
        <div className="text-right text-4xl sm:text-5xl font-black font-mono tracking-tight text-white overflow-hidden text-ellipsis select-none">
          {displayValue}
        </div>
      </div>

      {/* 4 Basic Operations Bar (Prominent & Colored for Children) */}
      <div className="grid grid-cols-4 gap-2.5 mb-3.5">
        <button
          onClick={() => handleSelectOp('+')}
          className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md ${
            op === '+' && currentInput === 'num2'
              ? 'bg-sky-400 text-slate-950 ring-4 ring-sky-200'
              : 'bg-sky-500 hover:bg-sky-400 text-white'
          }`}
          title="Adição (Somar)"
        >
          <span className="text-2xl sm:text-3xl font-black leading-none">+</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Somar</span>
        </button>

        <button
          onClick={() => handleSelectOp('-')}
          className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md ${
            op === '-' && currentInput === 'num2'
              ? 'bg-orange-400 text-slate-950 ring-4 ring-orange-200'
              : 'bg-orange-500 hover:bg-orange-400 text-white'
          }`}
          title="Subtração (Diminuir)"
        >
          <span className="text-2xl sm:text-3xl font-black leading-none">−</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Tirar</span>
        </button>

        <button
          onClick={() => handleSelectOp('*')}
          className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md ${
            op === '*' && currentInput === 'num2'
              ? 'bg-purple-400 text-slate-950 ring-4 ring-purple-200'
              : 'bg-purple-500 hover:bg-purple-400 text-white'
          }`}
          title="Multiplicação (Vezes)"
        >
          <span className="text-2xl sm:text-3xl font-black leading-none">×</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Vezes</span>
        </button>

        <button
          onClick={() => handleSelectOp('/')}
          className={`h-14 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-md ${
            op === '/' && currentInput === 'num2'
              ? 'bg-emerald-400 text-slate-950 ring-4 ring-emerald-200'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white'
          }`}
          title="Divisão (Repartir)"
        >
          <span className="text-2xl sm:text-3xl font-black leading-none">÷</span>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Repartir</span>
        </button>
      </div>

      {/* Numeric Keypad Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map(digit => (
          <button
            key={digit}
            onClick={() => handleDigit(digit.toString())}
            className="h-14 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-2xl font-bold text-slate-100 transition-all transform active:scale-95 shadow-sm border border-slate-700/50 flex items-center justify-center"
          >
            {digit}
          </button>
        ))}

        {/* Bottom row: Clear, 0, Backspace */}
        <button
          onClick={handleClear}
          className="h-14 sm:h-15 rounded-2xl bg-rose-600/80 hover:bg-rose-500 text-white font-bold text-sm transition-all transform active:scale-95 shadow-sm flex items-center justify-center gap-1"
          title="Limpar tudo (Recomeçar)"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Limpar</span>
        </button>

        <button
          onClick={() => handleDigit('0')}
          className="h-14 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-2xl font-bold text-slate-100 transition-all transform active:scale-95 shadow-sm border border-slate-700/50 flex items-center justify-center"
        >
          0
        </button>

        <button
          onClick={handleBackspace}
          className="h-14 sm:h-15 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition-all transform active:scale-95 shadow-sm flex items-center justify-center"
          title="Apagar último número"
        >
          <Delete className="w-5 h-5" />
        </button>
      </div>

      {/* Big Cheerful Equals Button */}
      <button
        onClick={handleCalculate}
        className="w-full mt-3.5 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xl sm:text-2xl transition-all transform active:scale-98 shadow-lg flex items-center justify-center gap-2"
      >
        <Equal className="w-7 h-7 stroke-[3]" />
        <span>VER RESULTADO</span>
        <Sparkles className="w-5 h-5" />
      </button>
    </div>
  );
};
