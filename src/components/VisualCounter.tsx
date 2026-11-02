import React, { useState } from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

export type MathItemTheme = 'apples' | 'stars' | 'dogs' | 'cars' | 'candies';

interface ItemConfig {
  id: MathItemTheme;
  name: string;
  emoji: string;
  plural: string;
}

export const ITEM_THEMES: ItemConfig[] = [
  { id: 'apples', name: 'Maçãs', emoji: '🍎', plural: 'maçãs' },
  { id: 'stars', name: 'Estrelas', emoji: '⭐', plural: 'estrelas' },
  { id: 'dogs', name: 'Filhotes', emoji: '🐶', plural: 'cachorrinhos' },
  { id: 'cars', name: 'Carrinhos', emoji: '🚗', plural: 'carrinhos' },
  { id: 'candies', name: 'Balinhas', emoji: '🍬', plural: 'balinhas' },
];

interface VisualCounterProps {
  num1: number;
  op: string; // '+', '-', '*', '/'
  num2: number;
  result: number | null;
  selectedTheme: MathItemTheme;
  onThemeChange: (theme: MathItemTheme) => void;
}

export const VisualCounter: React.FC<VisualCounterProps> = ({
  num1,
  op,
  num2,
  result,
  selectedTheme,
  onThemeChange,
}) => {
  const currentTheme = ITEM_THEMES.find(t => t.id === selectedTheme) || ITEM_THEMES[0];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // If numbers are too large or negative/decimals, show an encouraging summary rather than 1000 emojis
  const isVisualizable =
    Number.isInteger(num1) &&
    Number.isInteger(num2) &&
    num1 >= 0 &&
    num2 >= 0 &&
    num1 <= 20 &&
    num2 <= 20;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      {/* Header with Item Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>Contando com Figurinhas</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              Modo Visual
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Veja a matemática acontecendo na prática com objetos reais!
          </p>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          {ITEM_THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => {
                sound.playPop(520);
                onThemeChange(theme.id);
              }}
              className={`px-2.5 py-1 text-sm rounded-lg transition-all flex items-center gap-1 ${
                selectedTheme === theme.id
                  ? 'bg-white shadow-xs font-semibold text-slate-900 scale-105'
                  : 'text-slate-600 hover:text-slate-900 opacity-70 hover:opacity-100'
              }`}
              title={`Trocar para ${theme.name}`}
            >
              <span>{theme.emoji}</span>
              <span className="text-xs hidden md:inline">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Content Body */}
      <div className="py-4">
        {op === '/' && num2 === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <span className="text-3xl block mb-2">🎈</span>
            <h4 className="font-bold text-amber-900 text-sm">Ops! Não dá para dividir por 0!</h4>
            <p className="text-xs text-amber-700 mt-1 max-w-md mx-auto">
              É como ter {num1} {currentTheme.plural} gostosas e não ter nenhum amigo para comer junto.
              Escolha pelo menos 1 amigo para poder repartir!
            </p>
          </div>
        ) : !isVisualizable ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
            <span className="text-2xl block mb-1">✨</span>
            <h4 className="font-semibold text-slate-800 text-sm">Continha com números maiores!</h4>
            <p className="text-xs text-slate-500 mt-1">
              Essa conta usa números grandes ou decimais ({num1} {op} {num2} = {result}).
              Para ver as figurinhas uma a uma na tela, experimente números inteiros entre 0 e 20!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* ADIÇÃO (+) */}
            {op === '+' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                  {/* Grupo 1 */}
                  <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3">
                    <div className="text-xs font-semibold text-sky-800 mb-2">
                      1º Grupo: {num1} {currentTheme.plural}
                    </div>
                    <div className="flex flex-wrap gap-1.5 min-h-[44px]">
                      {Array.from({ length: num1 }).map((_, i) => (
                        <span
                          key={`g1-${i}`}
                          className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                          title={`Item ${i + 1}`}
                          onClick={() => sound.playNumber(i + 1)}
                        >
                          {currentTheme.emoji}
                        </span>
                      ))}
                      {num1 === 0 && <span className="text-xs text-slate-400 italic">Nenhum</span>}
                    </div>
                  </div>

                  {/* Sinal + */}
                  <div className="flex flex-col items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-sky-200 text-sky-800 flex items-center justify-center font-bold text-lg">
                      +
                    </span>
                    <span className="text-[11px] text-sky-700 font-medium mt-1">Juntando</span>
                  </div>

                  {/* Grupo 2 */}
                  <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3">
                    <div className="text-xs font-semibold text-sky-800 mb-2">
                      2º Grupo: {num2} {currentTheme.plural}
                    </div>
                    <div className="flex flex-wrap gap-1.5 min-h-[44px]">
                      {Array.from({ length: num2 }).map((_, i) => (
                        <span
                          key={`g2-${i}`}
                          className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                          title={`Item ${i + 1}`}
                          onClick={() => sound.playNumber(num1 + i + 1)}
                        >
                          {currentTheme.emoji}
                        </span>
                      ))}
                      {num2 === 0 && <span className="text-xs text-slate-400 italic">Nenhum</span>}
                    </div>
                  </div>
                </div>

                {/* Total Juntos */}
                {result !== null && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-900">
                        Total Juntinho: {result} {currentTheme.plural} 🎉
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        (Clique nas figurinhas para ouvir a contagem!)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: result }).map((_, i) => (
                        <button
                          key={`tot-${i}`}
                          onClick={() => sound.playNumber(i + 1)}
                          className="relative group p-1 bg-white rounded-lg border border-emerald-200 shadow-2xs hover:scale-110 transition-transform"
                        >
                          <span className="text-2xl">{currentTheme.emoji}</span>
                          <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {i + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SUBTRAÇÃO (-) */}
            {op === '-' && (
              <div className="space-y-3">
                <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-3">
                  <div className="text-xs font-semibold text-orange-900 mb-2">
                    Você começou com {num1} {currentTheme.plural} e tirou {num2}:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: num1 }).map((_, i) => {
                      const isRemoved = i >= (result ?? 0);
                      return (
                        <div
                          key={`sub-${i}`}
                          className={`relative p-1.5 rounded-lg border transition-all ${
                            isRemoved
                              ? 'bg-slate-100 border-dashed border-red-300 opacity-40 scale-95'
                              : 'bg-white border-orange-200 shadow-2xs'
                          }`}
                        >
                          <span className="text-2xl">{currentTheme.emoji}</span>
                          {isRemoved ? (
                            <span className="absolute inset-0 flex items-center justify-center text-red-500 font-black text-sm">
                              ✕
                            </span>
                          ) : (
                            <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                              {i + 1}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {result !== null && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 font-medium flex items-center justify-between">
                    <span>
                      Sobraram {result} {currentTheme.plural} brilhantes! ✨
                    </span>
                    <span className="text-slate-600">
                      {num1} − {num2} = <strong className="text-emerald-700 text-sm">{result}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* MULTIPLICAÇÃO (*) */}
            {op === '*' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-purple-900 mb-1">
                  São {num1} grupinhos, e cada grupinho tem {num2} {currentTheme.plural}:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {Array.from({ length: Math.min(num1, 12) }).map((_, groupIdx) => (
                    <div
                      key={`mul-group-${groupIdx}`}
                      className="bg-purple-50/80 border border-purple-200 rounded-xl p-2.5"
                    >
                      <div className="text-[11px] font-bold text-purple-800 mb-1.5">
                        Grupinho {groupIdx + 1}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: num2 }).map((_, itemIdx) => (
                          <span
                            key={`mul-item-${groupIdx}-${itemIdx}`}
                            className="text-xl hover:scale-125 transition-transform"
                          >
                            {currentTheme.emoji}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {result !== null && (
                  <div className="bg-purple-100/60 border border-purple-200 rounded-xl p-3 text-xs font-bold text-purple-950 flex items-center justify-between">
                    <span>
                      Total em todos os grupinhos: {result} {currentTheme.plural} 🌟
                    </span>
                    <span className="text-slate-600 font-normal">
                      {num1} × {num2} = <strong className="text-purple-700 text-sm">{result}</strong>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* DIVISÃO (/) */}
            {op === '/' && num2 > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-emerald-900 mb-1">
                  Repartindo {num1} {currentTheme.plural} igualmente entre {num2} amigos:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {Array.from({ length: Math.min(num2, 10) }).map((_, friendIdx) => {
                    const perFriend = Math.floor(num1 / num2);
                    return (
                      <div
                        key={`friend-${friendIdx}`}
                        className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-2.5 text-center"
                      >
                        <div className="text-[11px] font-bold text-emerald-800 mb-1.5 flex items-center justify-center gap-1">
                          <span>👦 Amigo {friendIdx + 1}</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-1 min-h-[32px]">
                          {Array.from({ length: perFriend }).map((_, i) => (
                            <span key={`fitem-${i}`} className="text-xl">
                              {currentTheme.emoji}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                          Recebe {perFriend} {currentTheme.plural}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Resto se houver */}
                {num1 % num2 !== 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-800">
                    💡 <strong>Sobrou 1 {currentTheme.name.toLowerCase()}</strong> que não dá para dividir inteira sem cortar! Na matemática, isso se chama <em>resto</em> da divisão!
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Story Mode explanation footer */}
      <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-600 bg-slate-50/60 p-3 rounded-xl">
        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Dica da Matemática Divertida: </span>
          {op === '+' && 'Somar é como fazer novos amigos e juntar todo mundo na mesma brincadeira!'}
          {op === '-' && 'Subtrair é ver quanto sobrou na sua lancheira depois de saborear um lanchinho!'}
          {op === '*' && 'Multiplicar é somar o mesmo número várias vezes de um jeito super rápido e esperto!'}
          {op === '/' && 'Dividir é ser generoso e repartir seus brinquedos em partes iguaizinhas para todos os amigos!'}
        </div>
      </div>
    </div>
  );
};
