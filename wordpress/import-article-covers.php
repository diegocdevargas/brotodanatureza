<?php

if ( PHP_SAPI !== 'cli' ) {
	fwrite( STDERR, "This importer can only be run from the command line.\n" );
	exit( 1 );
}
$root = $argv[1] ?? '';
$wp_load = rtrim( $root, DIRECTORY_SEPARATOR ) . DIRECTORY_SEPARATOR . 'wp-load.php';
if ( '' === $root || ! is_file( $wp_load ) ) {
	fwrite( STDERR, "Pass the local WordPress directory containing wp-load.php.\n" );
	exit( 1 );
}
require $wp_load;
if ( ! in_array( wp_parse_url( home_url(), PHP_URL_HOST ), array( 'localhost', '127.0.0.1', '::1' ), true ) ) {
	fwrite( STDERR, "Refusing to import into a non-local WordPress site.\n" );
	exit( 1 );
}
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

$json = file_get_contents( __DIR__ . DIRECTORY_SEPARATOR . 'seed' . DIRECTORY_SEPARATOR . 'article-covers.json' );
$covers = false === $json ? null : json_decode( $json, true );
if ( ! is_array( $covers ) || ! $covers || JSON_ERROR_NONE !== json_last_error() ) {
	fwrite( STDERR, "Could not read valid cover seed data.\n" );
	exit( 1 );
}
foreach ( $covers as $cover ) {
	foreach ( array( 'slug', 'url', 'filename', 'alt', 'credit', 'source', 'license', 'license_url' ) as $field ) {
		if ( empty( $cover[ $field ] ) || ! is_string( $cover[ $field ] ) ) {
			fwrite( STDERR, "Invalid cover field: {$field}.\n" );
			exit( 1 );
		}
	}
	if ( ! get_page_by_path( $cover['slug'], OBJECT, 'post' ) ) {
		fwrite( STDERR, "Article not found: {$cover['slug']}.\n" );
		exit( 1 );
	}
}
foreach ( $covers as $cover ) {
	$post = get_page_by_path( $cover['slug'], OBJECT, 'post' );
	if ( has_post_thumbnail( $post->ID ) ) {
		printf( "Skipped existing cover: %s (#%d)\n", $cover['slug'], $post->ID );
		continue;
	}
	$tmp = download_url( $cover['url'], 120 );
	if ( is_wp_error( $tmp ) ) {
		fwrite( STDERR, "Could not download {$cover['slug']}: {$tmp->get_error_message()}\n" );
		exit( 1 );
	}
	$id = media_handle_sideload( array( 'name' => $cover['filename'], 'tmp_name' => $tmp ), $post->ID );
	if ( is_wp_error( $id ) ) {
		wp_delete_file( $tmp );
		fwrite( STDERR, "Could not import {$cover['slug']}: {$id->get_error_message()}\n" );
		exit( 1 );
	}
	$caption = sprintf(
		'<a href="%s">%s</a> — <a href="%s">%s</a>; enquadramento adaptado.',
		esc_url( $cover['source'] ),
		esc_html( $cover['credit'] ),
		esc_url( $cover['license_url'] ),
		esc_html( $cover['license'] )
	);
	$result = wp_update_post( array( 'ID' => $id, 'post_excerpt' => $caption ), true );
	update_post_meta( $id, '_wp_attachment_image_alt', $cover['alt'] );
	if ( is_wp_error( $result ) || get_post_field( 'post_excerpt', $id ) !== $caption || get_post_meta( $id, '_wp_attachment_image_alt', true ) !== $cover['alt'] ) {
		fwrite( STDERR, "Could not save attribution for {$cover['slug']}; attachment #{$id} remains unattached as a cover.\n" );
		exit( 1 );
	}
	if ( ! set_post_thumbnail( $post->ID, $id ) ) {
		fwrite( STDERR, "Could not assign cover for {$cover['slug']}; attachment #{$id} remains available.\n" );
		exit( 1 );
	}
	printf( "Added cover: %s (attachment #%d)\n", $cover['slug'], $id );
}
