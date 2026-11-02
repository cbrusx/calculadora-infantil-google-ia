"""
============================================================
           🐾 CALCULADORA INFANTIL EM PYTHON 🐾
    Uma calculadora simples e divertida para crianças!
  Aprenda: Adição, Subtração, Multiplicação, Divisão e Porcentagem
============================================================
"""

import sys
import time

# Garante suporte a emojis no terminal Windows
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Lista de emojis divertidos para contar
ITENS_VISUAIS = {
    "1": ("Maçãs", "🍎"),
    "2": ("Estrelas", "⭐"),
    "3": ("Carrinhos", "🚗"),
    "4": ("Cachorrinhos", "🐶"),
    "5": ("Balinhas", "🍬"),
}


def desenhar_itens(quantidade: int, emoji: str = "🍎") -> str:
    """Mostra os itens visualmente para a criança contar (até 30)."""
    if quantidade <= 0:
        return "(nenhum)"
    if quantidade > 30:
        return f"{emoji * 15} ... e mais ({quantidade} no total!)"
    return (emoji + " ") * quantidade


def desenhar_barra_chocolate(porcento: float) -> str:
    """Desenha a representação de 100 quadradinhos de chocolate."""
    p = max(0, min(100, int(round(porcento))))
    blocos = p // 5  # Barra com 20 blocos (cada bloco = 5%)
    restantes = 20 - blocos
    barra = "🍫" * blocos + "▫️ " * restantes
    return f"[{barra}] {p}% de 100 pedacinhos"


def somar(a: float, b: float) -> float:
    """Junta dois valores."""
    return a + b


def subtrair(a: float, b: float) -> float:
    """Tira uma quantidade de outra."""
    return a - b


def multiplicar(a: float, b: float) -> float:
    """Repete uma quantidade várias vezes."""
    return a * b


def dividir(a: float, b: float):
    """Reparte uma quantidade em partes iguais."""
    if b == 0:
        return None  # Divisão por zero não permitida
    return a / b


def porcentagem(porcento: float, total: float) -> float:
    """Calcula quanto vale uma porcentagem de um valor total (ex: 20% de 100 = 20)."""
    return (porcento * total) / 100


def formatar_numero(n: float) -> str:
    """Deixa o número bonitinho (ex: 5 em vez de 5.0)."""
    if n.is_integer():
        return str(int(n))
    return f"{n:.2f}"


def explicacao_infantil(op: str, num1: float, num2: float, res: float, nome_item: str, emoji: str):
    """Explica a conta com uma historinha para a criança entender."""
    n1 = formatar_numero(num1)
    n2 = formatar_numero(num2)
    r = formatar_numero(res)

    print("\n💡 HISTORINHA DA CONTA:")
    if op == "+":
        print(f"👉 Você tinha {n1} {nome_item.lower()} {emoji} e ganhou mais {n2} {emoji}.")
        print(f"👉 Ao juntar tudo, você ficou com {r} {nome_item.lower()}! 🎉")
    elif op == "-":
        print(f"👉 Você tinha {n1} {nome_item.lower()} {emoji} e usou/comeu {n2} {emoji}.")
        print(f"👉 Agora sobraram {r} {nome_item.lower()} para você! 🎈")
    elif op == "*":
        print(f"👉 Você tem {n1} grupinhos, e cada grupinho tem {n2} {nome_item.lower()} {emoji}.")
        print(f"👉 Contando todos juntos, são {r} {nome_item.lower()}! ⭐")
    elif op == "/":
        print(f"👉 Você tem {n1} {nome_item.lower()} {emoji} para repartir entre {n2} amigos igualmente.")
        print(f"👉 Cada amigo vai receber {r} {nome_item.lower()}! 🤝")
    elif op == "%":
        print("👉 A palavra 'POR CENTO' significa 'de cada 100 pedacinhos'!")
        print("👉 Imagine uma barra de chocolate dividida em 100 quadradinhos 🍫 (ou uma pizza de 100 fatias 🍕)!")
        if n2 == "100":
            print(f"👉 Comer {n1}% da barra é saborear exatamente {r} quadradinhos dos 100! 😋")
        else:
            print(f"👉 Em um total de {n2}, tirar {n1}% equivale a {r} pedacinhos! Delícia! 🎉")


def menu_principal():
    """Menu simples e amigável."""
    print("=" * 48)
    print("      🌈 CALCULADORA DIVERTIDA 🌈")
    print("=" * 48)
    print("Escolha o que você quer fazer:")
    print("  [1] ➕ Adição       (Juntar / Somar)")
    print("  [2] ➖ Subtração    (Tirar / Diminuir)")
    print("  [3] ✖️ Multiplicação (Grupinhos / Vezes)")
    print("  [4] ➗ Divisão      (Repartir igualmente)")
    print("  [5] 🍫 Porcentagem  (Pedacinhos de 100 - Chocolate)")
    print("  [6] ❌ Sair")
    print("=" * 48)


def executar_calculadora():
    """Função principal que roda o programa da calculadora."""
    print("\n🐶 Olá, amiguinho(a)! Bem-vindo(a) à sua Calculadora de Matemática!")
    
    # Escolha de tema de figurinhas
    item_nome = "Maçãs"
    item_emoji = "🍎"

    while True:
        menu_principal()
        opcao = input("Digite o número da operação (1, 2, 3, 4, 5 ou 6): ").strip()

        if opcao == "6":
            print("\n🌟 Muito obrigado por estudar matemática hoje! Até a próxima! 👋\n")
            break

        if opcao not in ["1", "2", "3", "4", "5"]:
            print("\n⚠️  Ops! Escolha um número de 1 a 6, tá bom?\n")
            time.sleep(1)
            continue

        # Nomes das operações
        operacoes = {
            "1": ("+", "Adição", somar),
            "2": ("-", "Subtração", subtrair),
            "3": ("*", "Multiplicação", multiplicar),
            "4": ("/", "Divisão", dividir),
            "5": ("%", "Porcentagem", porcentagem),
        }

        simbolo, nome_op, funcao = operacoes[opcao]

        print(f"\n✨ Vamos fazer uma conta de {nome_op.upper()}! ✨")

        try:
            if opcao == "5":
                num1 = float(input("Digite a PORCENTAGEM (ex: 20 para 20%): "))
                num2 = float(input("Digite o VALOR TOTAL (ex: 100 para uma barra inteira): "))
            else:
                num1 = float(input("Digite o PRIMEIRO número: "))
                num2 = float(input("Digite o SEGUNDO número: "))
        except ValueError:
            print("⚠️ Ops! Digite apenas números válidos (ex: 2, 5, 10). Tente de novo!\n")
            continue

        # Caso especial da divisão por zero
        if simbolo == "/" and num2 == 0:
            print("\n🎈 OPS! Não é possível dividir por ZERO!")
            print("É como ter docinhos e tentar repartir com ninguém! Não faz sentido, né? 😉")
            print("Tente com um número diferente de zero!\n")
            continue

        resultado = funcao(num1, num2)

        # Apresentação do resultado
        print("\n" + "—" * 46)
        if simbolo == "%":
            print(f"🎉 RESULTADO:  {formatar_numero(num1)}% de {formatar_numero(num2)} = {formatar_numero(resultado)}")
        else:
            print(f"🎉 RESULTADO:  {formatar_numero(num1)} {simbolo} {formatar_numero(num2)} = {formatar_numero(resultado)}")
        print("—" * 46)

        # Mostra itens visuais
        if simbolo == "%":
            print("\n🍫 OLHA SÓ A BARRA DE CHOCOLATE DOS 100 QUADRADINHOS:")
            print(f"  {desenhar_barra_chocolate(num1)}")
            print(f"  👉 {formatar_numero(resultado)} pedacinhos saboreados de {formatar_numero(num2)}!")
        elif num1.is_integer() and num2.is_integer() and resultado.is_integer():
            i1 = int(num1)
            i2 = int(num2)
            ir = int(resultado)

            if 0 <= i1 <= 15 and 0 <= i2 <= 15 and 0 <= ir <= 30:
                print("\n👀 OLHA SÓ COMO FICA COM FIGURINHAS:")
                if simbolo == "+":
                    print(f"  {desenhar_itens(i1, item_emoji)} + {desenhar_itens(i2, item_emoji)}")
                    print(f"  = {desenhar_itens(ir, item_emoji)}")
                elif simbolo == "-":
                    print(f"  {desenhar_itens(i1, item_emoji)} (tirando {i2})")
                    print(f"  = Sobram: {desenhar_itens(ir, item_emoji)}")
                elif simbolo == "*":
                    print(f"  {i1} vezes o grupinho de {i2}:")
                    for g in range(min(i1, 5)):
                        print(f"    Grupinho {g+1}: {desenhar_itens(i2, item_emoji)}")
                    print(f"  = Total: {desenhar_itens(ir, item_emoji)}")
                elif simbolo == "/":
                    print(f"  {desenhar_itens(i1, item_emoji)} divididos em {i2} partes iguais:")
                    print(f"  = Cada um ganha: {desenhar_itens(ir, item_emoji)}")

        # Explicação amigável em história
        explicacao_infantil(simbolo, num1, num2, resultado, item_nome, item_emoji)

        print("\n" + "=" * 46)
        input("Pressione [ENTER] para fazer outra conta...")
        print()


# Quando executado diretamente pelo terminal
if __name__ == "__main__":
    executar_calculadora()
