# BiT — Plataforma de talentos

Protótipo responsivo de uma plataforma de recrutamento inclusivo, construído com HTML, CSS e JavaScript sem dependências de build. A identidade e os fluxos foram baseados nas telas fornecidas na pasta do projeto.

## Como abrir

Abra `index.html` em um navegador moderno. Para evitar restrições de arquivos locais em alguns navegadores, sirva a pasta com um servidor estático simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`. Não há instalação de pacotes ou etapa de compilação.

## Implementações

### Estrutura e identidade visual

- `index.html` define a aplicação em português do Brasil, metadados, navegação lateral, barra superior, conteúdo das quatro áreas, navegação móvel e diálogos.
- `styles.css` implementa o sistema visual inspirado nas referências: azul-marinho, lilás, cartões brancos, indicadores coloridos, cantos arredondados e tipografia Manrope/DM Sans.
- O layout se adapta a telas largas, tablets e celulares. Em telas pequenas, o menu lateral vira uma barra fixa inferior e os painéis passam para uma coluna.
- Fontes do Google Fonts são opcionais; fontes de sistema são usadas como alternativa.

### Visão geral

- Indicadores de talentos, diversidade, vagas e meta de inclusão.
- Aviso de novas candidaturas que pode ser dispensado.
- Acompanhamento de metas de impacto e lista resumida de vagas.
- A imagem `Mapa de concentração.png` é apresentada como visualização de concentração regional. As referências fornecidas são imagens rasterizadas de telas; por isso o mapa mantém os rótulos que já aparecem na imagem.

### Vagas

- Aba de vagas com busca por título/localização e filtros de status.
- Diálogo de publicação com campos de título, localização, nível e habilidades, além da opção de triagem anti-viés.
- Ao publicar, a vaga é adicionada à lista em memória e uma confirmação é exibida.
- O estado é demonstrativo e se perde ao recarregar a página; não há API ou banco de dados conectado.

### Talentos

- Painel regional, municípios e shortlist demonstrativa de candidatos com habilidades, diversidade e compatibilidade.
- Candidatos podem ser marcados como salvos durante a sessão.
- “Exportar shortlist” baixa um CSV com os candidatos de exemplo.

### Impacto ESG

- Cartões com metas trimestrais e progresso ilustrativo.
- “Gerar relatório ESG” apresenta uma confirmação. “Baixar relatório” cria um HTML local imprimível que pode ser salvo como PDF pelo navegador.
- Os dados de vagas, candidatos, métricas e metas são exemplos de interface, não dados reais.

### Interações comuns

- Navegação entre Visão geral, Vagas, Talentos e Impacto ESG, com atualização do breadcrumb e suporte a links `#inicio`, `#vagas`, `#talentos` e `#esg`.
- Diálogos acessíveis por teclado para publicar vaga e mostrar confirmações.
- Feedback visual para salvamento de candidatos e estado ativo da navegação.
- Geração dos arquivos de shortlist e relatório feita no navegador usando Blob e URL temporária.

## Arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Conteúdo e estrutura das telas |
| `styles.css` | Tema, componentes e responsividade |
| `script.js` | Navegação, formulários, filtros e exportações |
| `Mapa de concentração.png` | Referência visual usada no painel de mapa |
| Demais arquivos PNG fornecidos | Referências das telas de login, cadastro, publicação, shortlist, relatório e carregamento usadas para orientar o desenho dos componentes e do fluxo |

## Escopo do protótipo

Não há autenticação, persistência local/remota, envio real de vagas, mapa interativo ou integração com serviços externos. Os formulários e dados são locais e servem para demonstrar a experiência proposta.
