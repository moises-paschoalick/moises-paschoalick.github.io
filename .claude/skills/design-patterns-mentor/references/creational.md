# Padrões Criacionais (Creational)

Padrões que lidam com **como objetos são criados**. O problema central que eles resolvem: instanciar diretamente com `new` em todo lugar acopla seu código a classes concretas e torna mudanças dolorosas.

## Singleton

**Intenção:** garantir uma única instância de uma classe e fornecer ponto de acesso global a ela.

**Analogia:** o presidente de um país. Existe apenas um por vez, e todo mundo se refere a "o presidente" sem precisar de identificador.

**Quando usar:**
- Recurso compartilhado caro de criar (pool de conexões, cache, configuração)
- Coordenação central genuinamente necessária

**Quando NÃO usar (a maioria das vezes):**
- Como atalho para "variável global" — isso esconde dependências e mata testabilidade
- Logger, em geral pode ser injetado em vez de Singleton
- Em apps modernos, prefira **escopo de container DI** (singleton gerenciado) em vez de Singleton estático

**Pegadinhas:**
- Thread-safety: lazy initialization ingênua quebra em multithread. Use `enum`, `holder idiom` ou `volatile` + double-checked locking.
- Em Java, `enum Singleton` é a forma mais robusta (Joshua Bloch, *Effective Java*).
- Singleton + estado mutável + multithread = receita para bugs sutis.

**Viola SOLID?** Tende a violar SRP (gerencia ciclo de vida + lógica de negócio) e DIP (clientes dependem da classe concreta `Foo.getInstance()`).

## Factory Method

**Intenção:** definir uma interface para criar um objeto, mas deixar subclasses decidirem qual classe instanciar.

**Analogia:** a pizzaria franquia. A matriz define o processo (`fazerPizza()`: preparar massa → assar → cortar → entregar), mas cada filial (NY, Chicago, SP) tem seu próprio `criarPizza()` que decide o estilo.

**Sinal de que você precisa:** você tem um método com um `switch/if-else` em cima de um tipo que decide qual subclasse instanciar.

**Comparação com Abstract Factory:** Factory Method usa **herança** (subclasse decide); Abstract Factory usa **composição** (você passa uma fábrica como dependência) e cria **famílias** de objetos relacionados.

## Abstract Factory

**Intenção:** criar **famílias** de objetos relacionados sem especificar suas classes concretas.

**Analogia:** loja de móveis que vende kits temáticos. O kit "vitoriano" tem cadeira vitoriana + mesa vitoriana + sofá vitoriano. O kit "moderno" tem versões modernas de cada. Você escolhe o kit; ele garante que tudo combina.

**Quando usar:** sua aplicação precisa funcionar com múltiplas variantes de um conjunto de objetos (ex: tema claro/escuro, drivers Windows/Mac/Linux, ambientes dev/prod).

**Trade-off:** adicionar um novo *tipo* de produto (não variante) é doloroso — toca todas as fábricas.

## Builder

**Intenção:** separar a construção de um objeto complexo da sua representação, permitindo o mesmo processo de construção criar representações diferentes.

**Analogia:** montar um lanche no Subway. Pão (obrigatório) → proteína → queijo → vegetais → molhos. Cada passo é independente, alguns são opcionais, e a ordem é controlada.

**Quando usar:**
- Objetos com muitos parâmetros, vários opcionais (combate o "telescoping constructor anti-pattern")
- Construção precisa de validação ao final
- Você quer objetos imutáveis com API fluente

**Em Java moderno:**
- Lombok `@Builder` cobre 90% dos casos
- Records + métodos `with` cobrem casos imutáveis simples

**Builder vs Factory:** Builder é para construção *passo-a-passo* com configuração rica; Factory é para decidir *qual classe* instanciar.

## Prototype

**Intenção:** criar novos objetos clonando uma instância existente em vez de instanciar do zero.

**Analogia:** xerox de um documento. Em vez de redatar tudo, você copia e ajusta o que precisa.

**Quando usar:**
- Criar objeto do zero é caro (carrega de banco, faz cálculo pesado)
- Variações de um mesmo "template" base
- Cenários onde a classe concreta só é conhecida em runtime

**Java:** implemente `Cloneable` com cuidado (clone raso vs profundo). Em muitos casos, **copy constructor** ou **factory method de cópia** é mais limpo que `Object.clone()`.

## Pegadinhas comuns nesta categoria

- **Factory Method vs Abstract Factory:** se você tem dúvida, provavelmente é Factory Method. Abstract Factory só compensa quando há de fato uma *família* de produtos.
- **Builder para 3 parâmetros é overkill.** Use construtor normal.
- **Singleton é o padrão mais abusado.** Antes de usar, pergunte: "isso não seria melhor como dependência injetada?"
