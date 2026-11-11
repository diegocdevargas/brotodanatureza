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
if ( ! in_array( wp_parse_url( home_url(), PHP_URL_HOST ), array( 'localhost', '127.0.0.1', '::1' ), true ) ) {
	fwrite( STDERR, "Refusing to import into a non-local WordPress site.\n" );
	exit( 1 );
}

$file = __DIR__ . DIRECTORY_SEPARATOR . 'seed' . DIRECTORY_SEPARATOR . 'articles-plants.json';
$json = file_get_contents( $file );
$articles = false === $json ? null : json_decode( $json, true );
if ( ! is_array( $articles ) || ! $articles || JSON_ERROR_NONE !== json_last_error() ) {
	fwrite( STDERR, "Could not read valid article seed data.\n" );
	exit( 1 );
}
$authors = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID', 'orderby' => 'ID', 'order' => 'ASC' ) );
if ( ! $authors ) {
	fwrite( STDERR, "No administrator available as article author.\n" );
	exit( 1 );
}
foreach ( $articles as $article ) {
	foreach ( array( 'title', 'slug', 'excerpt', 'content' ) as $field ) {
		if ( ! isset( $article[ $field ] ) || ! is_string( $article[ $field ] ) || '' === trim( $article[ $field ] ) ) {
			fwrite( STDERR, "Invalid article seed field: {$field}.\n" );
			exit( 1 );
		}
	}
}
$created = 0;
$skipped = 0;
foreach ( $articles as $article ) {
	$existing = get_page_by_path( $article['slug'], OBJECT, 'post' );
	if ( $existing ) {
		printf( "Skipped existing article: %s (#%d)\n", $article['slug'], $existing->ID );
		++$skipped;
		continue;
	}
	$id = wp_insert_post(
		array(
			'post_type' => 'post',
			'post_status' => 'publish',
			'post_author' => $authors[0],
			'post_title' => $article['title'],
			'post_name' => $article['slug'],
			'post_excerpt' => $article['excerpt'],
			'post_content' => $article['content'],
			'comment_status' => 'closed',
		),
		true
	);
	if ( is_wp_error( $id ) ) {
		fwrite( STDERR, "Could not create {$article['slug']}: {$id->get_error_message()}\n" );
		exit( 1 );
	}
	printf( "Created article: %s (#%d)\n", $article['slug'], $id );
	++$created;
}
printf( "Import complete: %d created, %d already existed.\n", $created, $skipped );
