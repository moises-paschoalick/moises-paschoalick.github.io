## Why

O portal funciona apenas em desktop. Em telas móveis (iPhone X, 11, 12, 17, Samsung), o layout quebra: a sidebar fixa de 300px ocupa quase toda a largura, o conteúdo fica ilegível e o visualizador de imagens não responde a toque. A audiência principal acessa via celular.

## What Changes

- Layout adaptado para mobile com media queries (breakpoint ≤ 768px)
- Sidebar convertida em drawer lateral deslizante com botão hamburguer (☰) no mobile
- Backdrop semitransparente para fechar a sidebar ao tocar fora
- Sidebar fecha automaticamente ao selecionar um tópico no mobile
- Visualizador de imagens com suporte a toque (touch drag quando em zoom)
- Zoom com boundary: imagem não pode ser arrastada além dos limites do container

## Capabilities

### New Capabilities

- `mobile-layout`: Layout responsivo com sidebar como drawer e conteúdo em tela cheia no mobile
- `touch-image-viewer`: Suporte a eventos de toque no visualizador de imagens com drag e boundary

### Modified Capabilities

- Nenhuma.

## Impact

- `styles/main.css`: media queries, estilos de sidebar overlay, backdrop, botão hamburguer
- `index.html`: botão ☰, div backdrop
- `js/navigation.js`: lógica de toggle/fechar sidebar no mobile
- `js/zoom-controller.js`: touch events (`touchstart`, `touchmove`, `touchend`), clamp de boundary
