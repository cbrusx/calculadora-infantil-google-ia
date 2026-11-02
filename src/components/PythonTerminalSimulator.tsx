import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Send, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface TerminalLine {
  text: string;
  type: 'system' | 'prompt' | 'input' | 'success' | 'warning' | 'story';
}

export const PythonTerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '============================================================', type: 'system' },
    { text: '           🐾 CALCULADORA INFANTIL EM PYTHON 🐾', type: 'system' },
    { text: '    Uma calculadora simples e divertida para crianças!', type: 'system' },
    { text: '============================================================', type: 'system' },
    { text: 'Escolha o que você quer fazer:', type: 'system' },
    { text: '  [1] ➕ Adição       (Juntar / Somar)', type: 'system' },
    { text: '  [2] ➖ Subtração    (Tirar / Diminuir)', type: 'system' },
    { text: '  [3] ✖️ Multiplicação (Grupinhos / Vezes)', type: 'system' },
    { text: '  [4] ➗ Divisão      (Repartir igualmente)', type: 'system' },
    { text: '  [5] 🍫 Porcentagem  (Pedacinhos de 100 - Chocolate)', type: 'system' },
    { text: '  [6] ❌ Sair', type: 'system' },
    { text: '============================================================', type: 'system' },
    { text: 'Digite o número da operação (1, 2, 3, 4, 5 ou 6):', type: 'prompt' },
  ]);

  const [step, setStep] = useState<'op' | 'num1' | 'num2' | 'continue'>('op');
  const [selectedOp, setSelectedOp] = useState<string>('1');
  const [storedNum1, setStoredNum1] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleSend = (overrideVal?: string) => {
    const val = (overrideVal !== undefined ? overrideVal : inputValue).trim();
    if (!val && step !== 'continue') return;

    sound.playPop(480);
    setInputValue('');

    const newLines = [...lines];

    if (step === 'op') {
      newLines.push({ text: `> ${val}`, type: 'input' });

      if (val === '6') {
        newLines.push({ text: '\n🌟 Muito obrigado por estudar matemática hoje! Até a próxima! 👋\n', type: 'success' });
        setStep('continue');
        setLines(newLines);
        return;
      }

      if (!['1', '2', '3', '4', '5'].includes(val)) {
        newLines.push({ text: '⚠️ Ops! Digite um número de 1 a 6, tá bom?', type: 'warning' });
        newLines.push({ text: 'Digite o número da operação (1, 2, 3, 4, 5 ou 6):', type: 'prompt' });
        setLines(newLines);
        return;
      }

      const opNames: Record<string, string> = {
        '1': 'ADIÇÃO (+)',
        '2': 'SUBTRAÇÃO (-)',
        '3': 'MULTIPLICAÇÃO (*)',
        '4': 'DIVISÃO (/)',
        '5': 'PORCENTAGEM (%)',
      };

      setSelectedOp(val);
      newLines.push({ text: `\n✨ Vamos fazer uma conta de ${opNames[val]}! ✨`, type: 'system' });
      if (val === '5') {
        newLines.push({ text: 'Digite a PORCENTAGEM (ex: 20 para 20%):', type: 'prompt' });
      } else {
        newLines.push({ text: 'Digite o PRIMEIRO número:', type: 'prompt' });
      }
      setStep('num1');
      setLines(newLines);
    } else if (step === 'num1') {
      newLines.push({ text: `> ${val}`, type: 'input' });
      const n1 = parseFloat(val);
      if (isNaN(n1)) {
        newLines.push({ text: '⚠️ Ops! Digite apenas números válidos (ex: 3, 7, 20).', type: 'warning' });
        newLines.push({ text: selectedOp === '5' ? 'Digite a PORCENTAGEM (ex: 20 para 20%):' : 'Digite o PRIMEIRO número:', type: 'prompt' });
        setLines(newLines);
        return;
      }

      setStoredNum1(n1);
      if (selectedOp === '5') {
        newLines.push({ text: 'Digite o VALOR TOTAL (ex: 100 para uma barra inteira):', type: 'prompt' });
      } else {
        newLines.push({ text: 'Digite o SEGUNDO número:', type: 'prompt' });
      }
      setStep('num2');
      setLines(newLines);
    } else if (step === 'num2') {
      newLines.push({ text: `> ${val}`, type: 'input' });
      const n2 = parseFloat(val);
      if (isNaN(n2)) {
        newLines.push({ text: '⚠️ Ops! Digite apenas números válidos (ex: 2, 5, 100).', type: 'warning' });
        newLines.push({ text: selectedOp === '5' ? 'Digite o VALOR TOTAL (ex: 100):' : 'Digite o SEGUNDO número:', type: 'prompt' });
        setLines(newLines);
        return;
      }

      // Check division by zero
      if (selectedOp === '4' && n2 === 0) {
        sound.playBoing();
        newLines.push({ text: '\n🎈 OPS! Não é possível dividir por ZERO!', type: 'warning' });
        newLines.push({ text: 'É como ter docinhos e tentar repartir com ninguém! 😉', type: 'warning' });
        newLines.push({ text: 'Pressione [ENTER] ou digite algo para recomeçar...', type: 'prompt' });
        setStep('continue');
        setLines(newLines);
        return;
      }

      sound.playSuccess();
      let res = 0;
      let symbol = '+';
      if (selectedOp === '1') {
        res = storedNum1 + n2;
        symbol = '+';
      } else if (selectedOp === '2') {
        res = storedNum1 - n2;
        symbol = '-';
      } else if (selectedOp === '3') {
        res = storedNum1 * n2;
        symbol = '×';
      } else if (selectedOp === '4') {
        res = storedNum1 / n2;
        symbol = '÷';
      } else if (selectedOp === '5') {
        res = (storedNum1 * n2) / 100;
        symbol = '% de';
      }

      newLines.push({ text: '—'.repeat(46), type: 'system' });
      if (selectedOp === '5') {
        newLines.push({
          text: `🎉 RESULTADO: ${storedNum1}% de ${n2} = ${Number.isInteger(res) ? res : res.toFixed(2)}`,
          type: 'success',
        });
      } else {
        newLines.push({
          text: `🎉 RESULTADO: ${storedNum1} ${symbol} ${n2} = ${Number.isInteger(res) ? res : res.toFixed(2)}`,
          type: 'success',
        });
      }
      newLines.push({ text: '—'.repeat(46), type: 'system' });

      // Visual items representation
      if (selectedOp === '5') {
        newLines.push({ text: '\n🍫 OLHA SÓ A BARRA DE CHOCOLATE DOS 100 QUADRADINHOS:', type: 'story' });
        const p = Math.max(0, Math.min(100, Math.round(storedNum1)));
        const blocks = Math.round(p / 5);
        const emptyBlocks = 20 - blocks;
        newLines.push({
          text: `  [${'🍫'.repeat(blocks)}${'▫️ '.repeat(emptyBlocks)}] ${p}% de 100 pedacinhos`,
          type: 'story',
        });
        newLines.push({
          text: `  👉 ${Number.isInteger(res) ? res : res.toFixed(2)} pedacinhos saboreados de ${n2}!`,
          type: 'story',
        });
        newLines.push({
          text: `💡 "Por cento" quer dizer pegar pedacinhos de cada 100! Delícia! 🍫`,
          type: 'story',
        });
      } else if (
        Number.isInteger(storedNum1) &&
        Number.isInteger(n2) &&
        storedNum1 >= 0 &&
        n2 >= 0 &&
        storedNum1 <= 15 &&
        n2 <= 15
      ) {
        newLines.push({ text: '\n👀 OLHA SÓ COMO FICA COM MAÇÃS 🍎:', type: 'story' });
        if (selectedOp === '1') {
          newLines.push({
            text: `  ${'🍎 '.repeat(storedNum1 || 0)} + ${'🍎 '.repeat(n2 || 0)} = ${'🍎 '.repeat(Math.max(0, res))}`,
            type: 'story',
          });
        } else if (selectedOp === '2') {
          newLines.push({
            text: `  ${'🍎 '.repeat(storedNum1 || 0)} (tirando ${n2}) = Sobram: ${'🍎 '.repeat(Math.max(0, res))}`,
            type: 'story',
          });
        }
      }

      newLines.push({ text: '\n💡 Pressione [ENTER] para fazer outra continha!', type: 'prompt' });
      setStep('continue');
      setLines(newLines);
    } else if (step === 'continue') {
      newLines.push({ text: '\n============================================================', type: 'system' });
      newLines.push({ text: 'Digite o número da operação (1: +, 2: -, 3: *, 4: /, 5: %, 6: sair):', type: 'prompt' });
      setStep('op');
      setLines(newLines);
    }
  };

  const handleReset = () => {
    sound.playBoing();
    setLines([
      { text: '============================================================', type: 'system' },
      { text: '           🐾 CALCULADORA INFANTIL EM PYTHON 🐾', type: 'system' },
      { text: '    Uma calculadora simples e divertida para crianças!', type: 'system' },
      { text: '============================================================', type: 'system' },
      { text: 'Escolha o que você quer fazer:', type: 'system' },
      { text: '  [1] ➕ Adição       (Juntar / Somar)', type: 'system' },
      { text: '  [2] ➖ Subtração    (Tirar / Diminuir)', type: 'system' },
      { text: '  [3] ✖️ Multiplicação (Grupinhos / Vezes)', type: 'system' },
      { text: '  [4] ➗ Divisão      (Repartir igualmente)', type: 'system' },
      { text: '  [5] 🍫 Porcentagem  (Pedacinhos de 100 - Chocolate)', type: 'system' },
      { text: '  [6] ❌ Sair', type: 'system' },
      { text: '============================================================', type: 'system' },
      { text: 'Digite o número da operação (1, 2, 3, 4, 5 ou 6):', type: 'prompt' },
    ]);
    setStep('op');
    setInputValue('');
  };

  return (
    <div className="max-w-3xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-mono">
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500" />
          <span className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-300 font-bold ml-2">
            Terminal Python (Simulação Interativa)
          </span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors"
          title="Reiniciar Terminal"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Terminal Output Area */}
      <div className="p-5 text-xs sm:text-sm min-h-[360px] max-h-[460px] overflow-y-auto space-y-1">
        {lines.map((line, idx) => {
          let textClass = 'text-slate-300';
          if (line.type === 'system') textClass = 'text-slate-400';
          else if (line.type === 'prompt') textClass = 'text-amber-300 font-bold';
          else if (line.type === 'input') textClass = 'text-sky-300 font-bold';
          else if (line.type === 'success') textClass = 'text-emerald-300 font-bold';
          else if (line.type === 'warning') textClass = 'text-rose-300 font-bold';
          else if (line.type === 'story') textClass = 'text-yellow-200';

          return (
            <div key={idx} className={textClass}>
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Option Buttons for easy click */}
      {step === 'op' && (
        <div className="px-5 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-400 self-center text-[11px]">Atalhos rápidos:</span>
          <button
            onClick={() => handleSend('1')}
            className="px-2.5 py-1 rounded bg-sky-900/50 hover:bg-sky-800 text-sky-200 border border-sky-700/50"
          >
            [1] ➕ Adição
          </button>
          <button
            onClick={() => handleSend('2')}
            className="px-2.5 py-1 rounded bg-orange-900/50 hover:bg-orange-800 text-orange-200 border border-orange-700/50"
          >
            [2] ➖ Subtração
          </button>
          <button
            onClick={() => handleSend('3')}
            className="px-2.5 py-1 rounded bg-purple-900/50 hover:bg-purple-800 text-purple-200 border border-purple-700/50"
          >
            [3] ✖️ Multiplicação
          </button>
          <button
            onClick={() => handleSend('4')}
            className="px-2.5 py-1 rounded bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50"
          >
            [4] ➗ Divisão
          </button>
          <button
            onClick={() => handleSend('5')}
            className="px-2.5 py-1 rounded bg-amber-900/50 hover:bg-amber-800 text-amber-200 border border-amber-700/50"
          >
            [5] 🍫 Porcentagem
          </button>
        </div>
      )}

      {/* Terminal Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
      >
        <span className="text-emerald-400 font-bold text-sm pl-2">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={
            step === 'op'
              ? 'Digite 1, 2, 3, 4, 5 ou 6 e tecle Enter...'
              : step === 'num1' || step === 'num2'
              ? 'Digite um número e tecle Enter...'
              : 'Tecle Enter para continuar...'
          }
          className="flex-1 bg-transparent text-white focus:outline-hidden text-xs sm:text-sm font-mono placeholder:text-slate-600"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
        >
          <span>Enviar</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
