Decorator Pattern — explicado de forma visual ☕

O Decorator Pattern permite:

adicionar comportamentos a um objeto dinamicamente
sem alterar sua classe original.

Analogia do mundo real

Imagine um presente 🎁

Você tem:

Caixa simples

Agora pode decorar com:

papel vermelho
fita dourada
cartão

Cada camada:

envolve a anterior
adiciona algo novo
Visualmente
Cartão
   ↓
Fita dourada
   ↓
Papel vermelho
   ↓
Caixa

Isso é exatamente o Decorator.

Exemplo em Java ☕
1. Componente base
interface Cafe {

    String descricao();

    double preco();
}
2. Objeto principal
class CafeSimples implements Cafe {

    public String descricao() {
        return "Café simples";
    }

    public double preco() {
        return 5.0;
    }
}
3. Decorator base

O decorator também IMPLEMENTA a mesma interface.

abstract class CafeDecorator implements Cafe {

    protected Cafe cafe;

    public CafeDecorator(Cafe cafe) {
        this.cafe = cafe;
    }
}
4. Decorator de leite
class Leite extends CafeDecorator {

    public Leite(Cafe cafe) {
        super(cafe);
    }

    public String descricao() {
        return cafe.descricao() + " + leite";
    }

    public double preco() {
        return cafe.preco() + 2.0;
    }
}
5. Decorator de chocolate
class Chocolate extends CafeDecorator {

    public Chocolate(Cafe cafe) {
        super(cafe);
    }

    public String descricao() {
        return cafe.descricao() + " + chocolate";
    }

    public double preco() {
        return cafe.preco() + 3.0;
    }
}
6. Uso
public class Main {

    public static void main(String[] args) {

        Cafe cafe = new CafeSimples();

        cafe = new Leite(cafe);

        cafe = new Chocolate(cafe);

        System.out.println(cafe.descricao());

        System.out.println(cafe.preco());
    }
}
Resultado
Café simples + leite + chocolate
10.0
O que aconteceu?

O objeto foi sendo “embrulhado”:

Chocolate
    ↓
Leite
    ↓
CafeSimples

Cada decorator:

recebe o objeto anterior
adiciona comportamento
devolve um novo objeto decorado
Estrutura oficial do pattern
Component
Cafe

Contrato comum.

Concrete Component
CafeSimples

Objeto base.

Decorator
CafeDecorator

Classe abstrata que envolve o componente.

Concrete Decorators
Leite
Chocolate

Adicionam comportamento.

Por que isso é poderoso?

Sem decorator você faria:

CafeComLeite
CafeComChocolate
CafeComLeiteEChocolate
CafeComTudo

Explosão de subclasses.

Com decorator

Você monta dinamicamente:

new Chocolate(
    new Leite(
        new CafeSimples()
    )
)
Analogia LEGO 🧱

Herança:

peça fixa

Decorator:

peças encaixáveis
Exemplo REAL do Java

O Java usa MUITO decorator em IO.

InputStream input =
    new BufferedInputStream(
        new FileInputStream("arquivo.txt")
    );
Aqui:
Base
FileInputStream

lê arquivo.

Decorator
BufferedInputStream

adiciona buffer.

Visualmente
BufferedInputStream
        ↓
FileInputStream
Benefícios
Open/Closed

Adiciona funcionalidades sem modificar classes antigas.

Baixo acoplamento

Cada decorator conhece apenas a interface.

Reutilização

Chocolate pode decorar:

café
cappuccino
chá
Flexibilidade

Combina funcionalidades dinamicamente.

Frase para fixar

Decorator adiciona comportamento por composição,
não por herança.

Ele e do tipo comportamental?

Não.
O Decorator Pattern é um padrão estrutural.

Classificação oficial dos Design Patterns (GoF)

Os padrões são divididos em:

Categoria	Objetivo
Criacionais	criação de objetos
Estruturais	composição/estrutura
Comportamentais	comunicação e comportamento
Decorator pertence a:
Padrões Estruturais

Porque ele:

altera a estrutura do objeto
“embrulha” objetos
compõe objetos dinamicamente
Analogia

Decorator funciona como:

camadas

ou:

acessórios encaixados

Ele muda a composição estrutural do objeto.

Por que parece comportamental?

Porque ele também adiciona comportamentos.

Exemplo:

new Chocolate(
    new Leite(
        new Cafe()
    )
)

Cada camada adiciona:

lógica
funcionalidades
comportamento extra

Mas a forma como ele faz isso é:

via composição estrutural

não via fluxo de comportamento entre objetos.

Comparando
Decorator (estrutural)

Foco:

como objetos são compostos
Strategy (comportamental)

Foco:

como algoritmos variam
Observer (comportamental)

Foco:

como objetos se comunicam
Decorator visualmente
Chocolate
    ↓
Leite
    ↓
Cafe

Estrutura em camadas.

Outros padrões estruturais famosos
Pattern	Objetivo
Adapter	adaptar interfaces
Facade	simplificar subsistemas
Proxy	controlar acesso
Composite	árvore de objetos
Bridge	separar abstração da implementação
Decorator	adicionar funcionalidades dinamicamente
Regra fácil para lembrar
Estrutural

Pergunta:

“como os objetos são montados?”
Comportamental

Pergunta:

“como os objetos se comportam/comunicam?”
Decorator

Resposta:

“objetos são embrulhados em camadas”

Por isso ele é estrutural.

Qual padrão é parecido com ele

O padrão mais parecido com o Decorator é o Proxy.
Os dois:

“embrulham” outro objeto
implementam a mesma interface
usam composição
possuem estrutura MUITO parecida
Decorator vs Proxy

Visualmente os dois são quase iguais:

ObjetoA
   ↓
ObjetoReal
Diferença principal
Decorator

Adiciona funcionalidades.

Proxy

Controla acesso ao objeto.

Analogia real ☕
Decorator

Você pede café e adiciona:

leite
chocolate
chantilly

O objeto ganha funcionalidades.

Proxy

Você quer falar com um famoso.

Mas passa antes por:

secretário
segurança
recepcionista

O proxy controla o acesso.

Estrutura do Decorator
Chocolate
    ↓
Cafe

Adiciona comportamento.

Estrutura do Proxy
ProxyBanco
      ↓
BancoReal

Controla:

autenticação
cache
lazy loading
permissão
Código exemplo — Proxy
Interface
interface Video {

    void assistir();
}
Objeto real
class VideoReal implements Video {

    public void assistir() {
        System.out.println("Executando vídeo");
    }
}
Proxy
class VideoProxy implements Video {

    private VideoReal video;

    public void assistir() {

        if (video == null) {
            video = new VideoReal();
        }

        System.out.println("Verificando permissão");

        video.assistir();
    }
}
Uso
Video video = new VideoProxy();

video.assistir();
Resultado
Verificando permissão
Executando vídeo
Semelhança estrutural

Os dois seguem:

interface comum

e:

objeto envolvendo outro objeto
Mas a intenção muda
Decorator

Objetivo:

adicionar responsabilidades
Proxy

Objetivo:

controlar acesso
Outros patterns parecidos
1. Adapter

Também envolve outro objeto.

Mas o objetivo é:
converter interfaces
Analogia

Tomada universal 🔌

2. Composite

Também trabalha com estrutura recursiva.

Mas o objetivo é:
tratar grupo e objeto individual igual
Analogia

Pastas e arquivos.

3. Chain of Responsibility

Também cria encadeamento.

Mas o objetivo é:
passar requisições em cadeia
Analogia

Suporte técnico:

nível 1
nível 2
gerente
O mais parecido MESMO
Estruturalmente:
Proxy
Conceitualmente:
Composite

porque ambos trabalham composição.

Regra fácil para diferenciar
Pattern	Pergunta
Decorator	“Quero adicionar funcionalidades?”
Proxy	“Quero controlar acesso?”
Adapter	“Quero converter interface?”
Composite	“Quero tratar árvore de objetos?”
Frase para fixar

Decorator e Proxy parecem irmãos gêmeos na estrutura,
mas têm intenções completamente diferentes.