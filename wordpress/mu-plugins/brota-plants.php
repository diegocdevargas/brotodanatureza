<?php
/**
 * Plugin Name: Brota da Natureza - Plantas
 * Description: Registers the plants content type independently of the active theme.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_filter(
	'acf/settings/load_json',
	static function ( $paths ) {
		$paths[] = __DIR__ . '/acf-json';
		return $paths;
	}
);

add_action(
	'init',
	static function () {
		register_post_type(
			'plants',
			array(
				'labels' => array(
					'name'                  => 'Plantas',
					'singular_name'         => 'Planta',
					'menu_name'             => 'Plantas',
					'name_admin_bar'        => 'Planta',
					'add_new'               => 'Adicionar nova',
					'add_new_item'          => 'Adicionar nova planta',
					'edit_item'             => 'Editar planta',
					'new_item'              => 'Nova planta',
					'view_item'             => 'Ver planta',
					'view_items'            => 'Ver plantas',
					'search_items'          => 'Buscar plantas',
					'not_found'             => 'Nenhuma planta encontrada.',
					'not_found_in_trash'    => 'Nenhuma planta na lixeira.',
					'all_items'             => 'Todas as plantas',
					'archives'              => 'Arquivo de plantas',
					'attributes'            => 'Atributos da planta',
					'insert_into_item'      => 'Inserir na planta',
					'uploaded_to_this_item' => 'Enviado para esta planta',
					'filter_items_list'     => 'Filtrar lista de plantas',
					'items_list_navigation' => 'Navegação da lista de plantas',
					'items_list'            => 'Lista de plantas',
				),
				'public'              => true,
				'publicly_queryable'  => true,
				'exclude_from_search' => false,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_rest'        => true,
				'rest_base'           => 'plants',
				'query_var'           => true,
				'rewrite'             => array(
					'slug'       => 'plants',
					'with_front' => false,
				),
				'has_archive'         => false,
				'menu_icon'           => 'dashicons-leaf',
				'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
				'capability_type'     => 'post',
				'map_meta_cap'        => true,
			)
		);
	},
	0
);

add_filter(
	'rest_plants_collection_params',
	static function ( $params ) {
		$params['plant_search'] = array(
			'description'       => 'Search plant names and ACF information.',
			'type'              => 'string',
			'maxLength'         => 100,
			'sanitize_callback' => 'sanitize_text_field',
		);
		$params['plant_category'] = array(
			'description'       => 'Filter plants by their ACF category.',
			'type'              => 'string',
			'enum'              => array(
				'digestiva',
				'calmante',
				'anti-inflamatória',
				'imunológica',
				'circulatória',
				'respiratória',
				'outros',
			),
			'sanitize_callback' => 'sanitize_text_field',
		);

		return $params;
	}
);

add_filter(
	'rest_plants_query',
	static function ( $args, $request ) {
		$search = trim( (string) $request->get_param( 'plant_search' ) );
		if ( '' !== $search ) {
			$args['s']                    = $search;
			$args['brota_plant_search']   = $search;
		}

		$category = $request->get_param( 'plant_category' );
		if ( $category ) {
			$args['meta_query'][] = array(
				'key'     => 'category',
				'value'   => $category,
				'compare' => '=',
			);
		}

		return $args;
	},
	10,
	2
);

add_filter(
	'posts_search',
	static function ( $search_sql, $query ) {
		global $wpdb;

		$search = $query->get( 'brota_plant_search' );
		if ( ! $search ) {
			return $search_sql;
		}

		$meta_keys = array(
			'popular_name',
			'scientific_name',
			'medicinal_uses',
			'preparation_method',
			'used_parts',
			'contraindications',
		);
		$meta_key_placeholders = implode( ', ', array_fill( 0, count( $meta_keys ), '%s' ) );
		$like                  = '%' . $wpdb->esc_like( $search ) . '%';
		$sql                   = "({$wpdb->posts}.post_title LIKE %s OR {$wpdb->posts}.post_content LIKE %s OR {$wpdb->posts}.post_excerpt LIKE %s"
			. " OR EXISTS (SELECT 1 FROM {$wpdb->postmeta} AS brota_plant_search_meta"
			. " WHERE brota_plant_search_meta.post_id = {$wpdb->posts}.ID"
			. " AND brota_plant_search_meta.meta_key IN ({$meta_key_placeholders})"
			. ' AND brota_plant_search_meta.meta_value LIKE %s))';
		$values                = array_merge( array_fill( 0, 3, $like ), $meta_keys, array( $like ) );

		return ' AND ' . $wpdb->prepare( $sql, ...$values );
	},
	10,
	2
);

add_action(
	'admin_notices',
	static function () {
		if ( ! function_exists( 'acf_get_field_groups' ) ) {
			echo '<div class="notice notice-error"><p>';
			echo esc_html( 'O plugin Advanced Custom Fields precisa estar ativo para editar os campos das plantas.' );
			echo '</p></div>';
		}
	}
);
