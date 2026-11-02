import React, { useState, useEffect } from 'react';
import { Star, Award, RotateCcw, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';
import { ITEM_THEMES } from './VisualCounter';

interface QuizQuestion {
  num1: number;
  op: '+' | '-' | '*' | '/' | '%';
  opSymbol: string;
  num2: number;
  correctAnswer: number;
  storyText: string;
  options: number[];
  themeEmoji: string;
}

export const MathQuiz: React.FC = () => {
  const [stars, setStars] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const generateNewQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);

    const ops: Array<'+' | '-' | '*' | '/' | '%'> = ['+', '-', '*', '/', '%'];
    const chosenOp = ops[Math.floor(Math.random() * ops.length)];
    const theme = ITEM_THEMES[Math.floor(Math.random() * ITEM_THEMES.length)];

    let n1 = 0;
    let n2 = 0;
    let answer = 0;
    let symbol = '+';
    let story = '';
    let emoji = theme.emoji;

    if (chosenOp === '+') {
      n1 = Math.floor(Math.random() * 8) + 1;
      n2 = Math.floor(Math.random() * 8) + 1;
      answer = n1 + n2;
      symbol = '+';
      story = `Você tinha ${n1} ${theme.plural} e ganhou mais ${n2}. Com quantas você ficou no total?`;
    } else if (chosenOp === '-') {
      n1 = Math.floor(Math.random() * 9) + 3;
      n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
      answer = n1 - n2;
      symbol = '−';
      story = `Você tinha ${n1} ${theme.plural} e deu ${n2} para seu amiguinho. Quantas sobraram?`;
    } else if (chosenOp === '*') {
      n1 = Math.floor(Math.random() * 4) + 2; // 2, 3, 4
      n2 = Math.floor(Math.random() * 4) + 2; // 2, 3, 4
      answer = n1 * n2;
      symbol = '×';
      story = `Você tem ${n1} caixinhas, e cada caixinha guarda ${n2} ${theme.plural}. Quantas figurinhas têm ao todo?`;
    } else if (chosenOp === '/') {
      // Division: clean integer division
      n2 = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      const quotient = Math.floor(Math.random() * 4) + 1; // 1, 2, 3, 4
      n1 = n2 * quotient;
      answer = quotient;
      symbol = '÷';
      story = `Você tem ${n1} ${theme.plural} para repartir igualmente com ${n2} amigos. Quantas cada um recebe?`;
    } else {
      // Percentage (%)
      const percentages = [10, 20, 25, 50, 75];
      n1 = percentages[Math.floor(Math.random() * percentages.length)];
      n2 = 100;
      answer = (n1 * n2) / 100;
      symbol = '% de';
      emoji = '🍫';
      story = `Uma barra de chocolate tem exatamente 100 quadradinhos. Você separou ${n1}% para saborear. Quantos quadradinhos você pegou?`;
    }

    // Generate 3 unique options
    const step = chosenOp === '%' ? (n1 >= 20 ? 5 : 2) : 1;
    const wrong1 = answer + (Math.random() > 0.5 ? step : -step);
    let wrong2 = answer + (Math.random() > 0.5 ? step * 2 : -step * 2);
    if (wrong1 === wrong2 || wrong2 <= 0) wrong2 = answer + step * 3;

    const options = [answer, Math.max(0, wrong1), Math.max(1, wrong2)]
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort(() => Math.random() - 0.5);

    // If options length < 3, ensure 3 unique choices
    while (options.length < 3) {
      const extra = answer + (options.length + 1) * step;
      if (!options.includes(extra)) options.push(extra);
    }

    setCurrentQuestion({
      num1: n1,
      op: chosenOp,
      opSymbol: symbol,
      num2: n2,
      correctAnswer: answer,
      storyText: story,
      options,
      themeEmoji: emoji,
    });
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const handleChoose = (chosen: number) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(chosen);
    setIsAnswered(true);
    setQuestionsAnswered(prev => prev + 1);

    if (chosen === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setStars(prev => prev + 1);
      sound.playSuccess();
      speech.speak(`Parabéns! A resposta é ${chosen}! Você ganhou uma estrelinha!`);
    } else {
      setIsCorrect(false);
      sound.playBoing();
      speech.speak(`Quase lá! A resposta certa era ${currentQuestion.correctAnswer}. Vamos tentar a próxima!`);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Quiz Header with Stars Tally */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🎮 Desafio Divertido da Matemática</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Acerte as continhas para colecionar estrelinhas douradas!
          </p>
        </div>

        {/* Stars Counter */}
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl">
          <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
          <span className="font-extrabold text-amber-900 text-lg tabular-nums">{stars}</span>
          <span className="text-xs font-semibold text-amber-700">estrelas</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="py-6">
        <div className="text-center mb-6">
          <div className="inline-block bg-slate-100 px-4 py-1.5 rounded-full text-xs font-bold text-slate-700 mb-3">
            Pergunta #{questionsAnswered + 1}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 font-mono">
            {currentQuestion.num1} {currentQuestion.opSymbol} {currentQuestion.num2} = ?
          </h3>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {currentQuestion.storyText}
          </p>
        </div>

        {/* Visual Item Clue */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 mb-6 text-center">
          <div className="text-xs font-semibold text-slate-500 mb-2">
            💡 Dica Visual para Contar:
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-2xl">
            {currentQuestion.op === '+' && (
              <>
                <div className="flex gap-1 bg-white p-2 rounded-xl border border-slate-200">
                  {Array.from({ length: currentQuestion.num1 }).map((_, i) => (
                    <span key={i}>{currentQuestion.themeEmoji}</span>
                  ))}
                </div>
                <span className="self-center font-bold text-slate-400">+</span>
                <div className="flex gap-1 bg-white p-2 rounded-xl border border-slate-200">
                  {Array.from({ length: currentQuestion.num2 }).map((_, i) => (
                    <span key={i}>{currentQuestion.themeEmoji}</span>
                  ))}
                </div>
              </>
            )}

            {currentQuestion.op === '-' && (
              <div className="flex flex-wrap justify-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
                {Array.from({ length: currentQuestion.num1 }).map((_, i) => {
                  const isTaken = i >= currentQuestion.num1 - currentQuestion.num2;
                  return (
                    <span
                      key={i}
                      className={isTaken ? 'opacity-30 line-through filter grayscale' : ''}
                    >
                      {currentQuestion.themeEmoji}
                    </span>
                  );
                })}
              </div>
            )}

            {currentQuestion.op === '*' && (
              <div className="flex flex-wrap justify-center gap-2">
                {Array.from({ length: currentQuestion.num1 }).map((_, g) => (
                  <div key={g} className="bg-white p-2 rounded-xl border border-slate-200 flex gap-1">
                    {Array.from({ length: currentQuestion.num2 }).map((_, item) => (
                      <span key={item}>{currentQuestion.themeEmoji}</span>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {currentQuestion.op === '/' && (
              <div className="flex flex-wrap justify-center gap-1.5 bg-white p-2.5 rounded-xl border border-slate-200">
                {Array.from({ length: currentQuestion.num1 }).map((_, i) => (
                  <span key={i}>{currentQuestion.themeEmoji}</span>
                ))}
              </div>
            )}

            {currentQuestion.op === '%' && (
              <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <div className="flex items-center gap-1 text-xs font-bold text-amber-900">
                  <span>🍫 Barra de Chocolate: {currentQuestion.num1}% de 100 pedacinhos</span>
                </div>
                <div className="w-48 sm:w-64 h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-amber-300">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-800 rounded-full"
                    style={{ width: `${currentQuestion.num1}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Choice Buttons */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                btnClass = 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-200';
              } else if (option === selectedOption) {
                btnClass = 'bg-rose-500 text-white border-rose-600';
              } else {
                btnClass = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleChoose(option)}
                className={`h-16 sm:h-20 rounded-2xl text-2xl sm:text-3xl font-black font-mono border-2 transition-all transform active:scale-95 flex items-center justify-center ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback Banner */}
        {isAnswered && (
          <div
            className={`p-4 rounded-2xl text-center mb-5 flex flex-col items-center justify-center ${
              isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-base mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>Muito bem! Você acertou! 🎉 ⭐</span>
                </>
              ) : (
                <>
                  <span>Quase lá! A resposta certa era {currentQuestion.correctAnswer}.</span>
                </>
              )}
            </div>
            <p className="text-xs opacity-80">
              {currentQuestion.num1} {currentQuestion.opSymbol} {currentQuestion.num2} = {currentQuestion.correctAnswer}
            </p>
          </div>
        )}

        {/* Next Question CTA */}
        {isAnswered && (
          <button
            onClick={() => {
              sound.playPop(550);
              generateNewQuestion();
            }}
            className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-lg transition-transform active:scale-98 shadow-md flex items-center justify-center gap-2"
          >
            <span>PRÓXIMA PERGUNTA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
