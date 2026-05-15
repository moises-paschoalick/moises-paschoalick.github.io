## Context

O shell do portal está pronto para carregar arquivos JSON da pasta `content/`. Atualmente, apenas o tópico "1. Alto Acoplamento" possui conteúdo real. O usuário forneceu repositórios Java com guias didáticos em Markdown que contêm a essência do aprendizado desejado.

## Goals / Non-Goals

**Goals:**
- Converter os guias didáticos do usuário (`.md`) para o formato JSON exigido pelo portal.
- Garantir que o código-fonte exibido no portal corresponda exatamente aos arquivos `.java` fornecidos.
- Manter a fidelidade à lógica de "Dor -> Cura" nas descrições.

**Non-Goals:**
- Alterar o código Java original.
- Adicionar novos recursos ao motor do portal (apenas dados).
- Popular todos os 27 tópicos de uma vez (focar nos tópicos 5 e 7).

## Decisions

- **Estrutura do JSON**: Seguir o schema implícito utilizado em `01-alto-acoplamento.json`:
    - `title`: Nome do tópico.
    - `pain`: Descrição do problema.
    - `cure`: Descrição da solução (pattern).
    - `explanation`: Texto didático complementar.
    - `codeFile`: Nome do arquivo de referência.
    - `githubUrl`: Link para o repositório original.
    - `code`: Snippet de código escapado.
- **Mapeamento de Conteúdo**:
    - **Tópico 5**: Usar `temp/design-patterns/injecao_dependencia.md` para o texto e `Casa.java` para o código.
    - **Tópico 7**: Usar `temp/design-patterns/factory_method_java_explicacao_didatica.md` para o texto e o código do arquivo Markdown.

## Risks / Trade-offs

- **Formatação de Código**: O código nos arquivos Markdown pode precisar de ajustes manuais de quebra de linha para ficar bem apresentado no JSON.
    - *Mitigation*: Validar a renderização visual após a implementação.
- **Sincronização**: Se os arquivos em `temp/` forem alterados, o JSON precisará ser atualizado manualmente.
    - *Mitigation*: Como é um portal de aprendizado estático, aceitamos esse trade-off em favor da simplicidade de dados.
