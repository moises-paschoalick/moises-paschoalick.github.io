Esses três conceitos são MUITO relacionados, então é normal confundir.

A diferença principal é:

- DIP → princípio arquitetural
- IoC → conceito de controle
- DI → técnica prática

1. DIP (Dependency Inversion Principle)

É um princípio do SOLID.

Diz:

“Dependa de abstrações, não de implementações.”

Exemplo

Errado:
```
class PedidoService {

    private MySQLRepository repository =
            new MySQLRepository();
}
```

O service depende diretamente da implementação concreta.

Correto:

```
interface PedidoRepository {
    void salvar();
}

```
```
class PedidoService {

    private PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }
}
```
Agora depende da abstração.

Analogia

DIP é como dizer:

“A tomada deve seguir um padrão universal.”

Não importa:

- marca
- país
- usina

Existe um contrato.


2. IoC (Inversion of Control)

É um conceito arquitetural.

Significa:

“O controle não fica mais na sua classe.”

Sem IoC

A própria classe cria tudo.
```
class PedidoService {

    private EmailService email =
            new EmailService();
}
```
A classe controla:

criação
ciclo de vida
dependências


Com IoC

Outro sistema controla isso.

Exemplo:

- Spring
- container
- framework

```
class PedidoService {

    private EmailService email;

    public PedidoService(EmailService email) {
        this.email = email;
    }
}
```
Agora:

a classe NÃO cria mais
alguém entrega pronto

Analogia
Sem IoC

Você cozinha, serve e lava tudo sozinho.

Com IoC

O restaurante entrega o prato pronto.

Você só usa.

O controle foi invertido.

3. DI (Dependency Injection)

É uma técnica para implementar IoC.

DI significa:

“As dependências são injetadas de fora.”

Exemplo
```
public PedidoService(EmailService email) {
    this.email = email;
}
```

O objeto chega pronto.

Isso é DI.

Tipos de DI
Constructor Injection (mais recomendado)

```
public PedidoService(EmailService email)
```
Setter Injection

```
setEmailService()
```
Field Injection
```
@Autowired
private EmailService email;
```
(menos recomendado hoje)

Relação entre os 3
DIP

Define a regra arquitetural.

Dependa de abstrações
IoC

Define quem controla os objetos.

O framework controla
DI

É COMO isso acontece.

injeção via construtor/setter
Analogia completa

Imagine uma empresa.

DIP

A vaga pede:

“preciso de alguém que saiba dirigir”

Não importa:

carro
marca
modelo

A empresa depende da abstração:

motorista
IoC

O funcionário NÃO escolhe:

computador
mesa
acesso

A empresa entrega tudo.

Controle invertido.

DI

O RH entrega:

notebook
crachá
acesso

Isso é a injeção da dependência.

No Spring Boot

O Spring faz IoC usando DI.

Exemplo:

@Service
public class UsuarioService {

    private final EmailService emailService;

    public UsuarioService(EmailService emailService) {
        this.emailService = emailService;
    }
}
O que o Spring faz?
IoC Container

O Spring controla:

criação dos objetos
ciclo de vida
instâncias
DI

O Spring injeta:

EmailService

no construtor.

DIP

O ideal seria:

EmailSender

(interface)

em vez da implementação concreta.

Resumo final
Conceito	O que é
DIP	Princípio do SOLID
IoC	Inversão de controle
DI	Técnica de injeção
Relação prática
DIP → regra arquitetural

IoC → quem controla

DI → como a dependência chega
Em uma frase
DIP

“Dependa de contratos.”

IoC

“Você não controla mais a criação.”

DI

“As dependências chegam prontas.”