## ADDED Requirements

### Requirement: Layout responsivo em mobile
O sistema SHALL adaptar o layout para telas com largura ≤ 768px, exibindo apenas a área de conteúdo em tela cheia e ocultando a sidebar por padrão.

#### Scenario: Acesso em tela mobile
- **WHEN** o usuário acessa o portal em dispositivo com viewport ≤ 768px
- **THEN** a sidebar deve estar oculta e o conteúdo deve ocupar 100% da largura

#### Scenario: Layout desktop não é afetado
- **WHEN** o usuário acessa em viewport > 768px
- **THEN** o layout original (sidebar 300px + conteúdo 1fr) deve ser mantido

### Requirement: Botão hamburguer visível no mobile
O sistema SHALL exibir um botão ☰ no topo da área de conteúdo apenas em viewports ≤ 768px.

#### Scenario: Botão visível no mobile
- **WHEN** a viewport é ≤ 768px
- **THEN** um botão ☰ deve estar visível no topo da tela

#### Scenario: Botão oculto no desktop
- **WHEN** a viewport é > 768px
- **THEN** o botão ☰ não deve ser exibido

### Requirement: Sidebar como drawer deslizante no mobile
O sistema SHALL exibir a sidebar como overlay deslizante da esquerda quando ativada no mobile.

#### Scenario: Abrir sidebar
- **WHEN** o usuário toca/clica no botão ☰
- **THEN** a sidebar deve deslizar da esquerda para a direita e ficar visível sobre o conteúdo

#### Scenario: Fechar sidebar pelo backdrop
- **WHEN** a sidebar está aberta e o usuário toca/clica fora dela (no backdrop)
- **THEN** a sidebar deve fechar deslizando de volta para fora da viewport

#### Scenario: Fechar sidebar ao selecionar tópico
- **WHEN** o usuário seleciona um tópico na sidebar no mobile
- **THEN** a sidebar deve fechar automaticamente após a seleção
