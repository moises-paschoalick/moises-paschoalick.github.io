## ADDED Requirements

### Requirement: Scrollbar com tema dark
A scrollbar do portal SHALL usar cores do tema dark definidas no `:root`, integrando visualmente com o restante da interface.

#### Scenario: Scrollbar visível em elementos com scroll
- **WHEN** o usuário rola qualquer área com overflow (sidebar, content-area, blocos de código)
- **THEN** a scrollbar deve exibir track em `--card-bg` e thumb em `--border-color`, sem cores claras do sistema operacional

#### Scenario: Hover no thumb
- **WHEN** o usuário passa o mouse sobre o thumb da scrollbar
- **THEN** o thumb deve ficar mais claro, usando a cor `--text-dim`

#### Scenario: Fallback para Firefox
- **WHEN** o browser é Firefox
- **THEN** a scrollbar deve usar `scrollbar-color` com thumb `--border-color` e track `--card-bg`, e `scrollbar-width: thin`
