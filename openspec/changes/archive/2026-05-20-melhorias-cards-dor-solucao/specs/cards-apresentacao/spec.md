## ADDED Requirements

### Requirement: Cards sem emojis nos títulos
Os títulos dos cards de contexto NÃO devem conter emojis. O card de problema SHALL exibir `A DOR` e o card de solução SHALL exibir `A SOLUÇÃO`.

#### Scenario: Títulos sem emoji
- **WHEN** o usuário carrega qualquer tópico
- **THEN** o card de problema exibe o título `A DOR` sem emoji e o card de solução exibe `A SOLUÇÃO` sem emoji

### Requirement: Cards com espaçamento compacto
Os cards SHALL usar padding reduzido para maximizar o conteúdo visível na primeira tela.

#### Scenario: Padding compacto aplicado
- **WHEN** o usuário visualiza qualquer tópico no desktop
- **THEN** os cards de contexto devem ter padding de `16px 20px`, border-radius de `8px`, gap entre cards de `16px` e margin-bottom do grid de `24px`
