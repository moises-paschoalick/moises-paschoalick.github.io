## Why

O usuário deseja visualizar a animação Three.js existente no projeto em um ambiente funcional. Atualmente, o `index.html` redireciona para um site externo e a animação em `animacao.js` não está sendo utilizada, o que impede a validação visual dos recursos gráficos disponíveis para o portal de Design Patterns.

## What Changes

- Criação de um novo arquivo `exemplo_animacao.html` para servir como sandbox de teste para a animação.
- Inclusão da biblioteca Three.js (versão legada compatível) via CDN.
- Vinculação do script `animacao.js` e do `jquery-3.4.1.min.js` local ao novo arquivo HTML.

## Capabilities

### New Capabilities
- `animation-demo`: Capacidade de renderizar e interagir com a animação de partículas 3D em uma página web isolada.

### Modified Capabilities
- Nenhuma.

## Impact

- Novo arquivo: `exemplo_animacao.html`.
- Dependências: Depende da disponibilidade do CDN da Three.js (r68) e do arquivo local `jquery-3.4.1.min.js`.
