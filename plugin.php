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
            plugins_url( 'build/index.js', __FILE__ ), //plugin dir path
            array('wp-blocks', 'wp-editor', 'wp-components')
        );

        wp_register_style(
            'styles.css',
            plugins_url('/styles.css', __FILE__),
            array(),
        );

        register_block_type('namespace/name', array(
            'api_version' => 2,
            'editor_script' => 'build/index.js',
            // editor style too
            // 'style' => 'styles.css'
        ));
    }

    add_action('init', 'my_register_block_types');

?>
