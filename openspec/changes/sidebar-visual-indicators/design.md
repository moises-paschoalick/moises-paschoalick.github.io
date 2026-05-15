## Context

O portal possui 27 tópicos, mas apenas alguns têm conteúdo real (`.json`). Atualmente, não há distinção visual entre tópicos prontos e tópicos vazios no menu.

## Goals / Non-Goals

**Goals:**
- Adicionar uma flag de status ao esquema de dados dos tópicos.
- Renderizar indicadores visuais (ícones) na sidebar.
- Garantir que a indicação persista mesmo quando o tópico está selecionado (`active`).

**Non-Goals:**
- Implementar um sistema de tracking de progresso do usuário (cookies/localstorage). A flag é baseada na existência de conteúdo no servidor.

## Decisions

- **Data Flag**: Adicionar `"completed": true` aos objetos no `content/topics.json`.
- **CSS Pseudo-element**: Usar o pseudo-elemento `::after` no CSS para injetar o ícone (checkmark ✅).
    - *Rationale*: Mantém o HTML limpo e permite fácil estilização via CSS.
- **Dynamic Class**: A função `renderSidebar` no JS adicionará a classe `.completed` aos elementos `<li>` baseada na flag do JSON.

## Risks / Trade-offs

- **Manutenção Manual**: A flag `completed` no `topics.json` precisa ser atualizada sempre que um novo arquivo de conteúdo for adicionado.
    - *Mitigation*: O processo de adicionar conteúdo deve incluir a atualização do índice.
