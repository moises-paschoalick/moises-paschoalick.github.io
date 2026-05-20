## ADDED Requirements

### Requirement: Indicador de Conteúdo Disponível
O sistema DEVE exibir um ícone visual em cada item do menu lateral que possua conteúdo completo.

#### Scenario: Visualização do ícone
- **WHEN** a sidebar é renderizada
- **THEN** cada item marcado como `completed: true` no `topics.json` DEVE exibir um ícone de checkmark (ou similar) ao lado do título.

#### Scenario: Ausência de ícone
- **WHEN** a sidebar é renderizada
- **THEN** itens que NÃO possuem a flag `completed: true` NÃO DEVEM exibir o ícone de conclusão.
