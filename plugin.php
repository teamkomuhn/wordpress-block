<?php
    /*
     * Plugin Name: WordPress Blocks
     * Description: A simple WordPress Plugin to create a simple custom Gutenberg Block.
     * Author: Ayo Reis
     * Author URI: //ayoreis.com/
     * Version 1.0.0
     * Requires at least: 5.0.0
     */

    function my_enqueue_scripts() {
        // See the meaning of each attribute of the wp_enqueue_script() function here: https://developer.wordpress.org/reference/functions/wp_enqueue_script/
        wp_enqueue_script('script.js', plugin_dir_url(__FILE__) . 'script.js', array('wp-blocks', 'wp-i18n', 'wp-editor'), true);
    }

    add_action('wp_enqueue_scripts', 'my_enqueue_scripts');
?>
