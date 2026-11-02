export const PYTHON_SCRIPT_CODE = `"""
🐾 CALCULADORA INFANTIL EM PYTHON 🐾
As 4 operações básicas da matemática explicadas passo a passo!
"""

# Função 1: Adição (Somar / Juntar)
def somar(a, b):
    return a + b

# Função 2: Subtração (Diminuir / Tirar)
def subtrair(a, b):
    return a - b

# Função 3: Multiplicação (Vezes / Repetir grupinhos)
def multiplicar(a, b):
    return a * b

# Função 4: Divisão (Repartir em partes iguais)
def dividir(a, b):
    if b == 0:
        return None  # Não dá para dividir por zero!
    return a / b

# Função para desenhar figurinhas na tela
def desenhar_figurinhas(quantidade, emoji="🍎"):
    if quantidade <= 0:
        return "(nenhum)"
    if quantidade > 20:
        return f"{emoji * 10} ... (+ {quantidade} itens!)"
    return (emoji + " ") * int(quantidade)

# Programa Principal Interativo
def calculadora_infantil():
    print("=" * 44)
    print("   🌈 BEM-VINDO À CALCULADORA INFANTIL! 🌈")
    print("=" * 44)
    print("Escolha a operação:")
    print("  [1] ➕ Adição (Somar)")
    print("  [2] ➖ Subtração (Tirar)")
    print("  [3] ✖️ Multiplicação (Vezes)")
    print("  [4] ➗ Divisão (Repartir)")
    print("  [5] ❌ Sair")
    
    while True:
        opcao = input("\\nQual operação você quer fazer (1-5)? ").strip()
        
        if opcao == "5":
            print("\\n🌟 Parabéns pelos estudos! Até logo! 👋\\n")
            break
            
        if opcao not in ["1", "2", "3", "4"]:
            print("⚠️ Digite um número de 1 a 5, por favor!")
            continue
            
        try:
            num1 = float(input("Digite o 1º número: "))
            num2 = float(input("Digite o 2º número: "))
        except ValueError:
            print("⚠️ Digite apenas números válidos!")
            continue

        if opcao == "1":
            res = somar(num1, num2)
            print(f"\\n🎉 {num1} + {num2} = {res}")
            print(f"👀 {desenhar_figurinhas(num1)} + {desenhar_figurinhas(num2)} = {desenhar_figurinhas(res)}")
            print(f"💡 Você juntou tudo e ficou com {res}!")
            
        elif opcao == "2":
            res = subtrair(num1, num2)
            print(f"\\n🎉 {num1} - {num2} = {res}")
            print(f"💡 Você tinha {num1}, tirou {num2} e sobraram {res}!")
            
        elif opcao == "3":
            res = multiplicar(num1, num2)
            print(f"\\n🎉 {num1} × {num2} = {res}")
            print(f"💡 São {num1} grupinhos de {num2}, totalizando {res}!")
            
        elif opcao == "4":
            if num2 == 0:
                print("\\n🎈 OPS! Não é possível dividir por ZERO!")
                print("É como ter brinquedos e ninguém para brincar junto! 😉")
            else:
                res = dividir(num1, num2)
                print(f"\\n🎉 {num1} ÷ {num2} = {res}")
                print(f"💡 Repartindo igualmente, cada um ganha {res}!")

if __name__ == "__main__":
    calculadora_infantil()
`;

export interface PythonConcept {
  id: string;
  title: string;
  iconName: string;
  explanation: string;
  codeSnippet: string;
  childAnalogy: string;
}

export const PYTHON_CONCEPTS: PythonConcept[] = [
  {
    id: 'functions',
    title: 'Funções (def)',
    iconName: 'Wrench',
    explanation: 'Em Python, usamos a palavrinha "def" para criar uma receitinha mágica. Cada operação matemática vira uma função separada que faz uma coisa só!',
    codeSnippet: `def somar(a, b):\n    return a + b`,
    childAnalogy: 'É como ter uma caixinha de brinquedo: você coloca duas peças dentro, aperta o botão e ela devolve a soma montada!',
  },
  {
    id: 'conditionals',
    title: 'Condições (if / else)',
    iconName: 'HelpCircle',
    explanation: 'O "if" serve para tomar decisões inteligentes no código. Usamos para checar se a criança digitou 0 na divisão ou se escolheu uma opção válida.',
    codeSnippet: `if b == 0:\n    return None  # Divisão por zero!\nelse:\n    return a / b`,
    childAnalogy: 'É como uma regra do recreio: "Se chover, ficamos dentro; se fizer sol, vamos para o parquinho!"',
  },
  {
    id: 'loops',
    title: 'Repetição (while True)',
    iconName: 'Repeat',
    explanation: 'O comando "while" faz a calculadora continuar aberta para a criança fazer quantas continhas quiser, até escolher a opção 5 para sair.',
    codeSnippet: `while True:\n    opcao = input("Qual operação? ")\n    if opcao == "5":\n        break`,
    childAnalogy: 'É como um carrossel do parque que continua girando com segurança até você pedir para descer.',
  },
  {
    id: 'inputs',
    title: 'Entrada e Saída (input & print)',
    iconName: 'MessageSquare',
    explanation: 'O "input" escuta o que a criança digita no teclado, e o "print" fala de volta na tela com emojis e respostas coloridas.',
    codeSnippet: `numero = float(input("Digite um número: "))\nprint(f"Seu número é {numero}! 🎉")`,
    childAnalogy: 'O input é o ouvido do computador e o print é a boca dele conversando com você!',
  },
];
