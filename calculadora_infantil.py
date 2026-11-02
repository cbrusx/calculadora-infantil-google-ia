"""
============================================================
           🐾 CALCULADORA INFANTIL EM PYTHON 🐾
    Uma calculadora simples e divertida para crianças!
         Aprenda: Adição, Subtração, Multiplicação e Divisão
============================================================
"""

import time

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


def menu_principal():
    """Menu simples e amigável."""
    print("=" * 46)
    print("      🌈 CALCULADORA DIVERTIDA 🌈")
    print("=" * 46)
    print("Escolha o que você quer fazer:")
    print("  [1] ➕ Adição       (Juntar / Somar)")
    print("  [2] ➖ Subtração    (Tirar / Diminuir)")
    print("  [3] ✖️ Multiplicação (Grupinhos / Vezes)")
    print("  [4] ➗ Divisão      (Repartir igualmente)")
    print("  [5] ❌ Sair")
    print("=" * 46)


def executar_calculadora():
    """Função principal que roda o programa da calculadora."""
    print("\n🐶 Olá, amiguinho(a)! Bem-vindo(a) à sua Calculadora de Matemática!")
    
    # Escolha de tema de figurinhas
    item_nome = "Maçãs"
    item_emoji = "🍎"

    while True:
        menu_principal()
        opcao = input("Digite o número da operação (1, 2, 3, 4 ou 5): ").strip()

        if opcao == "5":
            print("\n🌟 Muito obrigado por estudar matemática hoje! Até a próxima! 👋\n")
            break

        if opcao not in ["1", "2", "3", "4"]:
            print("\n⚠️  Ops! Escolha um número de 1 a 5, tá bom?\n")
            time.sleep(1)
            continue

        # Nomes das operações
        operacoes = {
            "1": ("+", "Adição", somar),
            "2": ("-", "Subtração", subtrair),
            "3": ("*", "Multiplicação", multiplicar),
            "4": ("/", "Divisão", dividir),
        }

        simbolo, nome_op, funcao = operacoes[opcao]

        print(f"\n✨ Vamos fazer uma conta de {nome_op.upper()}! ✨")

        try:
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
        print(f"🎉 RESULTADO:  {formatar_numero(num1)} {simbolo} {formatar_numero(num2)} = {formatar_numero(resultado)}")
        print("—" * 46)

        # Mostra itens visuais se os números forem inteiros pequenos
        if num1.is_integer() and num2.is_integer() and resultado.is_integer():
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
