## Context

O projeto possui um arquivo `animacao.js` que utiliza a biblioteca Three.js para criar um efeito de partículas interativo. Atualmente, não há um ponto de entrada para visualizar esta animação, dificultando o entendimento de como ela pode ser integrada ao portal de Design Patterns.

## Goals / Non-Goals

**Goals:**
- Criar uma página HTML independente que carregue corretamente a animação.
- Garantir que todas as interações (mouse, clique, teclado) funcionem como planejado no script original.

**Non-Goals:**
- Refatorar o código de `animacao.js` para versões modernas do Three.js.
- Alterar o comportamento existente da animação.
- Modificar o arquivo `index.html` nesta etapa.

## Decisions

- **Versão do Three.js**: Utilizar a versão **R68** via CDN (cdnjs). 
    - *Rationale*: O código em `animacao.js` utiliza `THREE.Geometry` e `THREE.ParticleSystem`, que foram removidos ou renomeados em versões mais recentes (como a R125+). A versão R68 é conhecida por ser estável com esses recursos legados.
- **Inclusão do jQuery**: Utilizar o arquivo local `jquery-3.4.1.min.js` já presente na raiz do projeto.
    - *Rationale*: O script `animacao.js` possui dependências diretas de seletores e eventos do jQuery (`$('body').click`, etc).

## Risks / Trade-offs

- **CORS em Assets**: O script carrega uma textura de um domínio externo (`lh3.ggpht.com`). Se o link expirar ou bloquear o acesso, as partículas aparecerão como blocos sólidos.
    - *Mitigation*: Se falhar, no futuro podemos baixar a textura e servir localmente.
- **Performance**: 15.000 partículas podem ser pesadas para navegadores ou dispositivos móveis mais antigos.
    - *Trade-off*: Como é um sandbox de exemplo, aceitaremos o custo de performance para manter a fidelidade ao script original.
