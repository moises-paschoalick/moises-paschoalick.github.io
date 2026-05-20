## Context

Mudança puramente cosmética em dois arquivos: `navigation.js` (textos) e `main.css` (valores de espaçamento). Sem nova arquitetura, dependências ou migração.

## Goals / Non-Goals

**Goals:**
- Renomear "A CURA" → "A SOLUÇÃO" e remover emojis dos títulos dos cards
- Compactar visualmente os cards para expor mais conteúdo na primeira tela

**Non-Goals:**
- Alterar layout de outras seções além dos cards `.context-grid`
- Modificar cores, fontes ou comportamento interativo dos cards

## Decisions

### Valores de espaçamento

| Propriedade | Antes | Depois |
|---|---|---|
| `.card` padding | `28px` | `16px 20px` |
| `.card` border-radius | `12px` | `8px` |
| `.context-grid` gap | `24px` | `16px` |
| `.context-grid` margin-bottom | `40px` | `24px` |

Redução conservadora: mantém hierarquia visual sem tornar os cards densos demais.

## Risks / Trade-offs

- [Risco] Cards muito compactos podem parecer apertados em textos longos → os valores escolhidos mantêm `16px` de padding, suficiente para respiração visual.
