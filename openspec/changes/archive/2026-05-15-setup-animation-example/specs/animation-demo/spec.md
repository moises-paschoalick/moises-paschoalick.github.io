## ADDED Requirements

### Requirement: Renderização da Animação 3D
O sistema DEVE renderizar uma cena 3D utilizando a biblioteca Three.js em um novo arquivo HTML dedicado.

#### Scenario: Visualização bem-sucedida
- **WHEN** o arquivo `exemplo_animacao.html` é carregado no navegador
- **THEN** a cena 3D com partículas DEVE ser exibida ocupando toda a janela

### Requirement: Interatividade com Partículas
O sistema DEVE permitir que o usuário interaja com a animação através do mouse e teclado, conforme definido no script `animacao.js`.

#### Scenario: Atração de partículas pelo mouse
- **WHEN** o usuário move o mouse sobre a tela
- **THEN** as partículas DEVEM reagir ao movimento conforme a lógica de `animacao.js`

#### Scenario: Retorno de partículas ao clique
- **WHEN** o usuário clica na tela
- **THEN** o estado de animação DEVE alternar para fazer as partículas retornarem à sua posição de origem
