<?php

if ( PHP_SAPI !== 'cli' ) {
	fwrite( STDERR, "This importer can only be run from the command line.\n" );
	exit( 1 );
}

$wp_root = $argv[1] ?? '';
$wp_load = rtrim( $wp_root, DIRECTORY_SEPARATOR ) . DIRECTORY_SEPARATOR . 'wp-load.php';
if ( '' === $wp_root || ! is_file( $wp_load ) ) {
	fwrite( STDERR, "Pass the local WordPress directory containing wp-load.php.\n" );
	exit( 1 );
}

require $wp_load;

$host = wp_parse_url( home_url(), PHP_URL_HOST );
if ( ! in_array( $host, array( 'localhost', '127.0.0.1', '::1' ), true ) ) {
	fwrite( STDERR, "Refusing to import into a non-local WordPress site.\n" );
	exit( 1 );
}

if ( ! post_type_exists( 'plants' ) || ! function_exists( 'update_field' ) ) {
	fwrite( STDERR, "The plants post type and ACF must both be available.\n" );
	exit( 1 );
}

$seed_name = $argv[2] ?? 'plants-30.json';
if ( ! in_array( $seed_name, array( 'plants-30.json', 'plants-mata-atlantica.json', 'plants-gerais.json' ), true ) ) {
	fwrite( STDERR, "Unknown seed file.\n" );
	exit( 1 );
}
$seed_file = __DIR__ . DIRECTORY_SEPARATOR . 'seed' . DIRECTORY_SEPARATOR . $seed_name;
$json      = file_get_contents( $seed_file );
if ( false === $json ) {
	fwrite( STDERR, "Could not read the plant seed file.\n" );
	exit( 1 );
}

$plants = json_decode( $json, true );
if ( JSON_ERROR_NONE !== json_last_error() || ! is_array( $plants ) || ! $plants || ( 'plants-30.json' === $seed_name && 30 !== count( $plants ) ) ) {
	fwrite( STDERR, "The seed file must contain valid plant records; the original seed must contain exactly 30.\n" );
	exit( 1 );
}

$field_keys = array(
	'popular_name'       => 'field_nome_popular',
	'scientific_name'    => 'field_nome_cientifico',
	'category'           => 'field_categoria',
	'medicinal_uses'     => 'field_usos_medicinais',
	'preparation_method' => 'field_modo_de_preparo',
	'used_parts'         => 'field_partes_utilizadas',
	'contraindications'  => 'field_contraindicacoes',
	'plant_source'       => 'field_referencia_planta',
);
$image_field_keys = array(
	'illustrative_image' => 'field_imagem_ilustrativa',
	'image_credit'       => 'field_credito_imagem',
	'image_source_url'   => 'field_fonte_imagem',
);
$allowed_categories = array(
	'digestiva',
	'calmante',
	'anti-inflamatória',
	'imunológica',
	'circulatória',
	'respiratória',
	'outros',
);
$created = 0;
$skipped = 0;

foreach ( $plants as $plant ) {
	$status = $plant['post_status'] ?? 'publish';
	if (
		empty( $plant['title'] ) ||
		empty( $plant['slug'] ) ||
		! in_array( $status, array( 'publish', 'draft' ), true ) ||
		! isset( $plant['acf'] ) ||
		! is_array( $plant['acf'] ) ||
		! in_array( $plant['acf']['category'] ?? '', $allowed_categories, true )
	) {
		fwrite( STDERR, "Invalid plant record in the seed file.\n" );
		exit( 1 );
	}

	foreach ( $field_keys as $field_name => $field_key ) {
		if ( 'plants-gerais.json' === $seed_name && 'preparation_method' === $field_name && ! isset( $plant['acf'][ $field_name ] ) ) {
			continue;
		}
		if ( ! isset( $plant['acf'][ $field_name ] ) || '' === trim( $plant['acf'][ $field_name ] ) ) {
			fwrite( STDERR, "Missing ACF field {$field_name} for {$plant['slug']}.\n" );
			exit( 1 );
		}
	}

	$image_fields_present = 0;
	foreach ( $image_field_keys as $field_name => $field_key ) {
		if ( isset( $plant['acf'][ $field_name ] ) && '' !== trim( $plant['acf'][ $field_name ] ) ) {
			++$image_fields_present;
		}
	}
	if ( ( 0 !== $image_fields_present && count( $image_field_keys ) !== $image_fields_present ) || ( 'plants-30.json' === $seed_name && count( $image_field_keys ) !== $image_fields_present ) ) {
		fwrite( STDERR, "Incomplete image attribution for {$plant['slug']}.\n" );
		exit( 1 );
	}

	$existing = get_page_by_path( $plant['slug'], OBJECT, 'plants' );
	if ( $existing ) {
		printf( "Skipped existing plant: %s (#%d)\n", $plant['slug'], $existing->ID );
		++$skipped;
		continue;
	}

	$post_id = wp_insert_post(
		array(
			'post_type'      => 'plants',
			'post_status'    => $status,
			'post_title'     => $plant['title'],
			'post_name'      => $plant['slug'],
			'post_content'   => $plant['content'] ?? '',
			'comment_status' => 'closed',
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		fwrite( STDERR, "Could not create {$plant['slug']}: {$post_id->get_error_message()}\n" );
		exit( 1 );
	}

	foreach ( $field_keys as $field_name => $field_key ) {
		if ( ! isset( $plant['acf'][ $field_name ] ) ) {
			continue;
		}
		if ( ! update_field( $field_key, $plant['acf'][ $field_name ], $post_id ) ) {
			wp_delete_post( $post_id, true );
			fwrite( STDERR, "Could not save {$field_name} for {$plant['slug']}; the incomplete post was removed.\n" );
			exit( 1 );
		}
	}

	if ( $image_fields_present ) {
		foreach ( $image_field_keys as $field_name => $field_key ) {
			if ( ! update_field( $field_key, $plant['acf'][ $field_name ], $post_id ) ) {
				wp_delete_post( $post_id, true );
				fwrite( STDERR, "Could not save {$field_name} for {$plant['slug']}; the incomplete post was removed.\n" );
				exit( 1 );
			}
		}
	}

	printf( "Created plant: %s (#%d)\n", $plant['slug'], $post_id );
	++$created;
}

printf( "Import complete: %d created, %d already existed.\n", $created, $skipped );
