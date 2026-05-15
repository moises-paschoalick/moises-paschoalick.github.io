## Why

O projeto atualmente carece de uma interface de usuário para o portal de aprendizado de Design Patterns. Para cumprir a visão de uma progressão lógica de aprendizado (DOR -> ARQUITETURA), é necessário estabelecer uma estrutura base (shell) que suporte navegação, exibição de conteúdo contextual e exemplos de código interativos.

## What Changes

- Substituição do redirecionamento atual no `index.html` por uma estrutura de Single Page Application (SPA) minimalista em Vanilla JS.
- Criação de uma Sidebar de navegação com os 27 tópicos definidos no PRD.
- Implementação de um container de conteúdo dinâmico que alterna entre os tópicos.
- Adição de estilos base (Vanilla CSS) focados em legibilidade e interatividade de código.
- **BREAKING**: O arquivo `index.html` deixará de redirecionar para o site externo.

## Capabilities

### New Capabilities
- `portal-navigation`: Navegação lateral entre os 27 conceitos e patterns com indicação de progresso.
- `content-display`: Exibição de conteúdo estruturado em "Dor", "A Cura" e "Na Prática".
- `code-interaction`: Blocos de código interativos com tooltips explicativos e links para repositórios GitHub.

### Modified Capabilities
- Nenhuma.

## Impact

- `index.html`: Modificação total do conteúdo.
- Novos arquivos de suporte: `styles/main.css`, `js/navigation.js`, `js/code-interact.js`.
- Arquivos de conteúdo: Início da estrutura em `content/` (JSON ou parciais HTML).
