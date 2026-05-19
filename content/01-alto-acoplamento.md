Imagine uma oficina mecânica.

O mecânico depende diretamente de UMA marca específica de ferramenta.
Se a ferramenta quebra ou muda, toda a oficina para. Exemplo do motor. No mundo real fabricantes de carros não aceitam trocar o motor do carro. Porém nesse vamos considerar que isso seja possível. 

Isso é alto acoplamento:
as partes do sistema ficam “grudadas” umas nas outras.

Exemplo ruim em Java:

```
class MotorDiesel {

    public void ligar() {
        System.out.println("Motor diesel ligado");
    }
}

class Carro {

    // O carro depende DIRETAMENTE do MotorDiesel
    private MotorDiesel motor = new MotorDiesel();

    public void ligarCarro() {
        motor.ligar();
    }
}

public class Main {

    public static void main(String[] args) {

        Carro carro = new Carro();
        carro.ligarCarro();
    }
}

```
Analogia do mundo real

Imagine isso:

O carro foi construído SOMENTE para motor diesel.
Não aceita motor elétrico.
Não aceita motor híbrido.
Não aceita outro fabricante.

Se quiser trocar:

precisa desmontar o carro inteiro.

Isso é alto acoplamento.

Problemas desse código
1. Difícil de trocar implementação

Se quiser usar:
```
MotorEletrico
```
precisa alterar a classe Carro.

2. Viola princípio Open/Closed (SOLID)

A classe não está:

aberta para extensão
fechada para modificação

Toda mudança exige alterar código existente.

3. Difícil testar

Você não consegue facilmente criar um “motor falso” para testes.

4. Dependência concreta

O Carro conhece:

exatamente QUAL motor usar
COMO criar o motor

Ele está preso à implementação.

Visualmente
Alto acoplamento
```
Carro
  └── MotorDiesel
         └── SistemaDiesel
               └── BombaDiesel
```

Tudo depende diretamente de tudo.

Se mudar UMA peça:
pode quebrar várias.

Como sistemas grandes ficam ruins

Imagine um sistema empresarial assim:
```
PedidoService
 └── OracleRepository
      └── APIExternaX
           └── XMLParserAntigo
```
Aí:

troca banco → quebra serviço
troca API → quebra parser
troca parser → quebra regra de negócio

Vira o famoso:

“não mexe nisso que ninguém sabe o que acontece”

Como reduzir o acoplamento

Usando:

interfaces
injeção de dependência
inversão de dependência
composição
eventos
mensageria

Exemplo desacoplado:

```
interface Motor {
    void ligar();
}

class MotorDiesel implements Motor {

    public void ligar() {
        System.out.println("Motor diesel ligado");
    }
}

class MotorEletrico implements Motor {

    public void ligar() {
        System.out.println("Motor elétrico ligado");
    }
}

class Carro {

    private Motor motor;

    // Injeção de dependência
    public Carro(Motor motor) {
        this.motor = motor;
    }

    public void ligarCarro() {
        motor.ligar();
    }
}

public class Main {

    public static void main(String[] args) {

        Motor motor = new MotorEletrico();

        Carro carro = new Carro(motor);

        carro.ligarCarro();
    }
}

```

Analogia agora

O carro só sabe:

“preciso de algo que funcione como motor”

Ele não se importa:

se é diesel
elétrico
híbrido
Tesla
Ferrari

Isso é baixo acoplamento.

Em sistemas Java Spring isso aparece muito

Exemplo ruim:

```
private OracleRepository repository = new OracleRepository();
```
Exemplo correto:
``
private final ClienteRepository repository;
``
e o Spring injeta:
```
@Autowired
```

Regra prática

Quanto mais uma classe:

conhece detalhes internos da outra
cria dependências diretamente
depende de implementação concreta

→ maior o acoplamento.

Quanto mais depende de:

contratos
abstrações
interfaces

→ menor o acoplamento.