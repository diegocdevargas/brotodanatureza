# Plant references (ACF content added 2026-11-04)

Sources for the 17 plants inserted into WordPress (post IDs 27–43, CPT `plants`).
Planned: show these references on the site later (e.g. a "Fontes" block on each plant page).

## General sources

- ANVISA, *Monografias traduzidas* (tradução não oficial das monografias EMA/HMPC, Brasil):
  https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/medicamentos/fitoterapicos-dinamizados-e-especificos/monografias-traduzidas
  File pattern: `<base>/<genero_especie_parte>p.pdf/@@display-file/file`
- ANVISA, *Monografias para o registro simplificado* (monografias brasileiras, aprovadas em 17/12/2025):
  https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/medicamentos/fitoterapicos-dinamizados-e-especificos/registro-simplificado-de-fitoterapicos/monografias-para-o-registro-simplificado/
- EMA/HMPC, European Union herbal monographs: https://www.ema.europa.eu/en/medicines/herbal
- Not reachable when researching (bad TLS certificate / file too large): Memento Fitoterápico da Farmacopeia Brasileira (RDC 84/2016) and Formulário de Fitoterápicos (RDC 463/2021).
  Worth checking the plants below against these before launch.

## Per plant

Base for ANVISA translated monographs:
`https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/medicamentos/fitoterapicos-dinamizados-e-especificos/monografias-traduzidas/`

| Plant (ID) | Source | Notes |
|---|---|---|
| Hortelã-pimenta (27) | `mentha_x_piperita_folhap.pdf` (EMA/HMPC 15/01/2020, translated 07/06/2021) | |
| Erva-doce (28) | `pimpinella_anisum_frutop.pdf` (EMA/HMPC/321184/2012) | |
| Espinheira-santa (29) | `.../registro-simplificado-de-fitoterapicos/monografias-para-o-registro-simplificado/monografia_monteverdia_ilicifolia_folium.pdf` (ANVISA, 17/12/2025) | Táxon atual: *Monteverdia ilicifolia* (syn. *Maytenus ilicifolia*) |
| Gengibre (30) | `zingiber_officinale_rizomap.pdf` | Doses are for powdered rhizome |
| Melissa (31) | `melissa_officinalis_folhap.pdf` | |
| Maracujá (32) | `passiflora_incarnata_ervap.pdf` (EMA/HMPC/669740/2013) | Species is *P. incarnata* |
| Lavanda (33) | EMA/HMPC/734125/2010, final monograph 2012: https://www.e-lactancia.org/media/papers/LavandaFlor-EMA2012.pdf | No ANVISA translation found |
| Valeriana (34) | `valeriana_officinalis_raizp.pdf` | |
| Calêndula (35) | `calendula_officinalis_florp.pdf` (EMA/HMPC/437450/2017) | |
| Arnica (36) | `arnica_montana_florp.pdf` | External use only |
| Alecrim (37) | EMEA/HMPC/13633/2009, **draft, superseded**: https://www.ema.europa.eu/en/documents/herbal-monograph/draft-community-herbal-monograph-rosmarinus-officinalis-l-folium_en.pdf | Current EMA "Revision 1" not retrieved: re-check |
| Equinácea (38) | `echinacea_purpurea_erva-frescap.pdf` (EMA/HMPC/48704/2014) | |
| Sabugueiro (39) | `sambucus_nigra_florp.pdf` | |
| Castanha-da-índia (40) | `aesculus_hippocastanum_sementep.pdf` | "Raw seeds are toxic / no home tea" line is **ours**, not from the monograph |
| Ginkgo (41) | `ginkgo_biloba_folhap.pdf` | Standardized extracts only |
| Guaco (42) | `.../monografias-para-o-registro-simplificado/monografia_mikania_glomerata_folium.pdf` (ANVISA, 17/12/2025) | |
| Eucalipto (43) | `eucalyptus_globulus_folhap.pdf` (EMA/HMPC/892618/2011) | |

## Known gaps

- Images are Unsplash photos picked by eye; several are not the labelled species (guaco, espinheira-santa, erva-doce) or only a related one (arnica, maracujá, eucalipto).
- Texts were written in Portuguese from the monographs (traditional-use indications, doses, contraindications). Review by a qualified professional before public launch.
- Backup taken before inserting: `scratchpad/broto-backup-2026-11-04.sql` (temp folder, copy it somewhere permanent).
- To undo the insert: delete post IDs 27–43.
