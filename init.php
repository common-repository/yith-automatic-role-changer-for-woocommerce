<?php
/*
Plugin Name: YITH Automatic Role Changer for WooCommerce
Plugin URI: http://yithemes.com/themes/plugins/yith-woocommerce-automatic-role-changer
Description: YITH Automatic Role Changer for WooCommerce
Author: YITHEMES
Text Domain: yith-automatic-role-changer-for-woocommerce
Version: 1.1.6
Author URI: http://yithemes.com/
WC requires at least: 3.0.0
WC tested up to: 3.3.1
*/

/*
 * This source file is subject to the GNU GENERAL PUBLIC LICENSE (GPL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.gnu.org/licenses/gpl-3.0.txt
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly


/* === DEFINE === */
! defined( 'YITH_WCARC_VERSION' ) && define( 'YITH_WCARC_VERSION', '1.1.6' );
! defined( 'YITH_WCARC_FREE_INIT' ) && define( 'YITH_WCARC_FREE_INIT', plugin_basename( __FILE__ ) );
! defined( 'YITH_WCARC_FILE' ) && define( 'YITH_WCARC_FILE', __FILE__ );
! defined( 'YITH_WCARC_PATH' ) && define( 'YITH_WCARC_PATH', plugin_dir_path( __FILE__ ) );
! defined( 'YITH_WCARC_URL' ) && define( 'YITH_WCARC_URL', plugins_url( '/', __FILE__ ) );
! defined( 'YITH_WCARC_ASSETS_URL' ) && define( 'YITH_WCARC_ASSETS_URL', YITH_WCARC_URL . 'assets/' );
! defined( 'YITH_WCARC_ASSETS_JS_URL' ) && define( 'YITH_WCARC_ASSETS_JS_URL', YITH_WCARC_URL . 'assets/js/' );
! defined( 'YITH_WCARC_TEMPLATE_PATH' ) && define( 'YITH_WCARC_TEMPLATE_PATH', YITH_WCARC_PATH . 'templates/' );
! defined( 'YITH_WCARC_WC_TEMPLATE_PATH' ) && define( 'YITH_WCARC_WC_TEMPLATE_PATH', YITH_WCARC_PATH . 'templates/woocommerce/' );
! defined( 'YITH_WCARC_OPTIONS_PATH' ) && define( 'YITH_WCARC_OPTIONS_PATH', YITH_WCARC_PATH . 'plugin-options' );

require_once YITH_WCARC_PATH . '/functions.php';

/* Initialize */

yith_initialize_plugin_fw( plugin_dir_path( __FILE__ ) );

/* Plugin Framework Version Check */
yit_maybe_plugin_fw_loader( plugin_dir_path( __FILE__ ) );

/* Register the plugin when activated */
register_activation_hook( __FILE__, 'yith_plugin_registration_hook' );

/* Start the plugin on plugins_loaded */
add_action( 'plugins_loaded', 'yith_ywarc_install', 11 );
