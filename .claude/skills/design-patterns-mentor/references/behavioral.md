# Padrões Comportamentais (Behavioral)

Padrões que lidam com **algoritmos, atribuição de responsabilidades e comunicação entre objetos**. O foco é em fluxo de controle e colaboração.

## Chain of Responsibility

**Intenção:** passar uma requisição ao longo de uma cadeia de handlers até que algum a processe.

**Analogia:** atendimento ao cliente. Você liga, fala com nível 1 (FAQ); se não resolver, ele encaminha para nível 2 (suporte técnico); se ainda não, vai para o supervisor. Você não sabe quem vai resolver — só sabe que entrou na fila.

**Quando usar:**
- Filtros e middlewares (frameworks web são um exemplo perfeito: autenticação → autorização → logging → handler)
- Validações encadeadas
- Pipelines de processamento

**Cuidado:** se nenhum handler processar, a requisição morre silenciosamente. Tenha um "fallback" no fim da cadeia.

## Command

**Intenção:** encapsular uma requisição como um objeto, permitindo parametrizar clientes com diferentes requisições, enfileirá-las, registrá-las ou desfazê-las.

**Analogia:** controle remoto universal com botões programáveis. Cada botão guarda um "comando" (ligar TV, mudar volume, trocar canal). O controle não sabe o que cada botão faz — só executa `comando.executar()`.

**Quando usar:**
- Operações desfazíveis (undo/redo)
- Filas de tarefas, agendamento
- Macros (sequências de comandos)
- Transações

**Estrutura:** `Invoker` (controle) chama `Command.execute()`; `Command` concreto delega para o `Receiver` (TV, luz, etc.).

## Interpreter

**Intenção:** definir uma representação para a gramática de uma linguagem, com um interpretador que usa essa representação para avaliar sentenças.

**Analogia:** uma calculadora que entende "2 + 3 * 4". A expressão vira uma árvore (`+` no topo, `2` à esquerda, `*` à direita com `3` e `4` como filhos), e a calculadora "interpreta" andando pela árvore.

**Quando usar (raro):**
- DSLs (linguagens de domínio) — ex: regras de negócio configuráveis
- Parsers simples
- Interpretadores de templates

**Aviso:** em quase todos os casos modernos, use uma biblioteca de parsing (ANTLR, parser combinators) em vez de implementar Interpreter à mão. Saber o padrão é mais útil para *reconhecê-lo* em código existente.

## Iterator

**Intenção:** prover uma forma de acessar elementos de um agregado sequencialmente sem expor sua representação interna.

**Analogia:** controle remoto de TV antiga, botões "canal +" / "canal −". Você navega sem saber se internamente é array, lista encadeada ou árvore.

**Em Java:** o padrão já é nativo via `Iterator<T>` e `Iterable<T>`. O for-each (`for (Item i : lista)`) é açúcar sobre isso. Você raramente implementa do zero — mas implementar um iterador customizado para uma estrutura sua é o uso típico.

## Mediator

**Intenção:** definir um objeto que encapsula como um conjunto de objetos interage. Promove acoplamento fraco evitando que objetos se referenciem explicitamente.

**Analogia:** torre de controle de um aeroporto. Aviões não conversam diretamente uns com os outros — todos falam com a torre, que coordena pousos, decolagens e rotas.

**Quando usar:**
- UI com muitos componentes que se afetam (mudar dropdown afeta lista, que afeta botão...)
- Chat room (usuários falam com a sala, não direto entre si)
- Reduzir grafo de dependências N×N para N×1

**Cuidado:** o Mediator pode virar uma classe-deus se não for bem desenhado. Mantenha responsabilidade focada.

## Memento

**Intenção:** capturar e externalizar o estado interno de um objeto sem violar encapsulamento, para que ele possa ser restaurado depois.

**Analogia:** Ctrl+Z. Um editor de texto guarda "fotos" do estado atual de tempos em tempos; quando você desfaz, ele restaura uma foto anterior.

**Estrutura:**
- **Originator** — o objeto cujo estado é salvo
- **Memento** — a foto (opaca para outros)
- **Caretaker** — guarda os mementos, sem mexer no conteúdo

**Quando usar:** undo/redo, snapshots, checkpoints em jogos.

## Observer (Publish-Subscribe)

**Intenção:** definir uma dependência um-para-muitos entre objetos para que quando um muda de estado, todos os dependentes sejam notificados automaticamente.

**Analogia:** canal do YouTube. Você se inscreve; quando o canal posta vídeo novo, você é notificado. O canal não conhece cada inscrito pessoalmente — só publica.

**Quando usar:**
- Event-driven UIs
- Sistemas reativos
- Notificações
- Model-View separation (View observa Model)

**Cuidados:**
- **Memory leaks**: observers esquecidos seguram referências. Em Java, considere `WeakReference` ou unsubscribe explícito.
- **Ordem de notificação** não é garantida — não dependa dela.
- **Cascatas de eventos** podem virar spaghetti. Logue eventos durante debug.

**Java moderno:** prefira `java.util.concurrent.Flow` (reactive streams), bibliotecas como RxJava ou frameworks de eventos (Spring `ApplicationEvent`) ao `java.util.Observer` (deprecated desde Java 9).

## State

**Intenção:** permitir que um objeto altere seu comportamento quando seu estado interno muda. O objeto parece mudar de classe.

**Analogia:** semáforo. Verde permite passar; amarelo manda diminuir; vermelho manda parar. A "mesma" entidade se comporta diferente conforme o estado.

**Sintoma de que você precisa:** método com `switch` gigante em cima de um enum de estado, onde cada caso tem lógica complexa.

**State vs Strategy:** estruturalmente idênticos. **Intenção** difere: Strategy é o cliente *escolhendo* um algoritmo; State é o objeto *transicionando* entre estados internamente.

## Strategy

**Intenção:** definir uma família de algoritmos, encapsulá-los e torná-los intercambiáveis.

**Analogia:** GPS oferecendo "rota mais rápida", "mais curta" ou "sem pedágio". O destino é o mesmo, a *estratégia* de cálculo muda. Você troca a estratégia sem mexer no GPS.

**Quando usar:**
- Várias formas de fazer a mesma coisa, escolhidas em runtime (ordenação, compressão, cálculo de frete, validação)
- Eliminar `if/else` em cima de "tipo de algoritmo"

**Aplicação direta de OCP e DIP:** novos algoritmos = nova classe implementando a interface; cliente nunca muda.

**Em Java moderno:** lambdas substituem strategies simples. `Comparator.comparing(...)` é Strategy enxuto via functional interface.

## Template Method

**Intenção:** definir o esqueleto de um algoritmo numa classe-mãe, deixando subclasses redefinirem certos passos sem mudar a estrutura geral.

**Analogia:** receita de bolo padrão. A sequência (misturar secos → adicionar líquidos → assar → decorar) é fixa. O *tipo* de cobertura, o *sabor* da massa, o *recheio* — cada subclasse define.

**Quando usar:**
- Vários algoritmos compartilham mesma estrutura mas diferem em passos específicos
- Frameworks que expõem "hooks" (`onInit()`, `onDestroy()`)

**Template Method vs Strategy:** Template usa **herança** (inflexível, escolhe na compilação); Strategy usa **composição** (flexível, escolhe em runtime). Prefira Strategy quando possível — **composição sobre herança**.

## Visitor

**Intenção:** representar uma operação a ser realizada sobre os elementos de uma estrutura de objetos. Permite definir nova operação sem mudar as classes dos elementos.

**Analogia:** auditor visitando uma empresa. Ele vai em cada departamento (RH, financeiro, TI), e em cada um executa uma análise específica. A empresa não muda; o auditor traz a operação.

**Quando usar:**
- Operações heterogêneas sobre uma estrutura estável (AST, compiladores)
- Você precisa adicionar operações sem mexer nas classes-elemento

**Trade-off cruel:** adicionar nova operação é fácil (novo Visitor); adicionar novo tipo de elemento é doloroso (todos os Visitors mudam). Use só quando a estrutura é estável e as operações variam.

**Em Java moderno:** *sealed classes* + *pattern matching* (Java 21+) substituem Visitor em muitos casos com sintaxe muito mais limpa.

## Pegadinhas comuns nesta categoria

- **Observer vs Mediator:** Observer é difusão (1→N broadcast); Mediator é coordenação (N↔N via hub).
- **Strategy vs State:** mesmo desenho UML, intenções diferentes. Pergunte: quem troca o comportamento? Cliente externo (Strategy) ou o próprio objeto (State)?
- **Template Method abusa de herança.** Em códigos novos, Strategy + composição costuma envelhecer melhor.
- **Command + Memento = undo robusto.** Comandos guardam memento antes de executar; undo restaura.
