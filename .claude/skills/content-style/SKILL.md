---
name: content-style
description: Guia de estilo de texto e formatação para os conteúdos do projeto Pattern Quest. Use sempre que for escrever ou revisar textos em JSON (campos pain, cure, explanation) ou arquivos markdown da pasta content/. Define regras de pontuação, espaçamento entre seções, espaçamento ao redor de blocos de código e tom de escrita.
---

# Guia de Estilo — Pattern Quest Content

Aplique estas regras a qualquer texto escrito para os campos `pain`, `cure`, `explanation` (JSON) e arquivos `.md` da pasta `content/`.

---

## Pontuação

**Nunca use travessão (—), meia-risca (–) nem `---` como substituto de travessão em meio a texto.**

O `---` sozinho em linha própria é separador horizontal (válido). Dentro de títulos, frases ou parágrafos, é proibido.

Substitua sempre por uma das alternativas abaixo, dependendo do contexto:

| Intenção | Substituto |
|---|---|
| Aposto ou explicação | vírgulas: `O carro, fabricado na década de 90, ...` |
| Conclusão ou resultado | dois pontos: `Resultado: tudo para.` |
| Contraste ou oposição | ponto e vírgula: `Diesel é rápido; elétrico é silencioso.` |
| Ênfase em frase curta | ponto final separando a frase: `Isso é alto acoplamento. Simples assim.` |

Nunca use travessão decorativo no lugar de vírgula ou ponto.

---

## Espaçamento entre seções

Toda seção deve ter **uma linha em branco antes do título** e **uma linha em branco depois do título**, antes do primeiro parágrafo.

```
[linha em branco]
## Título da Seção
[linha em branco]
Primeiro parágrafo da seção.
```

Entre parágrafos dentro de uma mesma seção: uma linha em branco.

Entre o fim de uma seção e o separador `---`: uma linha em branco.

Entre o separador `---` e o próximo título: uma linha em branco.

```
Último parágrafo da seção anterior.

---

## Próxima Seção
```

---

## Espaçamento ao redor de blocos de código

Todo bloco de código deve ter **uma linha em branco antes** e **uma linha em branco depois**.

```
Texto explicativo antes do código.

\`\`\`java
// código aqui
\`\`\`

Texto continuando depois do código.
```

Nunca coloque um bloco de código imediatamente após um título sem uma linha de contexto antes.

Sempre marque a linguagem no bloco: ` ```java `, ` ```sql `, ` ```bash `, ` ```json `. Nunca use ` ``` ` sem linguagem.

---

## Tom e voz

- Escreva em **português brasileiro**, direto e técnico, sem ser frio.
- Prefira frases curtas. Uma ideia por frase.
- Evite conectivos excessivos ("sendo que", "tendo em vista que", "no que tange a").
- Use **negrito** para termos-chave na primeira vez que aparecem.
- Use listas quando houver 3 ou mais itens paralelos; não use lista para 2 itens.
- Não comece parágrafos com "Basicamente", "Então", "Então basicamente" ou "Ou seja".
- Citações e frases de efeito entram em bloco `>` (blockquote).

---

## Espaçamento visual (CSS)

O espaçamento entre seções é controlado pelo CSS em `styles/main.css`, não por `\n` extras no JSON. Não adicione linhas em branco duplicadas para tentar aumentar o espaço visual. As regras CSS já definem:

- `h2` dentro de `.explanation`: `2.5rem` acima.
- `hr`: `2.5rem` acima e abaixo.
- `blockquote`: `1.5rem` acima e abaixo.
- `pre` (código): `1.5rem` acima e abaixo.

Se o espaçamento estiver ruim, corrija o CSS, não o conteúdo.

---

## Emojis nos títulos

Use emojis apenas nos títulos de seção (`##`), nunca no meio do texto corrido.

Padrão de emojis por tipo de seção:

| Seção | Emoji |
|---|---|
| Problema / Dor | 🎯 |
| Analogia | 🌍 |
| Diagrama UML | 📐 |
| Implementação / Código | 💻 |
| Trade-offs | ⚖️ |
| Padrões relacionados | 🔗 |
| SOLID | 🧱 |
| Spring / Framework | 🏢 |

---

## Campos JSON específicos

**`pain`**: uma a três frases. Descreve a dor concreta, com um exemplo real ou frase que o leitor já ouviu antes. Sem travessão. Sem bullet list.

**`cure`**: uma a duas frases. Descreve a solução em linguagem de contrato, não de implementação. Sem travessão.

**`explanation`**: markdown completo. Segue todas as regras acima. Começa direto na analogia ou na dor estendida, sem repetir o que já está em `pain`.

**`code`**: código completo e rodável. Sem comentários óbvios. Comentários apenas para o que não fica claro pelo nome.
