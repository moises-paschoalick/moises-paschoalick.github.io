## Why

O portal agora possui uma estrutura funcional (shell), mas carece de conteúdo real. O usuário forneceu repositórios com exemplos práticos de patterns. Este change visa popular os primeiros tópicos do portal com esses exemplos reais para validar a experiência de aprendizado completa.

## What Changes

- Criação dos arquivos JSON de conteúdo para os tópicos "5. Dependency Injection" e "7. Factory Method".
- Extração de explicações teóricas e códigos-fonte dos repositórios fornecidos na pasta `temp/`.
- Mapeamento das seções "Dor", "Cura" e "Explicação" com base nos guias didáticos do usuário.

## Capabilities

### New Capabilities
- `content-dependency-injection`: Conteúdo detalhado sobre Injeção de Dependência, incluindo a analogia Casa/Energia.
- `content-factory-method`: Conteúdo detalhado sobre o padrão Factory Method, incluindo o exemplo Categoria/Produto.

### Modified Capabilities
- Nenhuma.

## Impact

- Novos arquivos em `content/`: `05-dependency-injection.json` e `07-factory-method.json`.
- Nenhuma alteração no código do portal (SPA), apenas em arquivos de dados.
