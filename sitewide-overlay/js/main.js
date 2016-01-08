'use strict';

var log = require( 'packages/logger' )();

var util      = require( '../../ui/js/utils' );
var STRING      = require( './strings' );

var showOverlay;

/**
 * Initiates interstital overlay if cookie is not present, and visitor is not a crawler
 *
 * @param { string } id The interstitial's id
 */
var init = function ( id ) {
    var overlay   = window.document.getElementById( id );
    var isCrawler = util.isCrawler();
    var hasCookie = util.hasCookie( STRING.cookieName );

    if ( !isCrawler && !hasCookie ) {
        showOverlay = true;
        util.setCookie( STRING.cookieName, true, 1 );

    } else {

        showOverlay = false;
    }

    /* Console status */
    log.info( showOverlay ? 'Should show Overlay.' : 'Should NOT show overlay.' );

    if ( isCrawler ) {
        log.info( 'User is search crawler.')
    }
    if ( hasCookie ) {
        log.info( 'User has cookie set.')
    }

    /* Display or remove overlay */
    showOverlay ? show( overlay ) : util.removeNode( overlay );
};

/**
 * Shows or removes element based on condition
 *
 * @param { element } overlay The overlay element
 * @param { boolean } show    T/F to show the overlay
 */
var show = function ( overlay ) {

    var backgroundEffects = [ STRING.effect.fadeIn, STRING.effect.blur, STRING.effect.appear ];

    /* Set data attribute for page view metrics */
    overlay.setAttribute( STRING.data.shown, true );

    /* Set up media */
    util.mediaSourceSwap( overlay );

    /* Bind sub-elements with close events */
    util.bindChildren( overlay, STRING.selector.closeTriggers, STRING.event.click,
        function( ) {

            util.addClass( elem, STRING.effect.fadeOut );
            util.getSiblings( overlay ).removeClass( backgroundEffects );

            setTimeout(
                function( ) {
                    util.removeNode( elem );
                },
                util.getTransition( elem )
            );
        }
    )

    /* Add visual effect to background sibling elements */
    util.domReady( util.addClass( siblings, backgroundEffects ) );

    /* Display the Overlay */
    util.removeClass( overlay, STRING.effect.hidden );
    util.addClass( overlay, STRING.effect.fadeIn );
};

module.exports = {
    init        : init,
    showOverlay : showOverlay
};
