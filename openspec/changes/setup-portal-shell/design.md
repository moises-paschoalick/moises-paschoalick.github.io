## Context

O projeto visa criar um portal de aprendizado de Design Patterns. O estado atual é apenas um redirecionamento externo. Precisamos de uma arquitetura leve, sem frameworks pesados, que permita uma navegação fluida e interatividade com o código.

## Goals / Non-Goals

**Goals:**
- Implementar um layout de duas colunas (Sidebar + Conteúdo).
- Criar um sistema de navegação Single Page Application (SPA) usando Vanilla JavaScript.
- Estabelecer um padrão de estilização com Vanilla CSS.
- Permitir a exibição de conteúdos dinâmicos para cada um dos 27 tópicos.

**Non-Goals:**
- Usar frameworks como React, Vue ou Angular.
- Implementar um backend complexo (o conteúdo será estático ou carregado via JSON/Fetch).
- Refatorar a animação Three.js (já descartada pelo usuário nesta fase).

## Decisions

- **Single Page Application (SPA) minimalista**: Utilizar o `hashchange` ou apenas manipulação de DOM para trocar o conteúdo central.
    - *Rationale*: Evita recarregamento de página, mantendo a sensação de aplicação moderna, sem a complexidade de roteadores externos.
- **CSS Grid/Flexbox**: Utilizar CSS moderno para o layout.
    - *Rationale*: Oferece controle total sobre a sidebar responsiva e os cards de conteúdo sem dependências extras.
- **Armazenamento de Conteúdo**: O conteúdo de cada tópico será armazenado em arquivos JSON na pasta `content/`.
    - *Rationale*: Facilita a manutenção e permite que o conteúdo cresça sem poluir o `index.html`.
- **Interatividade de Código com Data-Attributes**: Usar atributos `data-*` no HTML gerado para disparar tooltips.
    - *Rationale*: Simples de implementar e mapear para o JavaScript de interatividade.

## Risks / Trade-offs

- **SEO**: Como é uma SPA local/estática para aprendizado pessoal/portfólio, o SEO não é a prioridade máxima.
    - *Mitigation*: Se necessário no futuro, podemos gerar páginas estáticas (SSG).
- **Escalabilidade do Conteúdo**: 27 arquivos JSON podem ficar difíceis de gerenciar manualmente.
    - *Mitigation*: Manter uma estrutura rigorosa e documentada para os arquivos JSON.
