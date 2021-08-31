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

        // automatically load dependencies and version
        $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

        wp_register_script(
            'build/index.js',
            plugins_url( 'build/index.js', __FILE__ ),
            $asset_file['dependencies'],
            $asset_file['version']
        );

        register_block_type('namespace/name', array(
            'api_version' => 2,
<<<<<<< HEAD
            'editor_script' => 'build/index.js'
=======
            'editor_script' => 'build/index.js',
>>>>>>> 7120f32b273df5e0752d875a2bf4c638e29f27b5
        ));

    }

    add_action( 'init', 'my_register_block_types' );
?>
