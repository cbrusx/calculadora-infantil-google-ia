import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, BookOpen, Code, Lightbulb, Play } from 'lucide-react';
import { PYTHON_SCRIPT_CODE, PYTHON_CONCEPTS } from '../data/pythonCode';
import { sound } from '../utils/sound';

interface PythonCodeViewerProps {
  onGoToTerminal: () => void;
}

export const PythonCodeViewer: React.FC<PythonCodeViewerProps> = ({ onGoToTerminal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    sound.playPop(600);
    navigator.clipboard.writeText(PYTHON_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    sound.playSuccess();
    const blob = new Blob([PYTHON_SCRIPT_CODE], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calculadora_infantil.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🐍</span>
              <h2 className="text-xl font-bold text-slate-900">
                Código Python da Calculadora Infantil
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Arquivo oficial em Python 3 com as 4 operações básicas, emojis visuais e explicação didática.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Baixar (.py)</span>
            </button>

            <button
              onClick={onGoToTerminal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Testar no Navegador</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Display Frame */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-300 font-mono">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-bold text-amber-300">calculadora_infantil.py</span>
          </div>
          <span className="text-slate-400 text-[11px]">Python 3.x (Simples & Comentado)</span>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto max-h-[500px]">
          <pre className="font-mono text-xs sm:text-sm text-slate-200 leading-relaxed tabular-nums">
            {PYTHON_SCRIPT_CODE.split('\n').map((line, idx) => {
              // Simple educational syntax styling
              let color = 'text-slate-300';
              if (line.trim().startsWith('#') || line.trim().startsWith('"""') || line.trim().startsWith('=')) {
                color = 'text-emerald-400/90 italic';
              } else if (line.includes('def ') || line.includes('return ') || line.includes('import ')) {
                color = 'text-sky-300 font-bold';
              } else if (line.includes('if ') || line.includes('elif ') || line.includes('else:') || line.includes('while ')) {
                color = 'text-amber-300 font-bold';
              } else if (line.includes('print(') || line.includes('input(')) {
                color = 'text-purple-300';
              }

              return (
                <div key={idx} className="flex hover:bg-slate-900/60 py-0.5 rounded px-1">
                  <span className="w-8 shrink-0 text-slate-600 select-none text-[11px] text-right pr-4 font-mono">
                    {idx + 1}
                  </span>
                  <span className={color}>{line || ' '}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Beginner Explanation Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-900">
            Aprenda Programação com este Código
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Explicamos os 4 principais conceitos de Python usados na calculadora com analogias fáceis para crianças:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PYTHON_CONCEPTS.map(concept => (
            <div
              key={concept.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 text-sm">{concept.title}</h4>
                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-semibold">
                  Python Básico
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">{concept.explanation}</p>
              
              <div className="bg-slate-900 text-slate-200 rounded-xl p-2.5 font-mono text-[11px] mb-3">
                <pre>{concept.codeSnippet}</pre>
              </div>

              <div className="bg-amber-50 text-amber-900 p-2.5 rounded-xl text-xs flex items-start gap-1.5 border border-amber-200/50">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Para a criança entender: </strong>
                  {concept.childAnalogy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to run in local computer */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-md">
        <h3 className="text-base font-bold mb-3 flex items-center gap-2 text-amber-300">
          <Terminal className="w-5 h-5" />
          <span>Como rodar o arquivo no seu computador (Passo a Passo)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl">
            <div className="font-bold text-amber-400 mb-1">1. Instalar o Python</div>
            <p className="text-slate-300">
              Se ainda não tiver, baixe o Python gratuitamente no site oficial{' '}
              <span className="text-sky-300 font-mono">python.org</span> (marque a caixinha &quot;Add Python to PATH&quot;).
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl">
            <div className="font-bold text-amber-400 mb-1">2. Salvar o arquivo</div>
            <p className="text-slate-300">
              Clique no botão amarelo <strong>&quot;Baixar (.py)&quot;</strong> acima para salvar o arquivo{' '}
              <span className="font-mono text-amber-300">calculadora_infantil.py</span> na sua pasta de Downloads.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl">
            <div className="font-bold text-amber-400 mb-1">3. Executar no Terminal</div>
            <p className="text-slate-300 mb-2">
              Abra o Prompt de Comando ou Terminal na pasta e digite:
            </p>
            <div className="bg-slate-950 px-2 py-1.5 rounded-lg font-mono text-emerald-400 text-[11px]">
              python calculadora_infantil.py
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
