## 1. Layout responsivo (CSS)

- [x] 1.1 Remover `overflow: hidden` do `body` e controlar overflow apenas nos containers internos
- [x] 1.2 Adicionar media query `≤ 768px` no `main.css`: sidebar com `position: fixed`, `transform: translateX(-300px)`, `z-index` alto
- [x] 1.3 No breakpoint mobile, ajustar `.app-container` para `grid-template-columns: 1fr` e `.content-area` para largura 100%
- [x] 1.4 Adicionar estilo do backdrop (`.sidebar-backdrop`): `position: fixed`, `inset: 0`, `background: rgba(0,0,0,0.5)`, oculto por padrão
- [x] 1.5 Adicionar estilo do botão hamburguer (`.sidebar-toggle`): visível apenas no mobile, posicionado no topo da content-area
- [x] 1.6 Adicionar transição CSS para o slide da sidebar (`transition: transform 0.3s ease`)
- [x] 1.7 Definir estado `.sidebar-open` no `body`: sidebar com `transform: translateX(0)` e backdrop visível

## 2. HTML — estrutura mobile

- [x] 2.1 Adicionar botão `<button class="sidebar-toggle">☰</button>` no `index.html` antes do `<main>`
- [x] 2.2 Adicionar `<div class="sidebar-backdrop"></div>` no `index.html` após a `<aside>`

## 3. JavaScript — toggle sidebar

- [x] 3.1 Em `navigation.js`, adicionar listener no botão `.sidebar-toggle` para adicionar/remover `.sidebar-open` no `body`
- [x] 3.2 Adicionar listener no `.sidebar-backdrop` para remover `.sidebar-open` ao clicar/tocar
- [x] 3.3 Dentro de `navigateToTopic()`, remover `.sidebar-open` do `body` se viewport ≤ 768px

## 4. Zoom — boundary (clamp)

- [x] 4.1 Em `zoom-controller.js`, criar método `clampTranslate()` que calcula `maxX`/`maxY` com base em `containerWidth`, `containerHeight` e `scale` atual
- [x] 4.2 Chamar `clampTranslate()` dentro de `applyTransform()` antes de aplicar o transform
- [x] 4.3 Chamar `clampTranslate()` dentro de `zoom()` após atualizar o scale (para reposicionar ao reduzir zoom)

## 5. Zoom — suporte a touch

- [x] 5.1 Em `zoom-controller.js`, adicionar listener `touchstart` na imagem: capturar `touches[0]` como ponto de início (apenas se `scale > 1`)
- [x] 5.2 Adicionar listener `touchmove` no `document`: atualizar `translateX`/`translateY` com `touches[0]`, chamar `clampTranslate()` e `applyTransform()`
- [x] 5.3 Adicionar listener `touchend` no `document`: encerrar estado de drag
- [x] 5.4 Adicionar `touch-action: none` no container de imagem para evitar conflito com scroll do browser durante o drag
