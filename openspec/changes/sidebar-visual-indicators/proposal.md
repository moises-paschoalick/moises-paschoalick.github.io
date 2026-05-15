## Why

Os usuários precisam de uma forma visual de identificar quais tópicos do portal já possuem conteúdo completo e quais ainda são apenas espaços reservados. Atualmente, todos os itens no menu lateral parecem iguais, o que pode levar à frustração ao clicar em tópicos vazios.

## What Changes

- Atualização do arquivo `content/topics.json` para incluir uma flag `completed` nos tópicos que possuem conteúdo.
- Modificação da lógica de renderização da sidebar no `js/navigation.js` para exibir um ícone (ex: um ponto colorido ou um checkmark) nos itens concluídos.
- Adição de estilos CSS em `styles/main.css` para renderizar os indicadores visuais.

## Capabilities

### New Capabilities
- `sidebar-status-indicators`: Exibição visual do status de conclusão de cada tópico no menu lateral.

### Modified Capabilities
- `portal-navigation`: A navegação agora deve lidar com a renderização diferenciada baseada no status do tópico.

## Impact

- `content/topics.json`: Modificação no esquema de dados.
- `js/navigation.js`: Alteração na função `renderSidebar`.
- `styles/main.css`: Novos estilos para os indicadores.
