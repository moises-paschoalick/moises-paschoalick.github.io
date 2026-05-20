## MODIFIED Requirements

### Requirement: Menu Lateral de Tópicos
O sistema DEVE exibir um menu lateral contendo os 27 tópicos de aprendizado definidos no PRD, diferenciando visualmente aqueles com conteúdo disponível.

#### Scenario: Seleção de tópico
- **WHEN** o usuário clica em um item do menu lateral
- **THEN** o sistema DEVE carregar o conteúdo correspondente na área central sem recarregar a página

### Requirement: Indicação de Progresso
O sistema DEVE destacar visualmente o tópico que está sendo visualizado no momento, mantendo a visibilidade do status de conclusão.

#### Scenario: Destaque visual
- **WHEN** um tópico é selecionado
- **THEN** o item correspondente no menu DEVE receber uma classe de estilo 'active'
