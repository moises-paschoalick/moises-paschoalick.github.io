## ADDED Requirements

### Requirement: Arrastar imagem com toque no mobile
O sistema SHALL permitir que o usuário arraste a imagem com um dedo quando o zoom for maior que 1, em dispositivos touch.

#### Scenario: Drag com toque quando em zoom
- **WHEN** o zoom da imagem é > 1 e o usuário toca e arrasta com um dedo
- **THEN** a imagem deve seguir o movimento do dedo

#### Scenario: Drag com toque desabilitado em zoom normal
- **WHEN** o zoom da imagem é = 1 e o usuário toca e arrasta
- **THEN** a imagem não deve se mover

### Requirement: Boundary do zoom impede saída do container
O sistema SHALL impedir que a imagem seja arrastada além dos limites do container, tanto em eventos de mouse quanto de toque.

#### Scenario: Limite horizontal respeitado
- **WHEN** o usuário tenta arrastar a imagem além da borda esquerda ou direita do container
- **THEN** a imagem deve parar no limite correspondente, sem ultrapassar

#### Scenario: Limite vertical respeitado
- **WHEN** o usuário tenta arrastar a imagem além da borda superior ou inferior do container
- **THEN** a imagem deve parar no limite correspondente, sem ultrapassar

#### Scenario: Clamp aplicado ao reduzir zoom
- **WHEN** o usuário reduz o zoom enquanto a imagem está deslocada
- **THEN** a posição da imagem deve ser ajustada para respeitar o novo boundary
