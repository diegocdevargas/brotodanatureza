# WordPress plants integration

`brota-plants.php` registers the existing `plants` post type independently of
the active theme. The ACF field group in `acf-json` is loaded by ACF and exposes
its fields in the REST API under the `acf` property.

## Local installation

Copy this directory's contents into:

`wp-content/mu-plugins/`

Must-use plugins load automatically; they do not need activation in wp-admin.
Keep the `acf-json` directory beside `brota-plants.php`.

The plugin does not import or modify plant records. It expects the existing
posts to use the `plants` post type, and the ACF group to use the key
`group_plantas_fields`.

Verify the integration at `/wp-json/wp/v2/plants`. Published plant records
should include the `acf` fields. Existing WordPress capabilities continue to
control who can create or edit records.

The REST collection supports `plant_search` across titles, content, excerpts,
and the public plant ACF fields, plus `plant_category` for exact category
filtering. It retains WordPress REST pagination and total-count headers.

To import the researched Brazilian plants seed locally, run:

```sh
php wordpress/import-plants.php /path/to/wordpress plants-mata-atlantica.json
```

Additional plant records and the three related articles can be imported locally:

```sh
php wordpress/import-plants.php /path/to/wordpress plants-gerais.json
php wordpress/import-articles.php /path/to/wordpress
php wordpress/import-article-covers.php /path/to/wordpress
```

The plant and article importers skip existing slugs and do not update previously
imported content. The general plant seed permits a missing preparation when reliable
medicinal preparation details are unavailable.

The cover importer downloads the credited images into the local media library
and only fills missing featured images; it never replaces existing covers.

The importer refuses non-local WordPress hosts and skips existing slugs; it does
not overwrite earlier records. Each seed record may specify `post_status` as
`publish` or `draft` (the default is `publish`); incomplete records are kept
as drafts for review rather than published. Images may be
omitted when none has been verified; if supplied, the URL, source, and credit
must all be present. Medical content requires professional review before public
release.
