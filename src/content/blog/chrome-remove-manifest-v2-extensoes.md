---
title: "Chrome remove os últimos Manifest V2 da Web Store: fim de uma era para extensões"
description: "Em 31 de agosto, o Google concluiu a transição para o Manifest V3 removendo todas as extensões restantes baseadas no antigo padrão — o que afeta ad blockers clássicos e milhares de devs."
pubDate: 2026-08-31
tags: ["programação", "dev", "ferramentas", "open-source"]
cover: "/images/news/chrome-remove-manifest-v2-extensoes.jpg"
---

O Google concluiu em **31 de agosto de 2026** a transição de extensões do Chrome para o **Manifest V3**: todas as extensões restantes baseadas no Manifest V2 foram removidas da Chrome Web Store. É o marco final de um processo de mais de quatro anos que começou em janeiro de 2022, quando a loja parou de aceitar novas extensões públicas no padrão antigo.

O que isso significa na prática:

- Extensões MV2 **já instaladas** no Chrome 138 ou versões anteriores continuam funcionando — mas **não recebem mais atualizações** e não podem ser reinstaladas a partir da Web Store;
- Usuários que atualizarem para o Chrome 139 ou superiores não conseguem mais ativar extensões MV2 — o suporte foi removido do navegador;
- A exceção empresarial (policy `ExtensionManifestV2Availability`) foi retirada junto com o Chrome 139.

## A linha do tempo da despedida

| Data | Marco |
|---|---|
| Jan 2022 | Loja para de aceitar novas extensões MV2 públicas/ilistadas |
| Jun 2022 | Fim das novas extensões MV2 privadas |
| Jun 2024 | Começa o phase-out (avisos no chrome://extensions) |
| Mar 2025 | MV2 desabilitado por padrão, com opção de reativar |
| Jul 2025 | MV2 desabilitado em todos os canais (Chrome 138) |
| Ago 2026 | **Últimas extensões MV2 removidas da Web Store** |

## Quem é mais afetado

O impacto é maior nas categorias que dependiam de APIs bloqueadas no MV2: **ad blockers clássicos** (como as versões antigas de uBlock Origin), ferramentas de privacidade, gerenciadores de download, utilitários de automação e extensões focadas em desenvolvedores.

A migração para o MV3 troca o bloqueio de requests em tempo real (webRequest blocking) por regras declarativas (`declarativeNetRequest`), que são mais limitadas — mas também mais seguras e com melhor performance. Para a maioria dos casos de uso, a alternativa MV3 já cobre o cenário; para bloqueadores avançados, a conta é outra.

## O que observar

Do ponto de vista de desenvolvedor, a mensagem é dupla:

1. **Deadline de plataforma não negocia.** A partir de agora, qualquer extensão nova precisa ser MV3 — e as antigas vão definhar sem updates. Se você mantém uma extensão, o momento de verificar se ela roda 100% no MV3 é agora, antes que os usuários comecem a reportar quebras.
2. **O modelo de segurança mudou.** O MV3 é a primeira grande mudança de plataforma em que o Google priorizou o modelo de privilégios sobre a capacidade bruta. É desconfortável para quem perdeu funcionalidade — e é exatamente o tipo de trade-off que vamos ver cada vez mais em plataformas dominantes.

Para quem usa o Chrome no dia a dia, o resumo é simples: se uma extensão que você gosta sumiu da loja ou parou de atualizar, o culpado provavelmente é este calendário — não o desenvolvedor.

> Fonte: [Chrome for Developers](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline)
