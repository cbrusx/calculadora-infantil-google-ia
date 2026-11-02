import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { CalculatorKeypad } from './components/CalculatorKeypad';
import { VisualCounter, MathItemTheme } from './components/VisualCounter';
import { MathQuiz } from './components/MathQuiz';
import { PythonCodeViewer } from './components/PythonCodeViewer';
import { PythonTerminalSimulator } from './components/PythonTerminalSimulator';
import { Sparkles, Heart, HelpCircle, Code, Award } from 'lucide-react';
import { sound } from './utils/sound';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'quiz' | 'python' | 'terminal'>('calculator');
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Calculator state
  const [num1, setNum1] = useState<number>(3);
  const [op, setOp] = useState<string>('+');
  const [num2, setNum2] = useState<number>(2);
  const [result, setResult] = useState<number | null>(5);
  const [displayValue, setDisplayValue] = useState<string>('5');
  const [currentInput, setCurrentInput] = useState<'num1' | 'num2'>('num1');
  const [historyText, setHistoryText] = useState<string>('3 + 2 =');
  const [selectedTheme, setSelectedTheme] = useState<MathItemTheme>('apples');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-amber-200 selection:text-slate-900">
      {/* Top Bar following contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: CALCULATOR + VISUAL COUNTER */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            {/* Friendly Greeting Banner */}
            <div className="bg-gradient-to-r from-amber-100/90 via-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xs border-2 border-amber-300 shrink-0 bg-amber-200">
                  <img
                    src="/src/assets/images/mascot_math_buddy_1793237439437.jpg"
                    alt="Mascote Amigo da Matemática"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Olá, pequeno matemático! 🐾
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                    Esta calculadora ensina as <strong>4 operações básicas</strong> de forma visual e divertida.
                    Você também pode ver o <strong>código em Python</strong> pronto para o seu computador!
                  </p>
                </div>
              </div>

              {/* Quick Operation Guide */}
              <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800">➕ Somar</span>
                <span className="px-2.5 py-1 rounded-lg bg-orange-100 text-orange-800">➖ Tirar</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800">✖️ Vezes</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">➗ Repartir</span>
              </div>
            </div>

            {/* Two-Column Educational Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Calculator Keypad (5 cols on desktop) */}
              <div className="lg:col-span-5 space-y-4">
                <CalculatorKeypad
                  num1={num1}
                  setNum1={setNum1}
                  op={op}
                  setOp={setOp}
                  num2={num2}
                  setNum2={setNum2}
                  result={result}
                  setResult={setResult}
                  displayValue={displayValue}
                  setDisplayValue={setDisplayValue}
                  currentInput={currentInput}
                  setCurrentInput={setCurrentInput}
                  historyText={historyText}
                  setHistoryText={setHistoryText}
                />

                {/* Keyboard & Teaching Tips */}
                <div className="bg-white rounded-2xl border border-slate-200 p-4 text-xs text-slate-500 shadow-2xs">
                  <div className="font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Dicas do Teclado:</span>
                  </div>
                  <p>
                    Você pode usar o teclado do computador! Digite os números normalmente, aperte{' '}
                    <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[11px] font-mono">+</kbd>,{' '}
                    <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[11px] font-mono">-</kbd>,{' '}
                    <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[11px] font-mono">*</kbd>,{' '}
                    <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[11px] font-mono">/</kbd> e{' '}
                    <kbd className="px-1 py-0.5 bg-slate-100 border rounded text-[11px] font-mono">Enter</kbd> para calcular!
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Math Counter Stage (7 cols on desktop) */}
              <div className="lg:col-span-7">
                <VisualCounter
                  num1={num1}
                  op={op}
                  num2={num2}
                  result={result}
                  selectedTheme={selectedTheme}
                  onThemeChange={setSelectedTheme}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MATH QUIZ */}
        {activeTab === 'quiz' && (
          <div className="py-4">
            <MathQuiz />
          </div>
        )}

        {/* TAB 3: PYTHON CODE VIEWER */}
        {activeTab === 'python' && (
          <div className="py-2">
            <PythonCodeViewer onGoToTerminal={() => setActiveTab('terminal')} />
          </div>
        )}

        {/* TAB 4: INTERACTIVE TERMINAL SIMULATOR */}
        {activeTab === 'terminal' && (
          <div className="py-4 space-y-4">
            <div className="max-w-3xl mx-auto text-center mb-2">
              <h2 className="text-xl font-bold text-slate-900">
                💻 Simulador do Terminal Python
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Experimente rodar a calculadora infantil exatamente como ela funciona na linha de comando do Python!
              </p>
            </div>
            <PythonTerminalSimulator />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>🐾 Calculadora Infantil em Python</span>
            <span aria-hidden="true">·</span>
            <span>Matemática Básica para Crianças</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                sound.playPop(520);
                setActiveTab('python');
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Ver Código Fonte .py
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                sound.playPop(520);
                setActiveTab('quiz');
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Praticar no Joguinho
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
