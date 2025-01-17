<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

?>

<table class="form-table">
	<tbody>
	<tr>
		<td>
			<p>
				<i><?php _e( 'Here you can create and configure your own rules for automatic role switch.',
						'yith-automatic-role-changer-for-woocommerce');
					?></i>
			</p>
			<p>
				<i><?php _e( 'To start, click on "Add new rule", name your rule and set it up as you wish. ' .
						"Don't forget to save the settings when you're finished.",
						'yith-automatic-role-changer-for-woocommerce' );
					?></i>
			</p>
		</td>
	</tr>
	<tr>
		<td>
			<p>
				<input type="text" class="ywarc_new_rule_title" value=""
					   placeholder="<?php _e( 'Name the rule...', 'yith-automatic-role-changer-for-woocommerce' ) ?>"
				/>
				<a href="" id="yith_ywarc_add_rule_button"
				   class="button-secondary"><?php _e( 'Add new rule', 'yith-automatic-role-changer-for-woocommerce' ) ?></a>
				<span class="ywarc_creating_rule">&nbsp;</span>
			</p>
		</td>
	</tr>
	<?php do_action( 'ywarc_print_rules' ); ?>
	</tbody>
</table>