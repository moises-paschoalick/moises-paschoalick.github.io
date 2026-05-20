## Context

O portal é um SPA estático (HTML + CSS + JS vanilla) sem framework. O layout usa CSS Grid com `300px 1fr` fixo. Não há media queries. O visualizador de imagens usa exclusivamente eventos de mouse. O zoom controller já possui propriedades `translateX`/`translateY` mas sem clamp de boundary.

Devices alvo: iPhone X/11/12/17 (390–430px), Samsung Galaxy S/A (360–412px). Breakpoint definido em ≤ 768px para cobrir tablets na horizontal também.

## Goals / Non-Goals

**Goals:**
- Layout funcional em telas ≤ 768px sem alterar a experiência desktop
- Sidebar como drawer deslizante no mobile com botão ☰ e backdrop
- Arrastar imagem com toque quando em zoom
- Impedir que a imagem saia dos limites do container ao arrastar (mouse e touch)

**Non-Goals:**
- Pinch-to-zoom (dois dedos) — botões de zoom já existem e bastam
- Suporte a IE ou browsers legados
- Modo landscape específico para tablet

## Decisions

### D1: Sidebar como overlay no mobile (não push)

A sidebar desliza por cima do conteúdo (`position: fixed`, `z-index` alto) em vez de empurrar o conteúdo para o lado.

**Alternativa considerada:** Push layout (conteúdo encolhe quando sidebar abre). Descartado porque em 390px o conteúdo ficaria com ~90px de largura enquanto a sidebar abre.

**Escolha:** Overlay com backdrop semitransparente. Padrão amplamente reconhecido em apps mobile.

### D2: Toggle de sidebar via classe CSS no `<body>`

Uma classe `.sidebar-open` no `<body>` controla todo o estado visual via CSS (`transform`, `opacity`, `pointer-events`). O JS apenas adiciona/remove a classe.

**Alternativa:** Manipular `style` diretamente no JS. Descartado para manter a lógica visual no CSS.

### D3: Touch drag sem pinch-to-zoom

`touchstart`/`touchmove`/`touchend` usando `touches[0]` (primeiro dedo). Comportamento idêntico ao mouse drag: só ativo quando `scale > 1`.

**Alternativa:** Implementar pinch com dois dedos via `touches[0]` e `touches[1]`. Fora do escopo por ora.

### D4: Clamp de boundary calculado no momento do drag

A cada `mousemove`/`touchmove`, após calcular o novo `translateX`/`translateY`, aplicar `Math.min/Math.max` com base em `containerWidth`, `containerHeight` e `scale` atual.

```
maxX = (containerWidth  * (scale - 1)) / 2
maxY = (containerHeight * (scale - 1)) / 2

translateX = clamp(translateX, -maxX, +maxX)
translateY = clamp(translateY, -maxY, +maxY)
```

Também aplicar o clamp no `applyTransform` como salvaguarda.

## Risks / Trade-offs

- **Sidebar overlay bloqueia gestos de swipe do browser** → Mitigation: `touch-action: none` apenas no backdrop, não em todo o body.
- **`overflow: hidden` no body impede scroll no mobile** → Mitigation: Remover do body; controlar overflow apenas nos containers internos.
- **Clamp pode causar "salto" se o zoom diminuir enquanto a imagem está deslocada** → Mitigation: Chamar clamp também dentro de `zoom()` após atualizar o scale.

## Migration Plan

Sem migração de dados. Alterações são puramente front-end e não quebram a API JSON de conteúdo. O rollback é um `git revert`.
