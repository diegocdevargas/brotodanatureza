# Plano Estratégico — O Broto da Natureza

> Documento vivo. Atualizar conforme as fases avançam e as hipóteses forem validadas.
> Última atualização: 2026-10-03

## Visão

Ser a principal referência sobre plantas medicinais e produtos naturais no Brasil, unindo **conteúdo confiável**, uma **comunidade de artesãos e produtores** e **ferramentas** para quem vive desse mercado.

O projeto evolui em três camadas, cada uma apoiada na anterior:

```
Fase 1: Portal (público)  →  Fase 2: Marketplace (vendas)  →  Fase 3: SaaS (ferramentas)
     audiência                    comissão                         assinatura
```

---

## Conceitos-chave

| | Portal | Marketplace | SaaS |
|---|---|---|---|
| **O que é** | Conteúdo editorial (enciclopédia + blog) | Vitrine que conecta compradores e vendedores | Software que o vendedor usa para tocar o próprio negócio |
| **Quem paga** | Anunciantes / afiliados | Vendedor, com comissão por venda | Vendedor, com assinatura recorrente |
| **Ativo principal** | Tráfego e confiança | Volume de transações | Ferramenta útil por si só |
| **Referências** | — | Elo7, Etsy | Shopify, Nuvemshop, Bling |

**Modelo escolhido: híbrido**, como o Etsy: marketplace com comissão e, sobre ele, planos pagos com ferramentas extras para vendedores.

---

## Fase 1 — Portal (atual)

**Objetivo:** construir audiência qualificada e autoridade no nicho de saúde natural.

### Entregas
- [ ] Ajustes técnicos pendentes (ver seção abaixo)
- [ ] Enciclopédia de plantas com conteúdo completo (usos, preparo, partes usadas, contraindicações)
- [ ] Blog com publicação regular
- [ ] SEO: metadata por página, sitemap, dados estruturados (schema.org), Open Graph
- [ ] Sinais de E-E-A-T (conteúdo YMYL): autoria, fontes citadas, data de revisão, aviso médico
- [ ] Páginas institucionais: Sobre, Contato, Política de Privacidade, Termos
- [ ] Captura de e-mail (newsletter) — base para as próximas fases
- [ ] Analytics (Google Analytics / Plausible) + Google Search Console

### Monetização
- Google AdSense (ou rede premium, como Ezoic/Mediavine, quando o tráfego permitir)
- Afiliados: chás, óleos essenciais, livros, cosméticos naturais (Amazon, Hotmart, lojas do nicho)
- Conteúdo patrocinado, sinalizado de forma clara

### Categoria do portal
Principal: **Health → Wellness** · Secundárias: **Publishing → Blogs**, **Education**

### Critérios para avançar à Fase 2
- Tráfego orgânico estável e crescente (meta inicial sugerida: ~10 mil visitas/mês)
- Lista de e-mails com algumas centenas de inscritos
- Ao menos 10–20 artesãos/produtores interessados (validado por formulário de pré-cadastro)

---

## Fase 2 — Marketplace curado

**Objetivo:** validar que existe demanda para comprar produtos naturais e artesanais via Broto.

### Estratégia
- **Começar pequeno e curado:** poucos vendedores selecionados a dedo, garantindo qualidade e conformidade.
- **Usar o portal para trazer compradores:** a página de cada planta exibe produtos relacionados (ex.: "Camomila" → chás e sachês de camomila dos vendedores).
- **Resolver o "ovo e a galinha":** o público já existe por causa da Fase 1; o esforço vai para atrair vendedores.

### Entregas
- [ ] Cadastro e perfil público do vendedor
- [ ] Cadastro de produtos com categorias (chás, cosméticos naturais, artesanato, sementes/mudas etc.)
- [ ] Carrinho e checkout com **split de pagamento** (Pagar.me, Mercado Pago, Asaas ou similar)
- [ ] Cálculo de frete (Melhor Envio / Correios)
- [ ] Painel básico do vendedor (pedidos, produtos)
- [ ] Avaliações de produtos e vendedores
- [ ] Regras de conformidade e moderação de anúncios

### Monetização
- Comissão por venda (referência de mercado: 10–20%)
- Possível taxa fixa por transação

### Critérios para avançar à Fase 3
- Vendedores ativos vendendo de forma recorrente
- Feedback claro sobre quais ferramentas os vendedores sentem falta (entrevistas!)

---

## Fase 3 — SaaS para vendedores

**Objetivo:** receita recorrente com ferramentas que o vendedor usaria mesmo fora do marketplace.

### Ideias de recursos (validar na Fase 2 antes de construir)
- Loja própria com subdomínio ou domínio personalizado (`loja-da-maria.brotodanatureza.com.br`)
- Calculadora de custo e precificação para artesanato (insumos, horas, margem)
- Gestão de estoque e pedidos
- Gerador de rótulos e fichas técnicas de produtos (com base na enciclopédia do portal)
- Destaque nos resultados do marketplace
- Relatórios de vendas

### Planos (rascunho)
| Plano | Preço | Inclui |
|---|---|---|
| Grátis | R$ 0 | Vender no marketplace (com comissão padrão) |
| Pro | a definir | Comissão reduzida, loja própria, calculadora, relatórios |
| Premium | a definir | Tudo do Pro + domínio próprio, destaque, rótulos |

---

## Riscos e pontos de atenção

### Regulatório (ANVISA)
- Chás com alegação terapêutica, fitoterápicos, óleos essenciais e cosméticos podem exigir **registro ou notificação na ANVISA**.
- A plataforma precisa de **regras de publicação**: proibir alegações de cura, exigir conformidade dos vendedores e permitir denúncias.
- **Consultar um advogado** antes de lançar o marketplace.

### Conteúdo de saúde
- O conteúdo do portal é YMYL: informação incorreta tem risco real para o usuário.
- Manter aviso médico visível, citar fontes e, se possível, revisão por um profissional (farmacêutico, fitoterapeuta).

### Financeiro / fiscal
- Usar split de pagamento para **não intermediar o dinheiro do vendedor**, o que traria implicações fiscais.
- Avaliar o enquadramento da empresa (MEI não comporta marketplace; considerar ME/Simples Nacional).

### LGPD
- Política de privacidade, consentimento para cookies/ads e tratamento adequado dos dados de vendedores e compradores.

### Mercado
- Concorrência direta: Elo7, Mercado Livre, Shopee. **Diferencial do Broto:** nicho focado + conteúdo educativo + comunidade.

---

## Ajustes técnicos pendentes (portal)

- [ ] `src/lib/wordpress.ts`: trocar `cache: 'no-store'` por `next: { revalidate: 3600 }`. Hoje o `no-store` anula o ISR das páginas (`revalidate = 3600`), e toda requisição vai direto ao WordPress.
- [ ] Tratamento de erro e de estados vazios quando a API do WordPress falhar
- [ ] Substituir valores fixos no código (ex.: "Fontes consultadas: 40+" no dashboard)
- [ ] Configurar variáveis de ambiente para produção (`NEXT_PUBLIC_WP_API_URL`)
- [ ] Commitar o trabalho atual (o repositório só tem o commit inicial)

### Arquitetura futura (a decidir)
- O WordPress headless atende bem o portal, mas **marketplace e SaaS exigem backend próprio** (usuários, pedidos, pagamentos, multi-tenant).
- Opções a avaliar na Fase 2: Next.js + banco próprio (PostgreSQL via Supabase/Neon) ou uma plataforma de marketplace pronta para validar mais rápido antes de construir do zero.

---

## Perguntas em aberto

- Quais categorias de produto entram primeiro? (Começar só com artesanato e produtos sem alegação terapêutica reduz o risco regulatório.)
- Vendedores pessoa física serão aceitos, ou só CNPJ/MEI?
- Comunidade: fórum, grupo externo (WhatsApp/Telegram) ou recurso dentro da plataforma?
- Nome e marca: o marketplace fica sob "O Broto da Natureza" ou ganha uma marca própria?
