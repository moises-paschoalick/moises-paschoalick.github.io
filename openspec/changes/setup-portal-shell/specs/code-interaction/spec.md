## ADDED Requirements

### Requirement: Blocos de Código Interativos
O sistema DEVE permitir a exibição de código Java com suporte a tooltips explicativos.

#### Scenario: Ativação de tooltip
- **WHEN** o usuário passa o mouse ou clica em uma parte marcada do código
- **THEN** um pequeno balão informativo DEVE aparecer com a explicação técnica

### Requirement: Link para Repositórios Externos
O sistema DEVE exibir links diretos para os arquivos ou branches correspondentes no GitHub.

#### Scenario: Acesso ao GitHub
- **WHEN** o usuário clica no botão "Ver no GitHub"
- **THEN** o navegador DEVE abrir a URL do arquivo no repositório do autor
