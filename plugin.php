<?php
    /*
     * Plugin Name: WordPress Blocks
     * Description: A simple WordPress Plugin to create a simple custom Gutenberg Block.
     * Author: Ayo Reis
     * Author URI: //ayoreis.com/
     * Version 1.0.0
     * Requires at least: 5.0.0
     */



    function my_register_block_types() {

        wp_register_script(
            'build/index.js',
            plugins_url( 'build/index.js', __FILE__ ),
            array('wp-blocks', 'wp-editor', 'wp-components')
        );

        register_block_type('namespace/name', array(
            'api_version' => 2,
            'editor_script' => 'build/index.js'
        ));
    }

    add_action('init', 'my_register_block_types');

?>
