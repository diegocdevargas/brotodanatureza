# Plant references (ACF content added 2026-11-04)

## Mata Atlântica: initial researched records

`wordpress/seed/plants-mata-atlantica.json` retains 30 records, including drafts.
Each record
links a medicinal reference; where an image is available it also links the
original image or observation with author and license. Copaíba (*Copaifera
reticulata*) still lacks a verified, freely reusable photograph and uses the
site's placeholder. These are educational
summaries, not treatment recommendations, and must be reviewed by a qualified
health professional before public release.

The four additions to the original five use the Distrito Federal health
secretariat's guides for [digestive complaints](https://www.saude.df.gov.br/documents/37101/571046/Guia+de+Plantas+Medicinais+%E2%80%93+Desconfortos+Gastrintestinais.pdf)
and [anxiety](https://www.saude.df.gov.br/documents/37101/571046/Guia+de+Plantas+Medicinais+%E2%80%93+Ansiedade.pdf/6dd6dbee-a960-f423-2f46-d2718b4b8968).
Some species in this batch occur in other Brazilian biomes, not only the Mata Atlântica.

The subsequent 21 records refer to the
[UFSB ethnobotanical guide on Juerana](https://rsv.ojsbr.com/rsv/pt_BR/article/download/2747/3061/10049)
or the [Embrapa medicinal and aromatic plants catalog](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1163829/1/CatalogoHorto.pdf).
These sources record traditional or catalogued uses; they do not establish
clinical efficacy or safety. Where they do not provide safe preparation details
or contraindications, those records remain drafts rather than inventing them.
Image attribution and species identification should be reviewed before release.
The plant descriptions state the uses and limitations directly; the underlying
references remain in the seed and WordPress; the sources section is currently hidden.

### Preparation review (2026-11-10)

Records without a clear, sourced home preparation found during this review were
moved to draft in local WordPress; they may be completed with further research.
Seed records retain their contents and explicit publication status,
so reimporting does not publish the drafts. Standard infusion steps (cover,
rest 10–15 minutes and strain) follow the [Goiás health secretariat's guide](https://goias.gov.br/saude/wp-content/uploads/sites/34/cremic/publicacoes/Guia%20de%20recomenda%C3%A7%C3%B5es%20t%C3%A9cnicas%20para%20cultivo%20de%20plantas%20medicinais%20em%20horto%20comunit%C3%A1rio.pdf).
The plant-specific quantities and intended populations come from the stored references:
DF health guides for macela, carqueja, maracujá-doce and capim-cidreira;
ANVISA monographs for guaco and espinheira-santa; and ANVISA translations of EMA
monographs for eucalipto, melissa, hortelã-pimenta and sabugueiro. These summaries require professional
review and should not be treated as individualized dosing advice. The medical
indications are traditional uses, not proof of clinical benefit.

In November 2026, the macela image was replaced and ten missing images were
added from Wikimedia Commons and iNaturalist. The latter are community
research-grade identifications, not guarantees of identification. Photo credits,
license labels and links to the original files or observations are in the seed
and displayed on the plant pages. iNaturalist identifies macela under the synonym
*Achyrocline saturejoides*. For copaíba, photographs by A. Fuentes are listed
at [Useful Tropical Plants](https://tropical.theferns.info/image.php?id=Copaifera+reticulata),
but have a noncommercial, no-derivatives license and were not used; the
separately pictured resin is not reliably identified to species. Images must
not be used to identify a plant for medicinal consumption.

The origin of *Psidium guajava* is left unverified: the
[Universidade Estadual do Norte Fluminense](https://uenf.br/projetos/arvoresdauenf/especie-2/goiabeira/)
describes it as native to the Americas, while
[Universidade de Vassouras](https://mosquitex.univassouras.edu.br/goiabeira)
describes its origin as unknown and the plant as naturalized in Brazil. Resolve
that disagreement with a current taxonomic authority before classifying it.
The [Ministério da Saúde](https://www.gov.br/saude/pt-br/composicao/sectics/plantas-medicinais-e-fitoterapicos/plantas-medicinais-e-fitoterapicos-no-sus/monografias)
and [ANVISA](https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/medicamentos/fitoterapicos-dinamizados-e-especificos/registro-simplificado-de-fitoterapicos/monografias-para-o-registro-simplificado/)
provide references for future additions. A listing in ReniSUS does not by itself
establish clinical efficacy or safety.

Sources for the 17 plants inserted into WordPress (post IDs 27–43, CPT `plants`).
The frontend displays image credits next to the photo when those ACF fields are
present; medicinal references remain stored but are not displayed. Some of the
original 17 records have since had references added.

## General sources

### Four native plants (2026-11-11)

The pitangueira record was completed using the 2026 Brazilian herbal formulary
as transcribed by [FitoFinder](https://fitofinder.com.br/planta/eugenia-uniflora);
its botanical description is supported by [UFSC](https://hortodidatico.ufsc.br/pitanga/).
The [UFSC guaçatonga](https://hortodidatico.ufsc.br/guacatonga/) and
[arnica-da-praia](https://hortodidatico.ufsc.br/arnica-da-praia-i/) records
provide their traditional preparations and precautions. The
[ANVISA erva-baleeira assessment](https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/medicamentos/fitoterapicos-dinamizados-e-especificos/registro-simplificado-de-fitoterapicos/relatorios-de-avaliacao/relatorio_cordia_verbenacea.pdf/@@download/file)
describes the external infusion and precautions; general infusion steps use
the Goiás guide linked above. Photos are attributed in the records; iNaturalist
community identifications should not be used alone for plant identification.

### Alecrim, louro and araucária (2026-11-10)

The additional plant records are in `wordpress/seed/plants-gerais.json`; the
articles are in `wordpress/seed/articles-plants.json`. Alecrim's traditional
digestive use and contraindications are described by the
[EMA](https://www.ema.europa.eu/en/medicines/herbal/rosmarini-folium); the
infusion quantities also appear in the [Brazilian herbal formulary](https://fitoterapiabrasil.com.br/sites/default/files/formulario-fitoterapico/preparacao_extemporanea_de_rosmarinus_officinalis.pdf).
The general infusion steps are from the Goiás guide above. For louro, use and
precautions follow the [UFSC medicinal plant garden](https://hortodidatico.ufsc.br/louro/).
Araucária is an explicit exception to the earlier detailed-preparation rule:
the published entry describes documented traditional use without giving a
medicinal recipe. Its seeds and their food use are described by
[Embrapa](https://www.alice.cnptia.embrapa.br/alice/bitstream/doc/1137678/1/EmbrapaFlorestas-2021-LV-AraucariaEmbrapa-cap16.pdf);
traditional uses are recorded in a [research review](https://organic-inorganic.imedpub.com/chemical-constituents-and-biologicalactivities-of-araucaria-angustifolia-bertolo-kuntze-a-review.php?aid=8964).
Plant image credits and originals are stored with each seed record.

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

## Additional 30 plants (2026-11-08)

The following batch is stored in `wordpress/seed/plants-30.json`; records without a reviewed, detailed home
preparation are now drafts in the local WordPress installation. The
separate `wordpress/import-plants.php` CLI script refuses non-local WordPress
hosts and skips slugs that already exist. These records have not been added to
production.

The medicinal summaries below follow EMA/HMPC herbal monographs. "Traditional
use" is not the same as proof of efficacy, Brazilian product registration, or
individual medical advice. A qualified health professional should review these
pages before publication outside the local environment.

Each image is linked from Wikimedia Commons and was selected for the listed
taxon; check the linked file page for the current license and metadata. The
image credit, license label, and source URL are also stored in the plant's ACF
fields and shown on its detail page.

| Plant | Botanical name | Medicinal reference | Image credit and license |
|---|---|---|---|
| Tanchagem-de-folha-estreita | *Plantago lanceolata* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/plantaginis-lanceolatae-folium) | [Daniel VILLAFRUELA — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Plantago%20lanceolata-Plantain%20lanc%C3%A9ol%C3%A9-20210329.jpg) |
| Malva-branca | *Althaea officinalis* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/althaeae-radix) | [Franz Eugen Köhler — public domain](https://commons.wikimedia.org/wiki/File:Althaea%20officinalis%20-%20K%C3%B6hler%E2%80%93s%20Medizinal-Pflanzen-008.jpg) |
| Tomilho | *Thymus vulgaris* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/thymi-herba) | [Isidre Blanc — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:THYMUS%20VULGARIS%20-%20AGUDA%20-%20IB-910%20(Tim%C3%B3).JPG) |
| Sálvia | *Salvia officinalis* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/salviae-officinalis-folium) | [Syrio — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Sage%20plant%20in%20Castel%20Beseno.JPG) |
| Urtiga | *Urtica dioica* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/urticae-herba) | [Dominicus Johannes Bergsma — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Brandnetel%2C%20Urtica%20dioica%2C%20Locatie%2C%20Famberhorst.jpg) |
| Dente-de-leão | *Taraxacum officinale* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/taraxaci-folium) | [Dominicus Johannes Bergsma — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Dwarsdoorsnede%20van%20een%20gesloten%20bloem%20van%20een%20paardenbloem%20(Taraxacum%20officinale)%2008-05-2022.%20(d.j.b).jpg) |
| Mil-folhas | *Achillea millefolium* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/millefolii-herba) | [Arkadiusz Nowak et al. — CC BY 4.0](https://commons.wikimedia.org/wiki/File:Achillea%20millefolium%20(Flora%20of%20Tajikistan).png) |
| Erva-de-são-joão | *Hypericum perforatum* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/hyperici-herba-0) | [Didier Descouens — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:(MHNT)%20Hypericum%20perforatum%20flower%20and%20buttons.jpg) |
| Psyllium | *Plantago ovata* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/plantaginis-ovatae-semen) | [Stacy Manson / National Park Service — public domain; CC BY 2.0](https://commons.wikimedia.org/wiki/File:Desert%20indianwheat%20(Plantago%20Ovata)%20(14395740991).jpg) |
| Sene | *Senna alexandrina* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/sennae-folium) | [Adolphus Ypey — public domain](https://commons.wikimedia.org/wiki/File:Cassia%20senna%20Ypey80-cropped.jpg) |
| Hamamélis | *Hamamelis virginiana* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/hamamelidis-folium) | [Franz Eugen Köhler — public domain](https://commons.wikimedia.org/wiki/File:Hamamelis%20virginiana%20-%20K%C3%B6hler%E2%80%93s%20Medizinal-Pflanzen-070.jpg) |
| Cavalinha | *Equisetum arvense* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/equiseti-herba) | [Danny S. — CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Equisetum%20arvense-271.JPG) |
| Bétula | *Betula pendula* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/betulae-folium) | [PyhäjärviLab — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:7%20Haapastensyrj%C3%A4%20forestry%20research%20centre%20Betula%20pendula%20grafts%202021.jpg) |
| Chá-de-Java | *Orthosiphon aristatus* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/orthosiphonis-folium) | [Adrina Aknes — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Kumis%20Kucing%20(Orthosiphon%20aristatus).jpg) |
| Uva-ursina | *Arctostaphylos uva-ursi* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/uvae-ursi-folium) | [Douglas Goldman — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:ArctostaphUva3.jpg) |
| Vara-de-ouro | *Solidago virgaurea* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/solidaginis-virgaureae-herba) | [Victor M. Vicente Selvas — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:S.%20virgaurea2015-10-10.jpg) |
| Alcaçuz | *Glycyrrhiza glabra* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/liquiritiae-radix) | [Author unknown — public domain](https://commons.wikimedia.org/wiki/File:Camerarius%20S%C3%BC%C3%9Fholz.jpg) |
| Hera | *Hedera helix* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/hederae-helicis-folium) | [Didier Descouens — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:(MHNT)%20Hedera%20helix%20-%20immature%20inflorescences.jpg) |
| Pelargônio | *Pelargonium sidoides* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/pelargonii-radix) | [Krzysztof Ziarnek, Kenraiz — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Pelargonium_sidoides_kz04.jpg) |
| Agnocasto | *Vitex agnus-castus* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/agni-casti-fructus) | [Josep Gesti — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Vitex%20agnus-castus%2C%20Ametlla%20de%20Mar.jpg) |
| Cúrcuma | *Curcuma longa* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/curcumae-longae-rhizoma) | [J.M.Garg — CC BY 3.0](https://commons.wikimedia.org/wiki/File:Curcuma%20longa%20(Haldi)%20Im%20IMG%202441.jpg) |
| Gilbardeira | *Ruscus aculeatus* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/rusci-rhizoma) | [Historical illustration — public domain](https://commons.wikimedia.org/wiki/File:Illustration%20Ruscus%20aculeatus0.jpg) |
| Fumária | *Fumaria officinalis* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/fumariae-herba) | [Didier Descouens — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:(MHNT)%20Fumaria%20officinalis%20-%20Habit.jpg) |
| Linhaça | *Linum usitatissimum* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/lini-semen) | [Historical illustration — public domain](https://commons.wikimedia.org/wiki/File:Illustration%20Linum%20usitatissimum0.jpg) |
| Espinheiro-alvar | *Crataegus monogyna* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/crataegi-folium-cum-flore) | [Didier Descouens — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:(MHNT)%20Crataegus%20monogyna%20-%20flowers%20and%20buds.jpg) |
| Zimbro | *Juniperus communis* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/juniperi-galbulus-pseudo-fructus) | [W. Carter — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Branched%20juniper%20twig%20with%20shots.jpg) |
| Tormentila | *Potentilla erecta* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/tormentillae-rhizoma) | [Pleple2000 — CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Kwiat%202006.jpg) |
| Cimicífuga | *Actaea racemosa* (sin. *Cimicifuga racemosa*) | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/cimicifugae-rhizoma) | [Agnieszka Kwiecień, Nova — CC BY-SA 4.0](https://commons.wikimedia.org/wiki/File:Actaea%20racemosa%20Pluskwica%20groniasta%202019-07-20%2001.jpg) |
| Garra-do-diabo | *Harpagophytum procumbens* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/harpagophyti-radix) | [Furukama — CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Harpagophytum%20procumbens.jpg) |
| Cardo-mariano | *Silybum marianum* | [EMA/HMPC](https://www.ema.europa.eu/en/medicines/herbal/silybi-mariani-fructus) | [SuperJew — CC BY-SA 3.0](https://commons.wikimedia.org/wiki/File:Mediterranean%20Milk%20Thistle%2002.jpg) |

To re-run the import against a local WordPress install (new slugs are skipped):

```powershell
D:\xampp\php\php.exe wordpress\import-plants.php D:\xampp\htdocs\broto
```
