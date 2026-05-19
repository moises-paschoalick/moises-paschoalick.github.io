O princípio DIP do SOLID é:

Dependency Inversion Principle

“Dependa de abstrações e não de implementações.”

Analogia do mundo real

Imagine uma casa.

A TV não depende:

da usina hidrelétrica
do tipo de gerador
da marca da fiação

Ela depende apenas de:
```
Tomada padrão
```

A tomada é a abstração.

Você pode ligar:

- energia da rua
- gerador
- painel solar
- bateria

A TV continua funcionando.

Isso é DIP.

Exemplo ERRADO (sem DIP)
```
class MySQLDatabase {

    public void salvar(String dados) {
        System.out.println("Salvando no MySQL: " + dados);
    }
}

class UsuarioService {

    private MySQLDatabase database = new MySQLDatabase();

    public void cadastrarUsuario(String nome) {
        database.salvar(nome);
    }
}
```
Problema aqui

O UsuarioService depende DIRETAMENTE de:
```
MySQLDatabase
```
ou seja:
- alto nível depende do baixo nível
- regra de negócio depende do banco

Analogia real

É como construir uma casa onde:

```
A lâmpada só funciona
se vier energia da hidrelétrica X
```
Se trocar:

- cidade
- fornecedor
- gerador

→ quebra tudo.

Problemas práticos
1. Difícil trocar banco

Quer usar PostgreSQL?

Tem que alterar:

```
UsuarioService
```

2. Difícil testar

Você não consegue criar:

- banco fake
- mock
- stub

3. Regra de negócio presa à infraestrutura

O service conhece detalhes técnicos.

Aplicando DIP corretamente
Criamos uma abstração
```
interface Database {
    void salvar(String dados);
}
```
Implementações concretas
```
class MySQLDatabase implements Database {

    public void salvar(String dados) {
        System.out.println("Salvando no MySQL: " + dados);
    }
}

class PostgreSQLDatabase implements Database {

    public void salvar(String dados) {
        System.out.println("Salvando no PostgreSQL: " + dados);
    }
}
```
Classe de alto nível depende da abstração
```
class UsuarioService {

    private Database database;

    public UsuarioService(Database database) {
        this.database = database;
    }

    public void cadastrarUsuario(String nome) {
        database.salvar(nome);
    }
}
```
Uso
```
public class Main {

    public static void main(String[] args) {

        Database database = new PostgreSQLDatabase();

        UsuarioService service =
                new UsuarioService(database);

        service.cadastrarUsuario("Moises");
    }
}
```
O que mudou?

Antes:

```
UsuarioService
    ↓
MySQLDatabase
```

Agora
```
UsuarioService
    ↓
Database (abstração)
    ↓
MySQLDatabase / PostgreSQL
```

A essência do DIP
ERRADO
```
Regra de negócio
dependendo da infraestrutura
``` 

CERTO
```
Infraestrutura
implementa contratos
da regra de negócio
``` 
No Spring Boot isso acontece MUITO

Exemplo correto:

```
@Service
public class PedidoService {

    private final PedidoRepository repository;

    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }
}
```
O PedidoService depende da abstração:
```
PedidoRepository
``` 
E o Spring injeta a implementação concreta.

Analogia moderna
Sem DIP

Seu iPhone aceita:

apenas UM carregador específico impossível de trocar.
Com DIP

USB-C.

Você pode usar:

Samsung
Dell
carregador portátil
notebook
tomada do carro

O aparelho depende do:

padrão

Não da implementação.

Isso é DIP.

Relação com Injeção de Dependência

Muita gente confunde.

DIP

É o princípio arquitetural.

Dependency Injection

É uma técnica para aplicar o DIP.

Resumo simples
Alto nível
```
regras de negócio
```

Baixo nível
```
banco
API
framework
filesystem
email
``` 
O DIP diz:
```
Os dois devem depender de abstrações
``` 
