<?php
    /*
     * Plugin Name: WordPress Blocks
     * Author: Ayo Reis
     * Author URI: //ayoreis.com/
     * Version 1.0.0
     */

    function my_enqueue_scripts() {
        wp_enqueue_script('script.js',)
    }

    add_action('wp_enqueue_scripts', 'my_enqueue_scripts')
?>
