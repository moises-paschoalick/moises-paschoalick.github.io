## Why

Os cards de contexto ocupam espaço excessivo na tela e o rótulo "A CURA" não comunica bem o conceito de solução técnica. Reduzir o footprint visual dos cards faz mais conteúdo aparecer na primeira tela sem rolar.

## What Changes

- Renomear o card "A CURA" para "A SOLUÇÃO"
- Remover emojis dos títulos de ambos os cards (`🤕 A DOR` → `A DOR`, `✨ A CURA` → `A SOLUÇÃO`)
- Reduzir padding interno dos cards de `28px` para `16px 20px`
- Reduzir border-radius dos cards de `12px` para `8px`
- Reduzir gap do grid de cards de `24px` para `16px`
- Reduzir margin-bottom do grid de cards de `40px` para `24px`

## Capabilities

### New Capabilities

- Nenhuma.

### Modified Capabilities

- Nenhuma (mudanças são apenas de apresentação visual e texto, sem alteração de requisitos de comportamento).

## Impact

- `js/navigation.js`: textos dos títulos dos cards
- `styles/main.css`: `.card`, `.context-grid`
