# Padrões Estruturais (Structural)

Padrões que lidam com **como classes e objetos se compõem** para formar estruturas maiores. O foco é em relacionamentos.

## Adapter (Wrapper)

**Intenção:** converter a interface de uma classe em outra que o cliente espera. Permite que classes incompatíveis trabalhem juntas.

**Analogia:** adaptador de tomada. Seu notebook tem plugue de três pinos; a tomada do hotel tem dois. O adaptador "traduz" entre os dois sem mudar nenhum dos lados.

**Quando usar:**
- Integrar biblioteca de terceiros com API diferente da sua
- Fazer código legado conversar com código novo
- Trazer várias APIs heterogêneas para um formato unificado

**Variantes:**
- **Adapter de objeto** (composição) — preferível
- **Adapter de classe** (herança múltipla) — limitado em Java

## Bridge

**Intenção:** desacoplar uma abstração de sua implementação para que ambas variem independentemente.

**Analogia:** controle remoto e TV. O controle (abstração) pode ser básico ou avançado; a TV (implementação) pode ser Samsung, LG, Sony. Você pode combinar qualquer controle com qualquer TV — eles evoluem separados.

**Sintoma de que você precisa:** explosão combinatória de subclasses (`FormaCirculoVermelho`, `FormaCirculoAzul`, `FormaQuadradoVermelho`, `FormaQuadradoAzul`...).

**Bridge vs Adapter:** Adapter faz coisas incompatíveis funcionarem juntas *depois* que existem; Bridge é planejamento *prévio* para que duas dimensões variem livres.

## Composite

**Intenção:** compor objetos em estruturas de árvore para representar hierarquias parte-todo. Cliente trata objetos individuais e composições uniformemente.

**Analogia:** sistema de pastas. Uma pasta contém arquivos e outras pastas. Quando você pede o tamanho, ela soma o tamanho de todos os filhos recursivamente — você não precisa saber se é arquivo ou subpasta.

**Quando usar:**
- Hierarquias recursivas (menus, organogramas, expressões matemáticas, DOM)
- Operações que se aplicam uniformemente em folhas e galhos

**Trade-off:** a interface comum às vezes força operações sem sentido na folha (`adicionarFilho()` num arquivo). Saiba escolher entre "transparente" (interface única, alguns métodos podem lançar exceção) ou "seguro" (interfaces separadas, perde uniformidade).

## Decorator

**Intenção:** adicionar responsabilidades a objetos dinamicamente, sem alterar sua classe. Alternativa flexível à herança.

**Analogia:** cafeteria. Você começa com um café base (R$5). Adiciona leite (+R$1), chantilly (+R$2), calda de caramelo (+R$1,50). Cada "decoração" embrulha a anterior e adiciona seu preço/descrição.

**Estrutura mental:** boneca russa. Cada decorador envolve outro objeto que tem a mesma interface.

**Exemplo canônico:** `BufferedReader` envolvendo `FileReader` envolvendo... em Java I/O.

**Quando usar:**
- Combinações de comportamento que explodiriam por herança
- Adicionar funcionalidade transversal (logging, cache, compressão, criptografia) sem tocar a classe original

**Cuidado:** muitos decoradores empilhados viram pesadelo de debug. Limite a profundidade.

## Facade

**Intenção:** fornecer uma interface unificada e simplificada para um conjunto de interfaces num subsistema complexo.

**Analogia:** recepcionista de hotel. Você quer "fazer check-in" — uma operação. Internamente isso envolve verificar reserva, cobrar cartão, alocar quarto, programar a chave, registrar no sistema. Você fala com a recepcionista; ela coordena tudo.

**Quando usar:**
- Esconder complexidade de um subsistema legado ou de terceiros
- Oferecer um "ponto de entrada" simples para 80% dos casos de uso
- Reduzir acoplamento entre camadas

**Não confunda com Adapter:** Adapter muda a interface para compatibilidade; Facade simplifica uma interface complexa.

## Flyweight

**Intenção:** compartilhar objetos pequenos para suportar grande quantidade deles eficientemente.

**Analogia:** caracteres num editor de texto. Em vez de cada `'a'` ser um objeto separado com fonte, tamanho, cor, peso (gastando memória absurda num documento), todos os `'a'` compartilham o mesmo objeto "letra a" e a posição/contexto vem de fora.

**Estado intrínseco** (compartilhado) vs **extrínseco** (passado como parâmetro).

**Quando usar:**
- Você precisa criar **muitos** objetos similares (milhares, milhões)
- A memória virou problema mensurável

**Quando não usar:** sempre que você não tiver medido o problema. Otimização prematura.

## Proxy

**Intenção:** fornecer um substituto/representante para outro objeto para controlar acesso a ele.

**Analogia:** secretária de executivo. Você não fala direto com o CEO — fala com a secretária, que filtra, agenda, ou responde por ele em casos simples.

**Variantes:**
- **Virtual Proxy** — adia criação do objeto real (lazy loading; ex: `Hibernate` proxies)
- **Protection Proxy** — controla acesso (autorização)
- **Remote Proxy** — representa objeto em outra JVM/máquina (RMI, gRPC stubs)
- **Smart Proxy** — adiciona comportamento extra (contagem de referências, cache, logging)

**Proxy vs Decorator:** estruturalmente parecidos. **Intenção** difere: Decorator *adiciona comportamento*, Proxy *controla acesso*.

## Pegadinhas comuns nesta categoria

- **Decorator, Proxy, Adapter e Facade são primos.** Todos "embrulham" outro objeto. A diferença está na intenção. Decore quando quer somar comportamento; faça proxy quando quer controlar; adapte quando quer compatibilizar; faça facade quando quer simplificar.
- **Composite vs hierarquia simples:** se a estrutura não é genuinamente recursiva, Composite é overkill.
- **Flyweight requer profiling.** Não aplique "porque parece elegante" — só vale a pena quando a memória dói de verdade.
