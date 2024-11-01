/**
 * ywarc-admin.js
 *
 * @author Your Inspiration Themes
 * @version 1.0.0
 */
 
jQuery(document).ready( function($) {
    "use strict";

    var new_rules       = $( document ).find( '.ywarc_new_rules' ),
        rules_group     = $( document ).find( '.ywarc_rules_group' ),
        add_rule     = $( '#yith_ywarc_add_rule_button' ),
        new_rule_title  = $( '.ywarc_new_rule_title' ),
        creating_rule = $( '.ywarc_creating_rule' );


    new_rule_title.focus();
    new_rule_title.keydown( function( event ){
        if( event.which == 13){
            add_rule.focus();
            add_rule.trigger( 'click' );
        }
    });

    add_rule.on( 'click', function( e ) {
        e.preventDefault();

        var title = new_rule_title.val().trim();
        var titles_array = [];
        new_rules.find( '.rule_title' ).each( function () {
            titles_array.push( $( this ).text() );
        });
        if ( $.inArray( title, titles_array ) != '-1' ) {
            alert( localize_js_ywarc_admin.duplicated_name_msg );
            new_rule_title.val( '' );
            new_rule_title.focus();
        } else if ( title == '' ) {
            alert( localize_js_ywarc_admin.empty_name_msg );
            new_rule_title.focus();
        } else {
            creating_rule.block( { message: null, overlayCSS:{ background: "#f1f1f1", opacity: .6 } } );
            $.post( localize_js_ywarc_admin.ajax_url, { action: 'ywarc_add_rule', title: title }, function( resp ) {
                creating_rule.unblock();
                new_rule_title.val( '' );
                if ( resp === 'duplicated_name_error' ) {
                    alert( localize_js_ywarc_admin.duplicated_name_msg );
                    new_rule_title.focus();
                } else {
                    instantiate_rule_block( resp, true );
                }
            });
        }
    });

    $( '.rule_block' ).each( function( index, element ) {
        instantiate_rule_block( element, false );
    });
    
    $( '#show_all_rules' ).on( 'click', function ( e ) {
        e.preventDefault();
        rules_group.find( '.rule_options' ).slideDown();
    });

    $( '#hide_all_rules' ).on( 'click', function ( e ) {
        e.preventDefault();
        rules_group.find( '.rule_options' ).slideUp();
    });

    $( '#delete_all_rules' ).on( 'click', function ( e ) {
        e.preventDefault();
        var message = confirm( localize_js_ywarc_admin.delete_all_rules_msg );
        if ( message == true ) {
            creating_rule.block( { message: null, overlayCSS:{ background: "#f1f1f1", opacity: .6 } } );
            $.post( localize_js_ywarc_admin.ajax_url, { 'action': 'ywarc_delete_all_rules' }, function( resp ) {
                creating_rule.unblock();
                rules_group.find( '.rule_block' ).remove();
                $( '#my_rules_header' ).addClass( 'no_rules' );
            });
        }
        check_new_rules_block();
    } );


    function instantiate_rule_block( element, is_new_rule ) {
        var rule_block = $( element );

        var rule_id = rule_block.data( 'rule_id' );

        var rule_head = rule_block.find( '.rule_head' ),
            rule_options = rule_block.find( '.rule_options' ),
            title = rule_head.find( 'label.rule_title' ).text();

        if ( is_new_rule ) {
            new_rules.append( rule_block );
            rule_options.show();
            check_new_rules_block();
        }

        rule_head.on( 'click', function( event ){
            rule_options.slideToggle();
        });

        // Re-initialize all tooltips
        rule_block.trigger( 'init_tooltips' );

        //////////////// LOCALIZING BLOCKS ////////////////

        var rule_type_block = rule_options.find( 'div.rule_type_block' );

        var role_selector_block = rule_options.find( 'div.role_selector_block' );
        role_selector_block.hide();

        var replace_role_block = rule_options.find( 'div.replace_role_block' );
        replace_role_block.hide();

        var specific_product_block = rule_options.find( 'div.specific_product_block' );
        specific_product_block.hide();

        var submit_block = rule_options.find( 'div.submit_block' );


        //////////////// REMOVE EMPTY FIELD CLASS ////////////////

        var remove_empty_field_class = function ( target ) {
            if ( 'role_selector' == target || 'all' == target ) {
                role_selector_block.removeClass( 'empty_field' );
            }
            if ( 'product_selector' == target || 'all' == target ) {
                specific_product_block.removeClass( 'empty_field' );
            }
        };

        //////////////// RADIO GROUPS ////////////////

        rule_options.find( 'input.ywarc_rule_type_radio_button' ).change( function () {
            var radio = rule_options.find( 'input.ywarc_rule_type_radio_button:checked' );
            if ( radio.val() == 'add' ) {
                replace_role_block.hide();
                role_selector_block.slideDown();
                specific_product_block.slideDown();
            } else if ( radio.val() == 'replace' ) {
                replace_role_block.slideDown();
                role_selector_block.hide();
                specific_product_block.slideDown();
            }
        } ).change();


        //////////////// SELECT2 ////////////////
        var select2_role_selector_args;
        if ( localize_js_ywarc_admin.before_2_7 ) {
            select2_role_selector_args = {
                maximumSelectionSize: 1
            };
        } else {
            select2_role_selector_args = {
                maximumSelectionLength: 1
            };
        }
        rule_options.find( '.ywarc_role_selector, .ywarc_replace_role_before, .ywarc_replace_role_after' ).select2( select2_role_selector_args ).on( 'change', function () {
            remove_empty_field_class( 'role_selector' )
        } );

        $( document.body ).trigger( 'wc-enhanced-select-init' );
        $( ':input.wc-product-search' ).on( 'change', function () {
            remove_empty_field_class( 'product_selector' )
        } );


        //////////////// SAVE DATA ////////////////

        var submit_button = submit_block.find( 'input' );

        submit_button.on( 'click', function( event ){
            event.preventDefault();
            rule_block.block( { message: null, overlayCSS:{ background: "#fff", opacity: .6 } } );


            var rule_type = rule_type_block.find( 'input.ywarc_rule_type_radio_button:checked' ).val(),
                role_selected = role_selector_block.find( 'select.ywarc_role_selector' ).val(),
                replace_roles_before = replace_role_block.find( 'select.ywarc_replace_role_before' ).val(),
                replace_roles_after = replace_role_block.find( 'select.ywarc_replace_role_after' ).val(),
                product_selected = specific_product_block.find( ':input[id^="ywarc_product_selector"]' ).val();


            ///// CHECK FOR EMPTY FIELDS /////

            var fields_filled = true;

            if ( 'add' === rule_type ) {
                if ( ! role_selected ) {
                    fields_filled = false;
                    role_selector_block.addClass( 'empty_field' );
                }
            } else if ( 'replace' === rule_type ) {
                if ( ! replace_roles_before || ! replace_roles_after ) {
                    fields_filled = false;
                    replace_role_block.addClass( 'empty_field' );
                }
            } else {
                fields_filled = false;
                rule_type_block.addClass( 'empty_field' );
            }

            if ( ! product_selected ) {
                fields_filled = false;
                specific_product_block.addClass( 'empty_field' );
            }

            
            if ( fields_filled ) {

                var data = {
                    'action': 'ywarc_save_rule',
                    'title': title,
                    'rule_id': rule_id,
                    'rule_type': rule_type,
                    'role_selected': role_selected,
                    'replace_roles': replace_roles_before && replace_roles_after ? [replace_roles_before, replace_roles_after] : '',
                    'product_selected':  product_selected
                };

                $.post( localize_js_ywarc_admin.ajax_url, data, function( resp ) {
                    rule_block.unblock();
                    if ( is_new_rule ) {
                        rules_group.append( rule_block );
                        rule_options.hide();
                        is_new_rule = false;
                    }
                    if ( rules_group.find( '.rule_block' ).length > 0  ) {
                        $( '#my_rules_header' ).removeClass( 'no_rules' );
                    }
                    check_new_rules_block();
                });
            } else {
                rule_block.unblock();
            }

            check_new_rules_block();
        });


        //////////////// DELETE DATA ////////////////

        var deleteButton = submit_block.find( 'a.delete_rule' );

        deleteButton.on( 'click', function( event ){
            event.preventDefault();
            var message = confirm( localize_js_ywarc_admin.delete_rule_msg );
            if ( message == true ) {
                if ( is_new_rule ) {
                    rule_block.remove();
                } else {
                    rule_block.block( { message: null, overlayCSS:{ background: "#fff", opacity: .6 } } );
                    var data = {
                        'action': 'ywarc_delete_rule',
                        'rule_id': rule_id
                    };
                    $.post( localize_js_ywarc_admin.ajax_url, data, function( resp ) {
                        rule_block.unblock();
                        rule_block.remove();
                        if ( rules_group.find( '.rule_block' ).length == 0  ) {
                            $( '#my_rules_header' ).addClass( 'no_rules' );
                        }
                    });
                }
                if ( rules_group.find( '.rule_block' ).length == 0  ) {
                    $( '#my_rules_header' ).addClass( 'no_rules' );
                }

            }
            check_new_rules_block();
            
        });

        //////////////// END OF FUNCTION ////////////////

    }

    function check_new_rules_block() {
        if ( new_rules.find( '.rule_block' ).length > 0 ) {
            $( '#ywarc_new_rules_row' ).removeClass( 'no_rules' );
        } else {
            $( '#ywarc_new_rules_row' ).addClass( 'no_rules' );
        }
    }

});