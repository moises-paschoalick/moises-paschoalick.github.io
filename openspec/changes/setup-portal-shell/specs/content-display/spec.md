## ADDED Requirements

### Requirement: Layout em Blocos (Dor/Cura)
A área central DEVE exibir o conteúdo dividido em blocos claros para "A Dor" e "A Cura".

#### Scenario: Exibição estruturada
- **WHEN** um conteúdo de pattern é carregado
- **THEN** o sistema DEVE renderizar um bloco destacado para o problema e outro para a solução

### Requirement: Progressão entre Tópicos
O sistema DEVE fornecer botões de "Anterior" e "Próximo" ao final de cada tópico.

#### Scenario: Navegação sequencial
- **WHEN** o usuário clica em "Próximo"
- **THEN** o sistema DEVE carregar o próximo item da lista de 27 tópicos
