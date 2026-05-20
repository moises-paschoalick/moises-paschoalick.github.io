## Context

Mudança puramente cosmética em `main.css`. Sem JS, sem dependências externas. As variáveis CSS já existem no `:root`.

## Goals / Non-Goals

**Goals:**
- Scrollbar integrada ao tema dark em todos os elementos com scroll do portal

**Non-Goals:**
- Suporte a IE ou browsers sem `::-webkit-scrollbar` além do fallback Firefox
- Scrollbar customizada por elemento (sidebar vs content-area vs code block)

## Decisions

### Aplicação global via `*`

Usar `*` como seletor garante que qualquer novo elemento com scroll futuro herde o estilo automaticamente, sem necessidade de repetir as regras.

### Valores das cores

| Parte | Variável | Hex |
|---|---|---|
| Track | `--card-bg` | `#21262d` |
| Thumb | `--border-color` | `#30363d` |
| Thumb hover | `--text-dim` | `#8b949e` |

### Largura

`8px` para a scrollbar vertical (padrão confortável), `6px` para horizontal (menos intrusiva nos blocos de código).

### Fallback Firefox

`scrollbar-color` e `scrollbar-width: thin` cobrem Firefox, que não suporta `::-webkit-scrollbar`.

## Risks / Trade-offs

- [Risco] `::-webkit-scrollbar` não é padrão W3C → Mitigation: fallback Firefox via `scrollbar-color`; demais browsers usam o padrão do OS (aceitável).
