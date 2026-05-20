## Why

A barra de rolagem do portal usa o estilo padrão do sistema operacional, que em temas claros aparece cinza claro ou branca — quebrando a estética dark do portal. Estilizar a scrollbar com as cores já definidas no `:root` faz o portal parecer coeso e profissional.

## What Changes

- Adicionar estilos CSS globais para scrollbar dark mode usando `::-webkit-scrollbar` (Chrome, Edge, Safari) e `scrollbar-color` / `scrollbar-width` (Firefox)
- Track (trilha) usando `--card-bg` (#21262d)
- Thumb (arraste) usando `--border-color` (#30363d) com hover em `--text-dim` (#8b949e)
- Aplicado globalmente via `*` para cobrir sidebar, content-area e blocos de código

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- Nenhuma.

## Impact

- `styles/main.css`: adição de ~15 linhas de CSS global para scrollbar
