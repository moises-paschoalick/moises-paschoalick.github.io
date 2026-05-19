# Padrões Modernos (além do GoF)

Padrões que emergiram principalmente em arquitetura de aplicações corporativas, web e DDD. Muitos são catalogados em livros como *Patterns of Enterprise Application Architecture* (Martin Fowler) e *Domain-Driven Design* (Eric Evans).

## Repository

**Intenção:** mediar entre o domínio e a camada de mapeamento de dados, atuando como uma coleção de objetos de domínio em memória.

**Analogia:** bibliotecário. Você não vai entre as estantes procurar — pede "me traz *Cem Anos de Solidão*" e ele resolve, esteja o livro no acervo, depósito ou empréstimo. Você fala com a abstração; ele lida com a infraestrutura.

**Quando usar:**
- Separar lógica de domínio de detalhes de persistência (JPA, MongoDB, REST)
- Permitir trocar a fonte de dados (mockar em testes, migrar banco) sem tocar o domínio
- DDD — Repositories são cidadãos de primeira classe

**Estrutura típica:**
```java
public interface ClienteRepository {
    Optional<Cliente> buscarPorId(ClienteId id);
    List<Cliente> buscarAtivos();
    void salvar(Cliente cliente);
    void remover(ClienteId id);
}
```

**Pegadinhas:**
- Não devolva `Stream` ou objetos atrelados a sessão (lazy loading explode fora da camada).
- Não exponha critérios SQL na interface — use **Specification** ou métodos nomeados ricos.
- "Generic Repository" (`Repository<T>`) parece elegante mas vira anti-pattern: cada agregado tem necessidades próprias.

## Unit of Work

**Intenção:** manter uma lista de objetos afetados por uma transação de negócio e coordenar a escrita das mudanças.

**Analogia:** carrinho de compras do supermercado. Você adiciona, remove, troca itens livremente; só no caixa (commit) a transação acontece de fato.

**Quando usar:** transações que envolvem múltiplos repositories e precisam de atomicidade.

**Em Java:** JPA `EntityManager` e Hibernate `Session` *são* implementações de Unit of Work. Spring `@Transactional` orquestra isso. Raramente você implementa do zero.

## DTO (Data Transfer Object)

**Intenção:** transportar dados entre processos ou camadas em uma forma serializável e desacoplada do modelo de domínio.

**Analogia:** caixa de mudança. Os móveis (entidades do domínio) ficam em casa; para a mudança, você empacota só o que precisa transportar, numa forma protegida e transportável.

**Quando usar:**
- API REST (request/response não devem expor entidades JPA diretamente)
- Comunicação entre camadas que cruzam fronteiras (process boundaries)
- Reduzir múltiplas chamadas remotas (agregar dados em um DTO único)

**Em Java moderno:** **records** são perfeitos para DTOs.

```java
public record ClienteResponse(UUID id, String nome, String email) {}
```

**Anti-pattern relacionado:** *Anemic Domain Model* — quando o "domínio" vira só DTOs com getters/setters. DTOs e Entidades têm papéis distintos; não os confunda.

## Dependency Injection (DI)

**Intenção:** entregar as dependências de um objeto em vez de ele instanciá-las internamente. Forma concreta de aplicar DIP.

**Analogia:** numa cozinha profissional, o chef não vai à fazenda colher tomate — ele recebe ingredientes prontos do fornecedor. Foca em cozinhar, não em produzir os insumos.

**Três formas (em ordem de preferência):**
1. **Constructor injection** — dependências obrigatórias, objeto sempre válido
2. **Setter injection** — dependências opcionais
3. **Field injection** (`@Autowired` em campo) — evite; quebra imutabilidade e dificulta teste

**Em Java:** Spring, Jakarta CDI, Guice fazem o trabalho. Mas DI **não é um framework** — é o princípio. Você pode aplicar com `new` manual no `main()` ("Pure DI" / "Poor man's DI").

**Service Locator vs DI:** Service Locator (você pede a dependência) é uma alternativa, mas esconde dependências e é considerada inferior a DI (que as explicita no construtor).

## MVC, MVP e MVVM

Três variações para separar **dados** (Model), **apresentação** (View) e **lógica de interação**.

**Analogia compartilhada:** um restaurante. O **Model** é a cozinha (dados, regras de negócio). A **View** é o salão (o que o cliente vê). A diferença está em quem é o garçom.

### MVC (Model-View-Controller)
- Controller recebe input do usuário, atualiza o Model, escolhe a View.
- View observa o Model (Observer!).
- Web frameworks (Spring MVC, Rails) usam variação onde Controller responde requisições e devolve View.

### MVP (Model-View-Presenter)
- View é "burra" (totalmente passiva); Presenter manipula a View diretamente.
- Mais testável que MVC clássico — Presenter não depende de UI real.
- Comum em desktop (Swing, JavaFX legado) e Android antigo.

### MVVM (Model-View-ViewModel)
- ViewModel expõe estado observável; View se *bind* aos dados (data binding).
- Funciona bem com UIs reativas (WPF, Angular, Vue).
- ViewModel não conhece a View — é orientado por evento.

**Em que isso conversa com o GoF:** todos os três usam intensamente **Observer**, **Mediator** e **Strategy**.

## CQRS (Command Query Responsibility Segregation)

**Intenção:** separar operações que **mudam** estado (commands) das que apenas **leem** (queries), possivelmente usando modelos de dados diferentes para cada.

**Analogia:** numa empresa, o gerente que aprova despesas (command) é diferente do auditor que gera relatórios (query). Funções, ferramentas e até bancos de dados podem ser distintos.

**Quando usar:**
- Sistemas com cargas muito diferentes em leitura e escrita
- Necessidade de modelos otimizados para cada (escrita normalizada, leitura desnormalizada)
- Event Sourcing como complemento natural

**Quando NÃO usar:** CRUD simples. CQRS adiciona complexidade — só vale quando o ganho compensa.

**Forma simples:** separar `CommandHandler` e `QueryHandler` no código, mesmo banco.
**Forma completa:** bancos separados, mensageria sincronizando, eventual consistency.

## Specification

**Intenção:** encapsular regras de negócio em objetos combináveis com operadores lógicos (AND, OR, NOT).

**Analogia:** filtros num e-commerce. Você combina "preço < 100" AND "frete grátis" AND ("categoria = eletrônicos" OR "categoria = informática"). Cada filtro é uma especificação; eles se combinam.

**Quando usar:**
- Consultas dinâmicas a repositórios (Spring Data JPA tem `Specification<T>` nativo)
- Validação composta
- Regras de domínio que precisam ser reutilizadas em vários lugares

**Estrutura:**
```java
public interface Specification<T> {
    boolean isSatisfiedBy(T candidate);
    default Specification<T> and(Specification<T> other) { ... }
    default Specification<T> or(Specification<T> other) { ... }
    default Specification<T> not() { ... }
}
```

## Service Layer

**Intenção:** definir o limite de uma aplicação com uma camada de serviços que estabelece o conjunto de operações disponíveis e orquestra a resposta da aplicação a cada operação.

**Analogia:** caixa eletrônico. Você não fala direto com o cofre, nem com o sistema antifraude, nem com o ledger. Aperta "sacar R$100" e o caixa orquestra todos esses subsistemas para entregar o resultado.

**Quando usar:**
- Casos de uso que envolvem múltiplas entidades/repositórios
- Coordenação de transações, eventos, integrações externas
- Ponto de entrada para Controllers, jobs, listeners

**Cuidados:**
- Não vire um *Transaction Script* gigante. Lógica de negócio pertence ao domínio; serviços **orquestram**.
- Anemic domain (toda lógica em Services, entidades só com getters) é um cheiro — equilibre.

## Pegadinhas comuns nesta categoria

- **Repository genérico** (`Repository<T>` com 20 métodos) parece DRY, mas vira ferramenta cega. Repositories devem refletir necessidades reais do domínio.
- **DTO em todo lugar** vira *DTO hell* — toda camada com sua versão. Use DTOs nas fronteiras (API, mensageria), não entre camadas internas que compartilham o mesmo modelo.
- **DI não é Spring.** O princípio é injetar dependências; o framework é só ferramenta. Você pode (e deve) aplicar DI em testes unitários sem nenhum framework.
- **CQRS leve vs CQRS completo:** comece leve (separação de handlers). Só vá para a forma completa quando a dor justificar.
- **Service Layer vs Domain Service** (DDD): Service Layer é orquestração (camada de aplicação); Domain Service é lógica de negócio que não cabe numa entidade só (camada de domínio). Não os misture.
