## ADDED Requirements

### Requirement: Conteúdo de Factory Method
O sistema DEVE exibir o conteúdo completo sobre o padrão Factory Method quando o tópico correspondente for selecionado.

#### Scenario: Visualização do tópico 7
- **WHEN** o usuário seleciona o tópico "7. Factory Method"
- **THEN** o portal DEVE renderizar a explicação didática baseada no exemplo de Categoria/Produto e os códigos-fonte correspondentes.

### Requirement: Explicação Didática de Factory Method
O conteúdo DEVE incluir a tabela de papéis (Produto Abstrato, Produtos Concretos, Criador, etc.) conforme o guia fornecido.

#### Scenario: Detalhamento da estrutura
- **WHEN** o conteúdo de Factory Method é carregado
- **THEN** a seção de explicação DEVE conter o mapeamento dos papéis do padrão para as classes Java.
