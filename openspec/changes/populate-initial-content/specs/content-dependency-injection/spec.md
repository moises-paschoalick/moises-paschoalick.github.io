## ADDED Requirements

### Requirement: Conteúdo de Injeção de Dependência
O sistema DEVE exibir o conteúdo completo sobre Injeção de Dependência quando o tópico correspondente for selecionado.

#### Scenario: Visualização do tópico 5
- **WHEN** o usuário seleciona o tópico "5. Dependency Injection"
- **THEN** o portal DEVE renderizar o título correto, a analogia da Casa/Energia nas seções Dor/Cura, e o código-fonte de `Casa.java`.

### Requirement: Integração de Código de DI
O bloco de código DEVE refletir fielmente a implementação fornecida no repositório `java-ioc-dependency-injection`.

#### Scenario: Exibição de código real
- **WHEN** o conteúdo de DI é carregado
- **THEN** o bloco de código DEVE exibir a classe `Casa` com o construtor recebendo a interface `FonteEnergia`.
