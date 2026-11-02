# 🐾 Calculadora Infantil & Aprenda com Python

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)

Uma aplicação educativa, lúdica e interativa projetada para ensinar às crianças as **operações fundamentais da matemática** (Adição, Subtração, Multiplicação, Divisão e Porcentagem) de forma visual, multissensorial e conectada aos primeiros passos da lógica de programação em **Python 3**.

---

## 🎯 Objetivo Pedagógico

O projeto foi construído pensando nas necessidades de crianças em idade escolar e alfabetização matemática:
1. **Concretude Visual**: Substituir números abstratos por objetos do cotidiano (maçãs 🍎, estrelas ⭐, filhotes 🐶, carrinhos 🚗, balinhas 🍬 e chocolates 🍫).
2. **Analogias Lúdicas**:
   * **➕ Adição**: Fazer novos amigos e juntar lanchinhos.
   * **➖ Subtração**: Ver o que sobra na lancheira após comer ou doar um item.
   * **✖️ Multiplicação**: Formação de grupinhos organizados lado a lado.
   * **➗ Divisão**: Repartir brinquedos em partes iguais entre amigos, com explicação sobre o *resto* e proteção amigável contra divisão por zero.
   * **🍫 Porcentagem (%)**: A grande barra de 100 quadradinhos de chocolate ou pizza gigante de 100 fatias, ensinando na prática que *"por cento"* significa *"de cada 100"*.
3. **Ponte com a Computação**: Introduzir a sintaxe e o raciocínio algorítmico do Python de maneira intuitiva e divertida.

---

## 🚀 Funcionalidades Principais

* **🔢 Teclado Infantil Completo**:
  * Botões grandes, coloridos e táteis com as operações `+`, `−`, `×`, `÷`, `%`, `Limpar` e `=`.
  * Suporte nativo a teclado físico (números, operadores, `%`, `Enter` e `Backspace`).
* **🎨 Palco Didático Visual (Visual Counter)**:
  * Agrupamento e contagem animada de figurinhas.
  * Seletor de 5 temas visuais divertidos.
  * Grade interativa 10x10 com **100 quadradinhos coloridos** para a operação de porcentagem, com alternador entre **Barra de Chocolate** 🍫 e **Pizza de 100 Fatias** 🍕.
* **🔊 Efeitos Sonoros Sintetizados (Web Audio API)**:
  * Escalas pentatônicas musicais associadas a cada dígito digitado.
  * Sons de sucesso (*fanfarra*) e *pops* leves sem necessidade de carregar arquivos externos pesados de áudio.
* **🗣️ Narração por Voz em Português (Web Speech API)**:
  * Leitura automática ou sob demanda das historinhas e resultados para apoiar crianças em fase de alfabetização.
* **🎮 Jogo de Desafios (Math Quiz)**:
  * Perguntas randômicas em formato de historinha contextualizada.
  * Sistema de recompensa com estrelinhas douradas colecionáveis e feedback sonoro imediato.
* **💻 Simulador de Terminal Python**:
  * Emulador de terminal de linha de comando no próprio navegador, simulando a experiência real de executar o script Python.
* **🐍 Aprenda com Python**:
  * Visualizador do código-fonte completo com destaque de sintaxe.
  * Cartões explicativos dos conceitos essenciais: `def` (funções), `print()` e `input()` (entrada/saída), `if/else` (condições), `while` (laços) e porcentagem.
  * Botão de cópia rápida e download do script `.py`.
* **📄 Script Autônomo de Terminal (`calculadora_infantil.py`)**:
  * Pode ser executado em qualquer computador via terminal ou prompt de comando sem dependências externas.
  * Compatível com Windows (UTF-8 configurado automaticamente), macOS e Linux.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

| Ferramenta / Biblioteca | Finalidade no Projeto |
| :--- | :--- |
| **React 19** | Biblioteca de interface reativa para gerenciamento do estado dos componentes. |
| **TypeScript** | Tipagem estática rigorosa para garantir segurança e prevenir erros em tempo de desenvolvimento. |
| **Tailwind CSS v4** | Motor de estilização moderno e ágil usando classes utilitárias para interfaces responsivas. |
| **Vite 8** | Servidor de desenvolvimento ultrarrápido com Hot Module Replacement (HMR). |
| **Lucide React** | Conjunto de ícones consistentes e amigáveis para interfaces infantis. |
| **Web Audio API** | Síntese de áudio procedural nativa do navegador para efeitos sonoros e notas musicais. |
| **Web Speech API** | Mecanismo nativo do navegador para sintetização de voz em português brasileiro (`pt-BR`). |
| **Python 3** | Linguagem de script educacional independente para ensino de lógica de programação. |

---

## 📂 Estrutura do Projeto

```text
imersao-dev-ai-google/
├── calculadora_infantil.py        # Script autônomo Python 3 para terminal
├── index.html                     # Ponto de entrada HTML e fontes externas
├── package.json                   # Dependências e scripts npm
├── tsconfig.json                  # Configurações do compilador TypeScript
├── vite.config.ts                 # Configurações do empacotador Vite
├── metadata.json                  # Metadados do projeto
├── .gitignore                     # Arquivos ignorados pelo Git
│
└── src/
    ├── main.tsx                   # Inicialização e montagem do React no DOM
    ├── App.tsx                    # Componente principal e orquestrador de abas/estados
    ├── index.css                  # Estilos globais e importação do Tailwind CSS v4
    │
    ├── assets/
    │   └── images/                # Imagens e mascotes do projeto
    │
    ├── components/
    │   ├── TopNav.tsx             # Barra superior, navegação e controle de som
    │   ├── CalculatorKeypad.tsx   # Teclado interativo com números e operações (+, -, *, /, %)
    │   ├── VisualCounter.tsx      # Palco visual com figurinhas e grade de 100 quadradinhos
    │   ├── MathQuiz.tsx           # Jogo interativo de perguntas e respostas
    │   ├── PythonCodeViewer.tsx   # Visualizador de código didático e download do .py
    │   └── PythonTerminalSimulator.tsx # Emulador de terminal de linha de comando
    │
    ├── data/
    │   └── pythonCode.ts          # Código Python embutido e cartões explicativos
    │
    └── utils/
        ├── sound.ts               # Sintetizador Web Audio API (escalas musicais e pops)
        └── speech.ts              # Narração Web Speech API (síntese de voz em pt-BR)
```

---

## 💻 Como Inicializar o Aplicativo

### Pré-requisitos
* **Node.js** (versão 18 ou superior instalada) — [Baixar Node.js](https://nodejs.org/)
* **Python 3** (versão 3.10 ou superior, opcional para o script local) — [Baixar Python](https://www.python.org/)

---

### 🌐 1. Executando a Aplicação Web (Interface Gráfica)

1. **Abra o terminal** na pasta raiz do projeto:
   ```bash
   cd c:\Users\xiume\OneDrive\CURSOS\imersao-dev-ai-google
   ```

2. **Instale as dependências do projeto**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse no seu navegador**:
   Abra a URL indicada no terminal (geralmente [http://localhost:3000](http://localhost:3000)).

---

### 🐍 2. Executando a Calculadora pelo Terminal Python

Se preferir rodar a versão em linha de comando diretamente no seu terminal:

1. **Abra o terminal** na raiz do projeto:
   ```bash
   python calculadora_infantil.py
   ```

2. **Interaja no menu interativo**:
   ```text
   ================================================
         🌈 CALCULADORA DIVERTIDA 🌈
   ================================================
   Escolha o que você quer fazer:
     [1] ➕ Adição       (Juntar / Somar)
     [2] ➖ Subtração    (Tirar / Diminuir)
     [3] ✖️ Multiplicação (Grupinhos / Vezes)
     [4] ➗ Divisão      (Repartir igualmente)
     [5] 🍫 Porcentagem  (Pedacinhos de 100 - Chocolate)
     [6] ❌ Sair
   ================================================
   ```

---

## 📜 Scripts Disponíveis no `package.json`

* `npm run dev`: Inicia o servidor Vite local na porta 3000 com recarga rápida.
* `npm run build`: Compila e otimiza a aplicação para produção na pasta `dist/`.
* `npm run preview`: Visualiza localmente o build gerado de produção.
* `npm run lint`: Valida tipos e checa consistência através do compilador TypeScript (`tsc --noEmit`).

---

## 🌟 Recursos de Acessibilidade e Experiência da Criança

* **Contraste de Cores**: Cores vivas e contrastantes (azul celeste para soma, laranja para subtração, roxo para multiplicação, esmeralda para divisão e âmbar para porcentagem).
* **Feedback Multissensorial**: Combinação de estímulo visual (grade/figurinhas), tátil/auditivo (sons nas teclas) e auditivo/verbal (narração por voz).
* **Sem Erros Intimidadores**: Alertas amigáveis explicam o porquê de um número ser grande demais ou o motivo pelo qual não dividimos nada por zero.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e didáticos. Sinta-se à vontade para utilizar, modificar e compartilhar com crianças, professores e famílias! 🐾✨

