'use strict';

import util from '../../ui/js/utils';
import STRING from './strings';
import logger from 'packages/logger';
const log = logger( );

class Overlay {
    constructor ( element ) {
        this.showOverlay = false;

    }

    init (  ) {
        const isCrawler = util.isCrawler();
        const hasCookie = util.hasCookie( STRING.cookieName );

        this.element.style.visibility = 'hidden';

        if ( !isCrawler && !hasCookie ) {
            this.showOverlay = true;
            util.setCookie( STRING.cookieName, true, 1 );
        }

        /* Console status */
        log.info( this.showOverlay ? 'Should show Overlay.' : 'Should NOT show overlay.' );

        if ( isCrawler ) {
            log.info( 'User is search crawler.');
        }
        if ( hasCookie ) {
            log.info( 'User has cookie set.');
        }

        /* Display or remove overlay */
        return this.showOverlay ? this.show( this.element ) : util.removeNode( this.element );
    }

    show ( ) {
        let element = this.element;

        /* Set data attribute for page view metrics */
        element.setAttribute( STRING.data.shown, true );

        /* Set up media */
        util.mediaSourceSwap( element );

        /* Bind sub-elements with close events */
        util.bindChildren(
            element,
            STRING.selector.closeTriggers,
            'click',
            ( ) => {

                util.addClass( element, 'fade out' );
                util.getSiblings( element ).removeClass( 'blur' );

                setTimeout(
                    ( ) => {
                        util.removeNode( element );
                    },
                    util.getTransition( element )
                );
            }
        );

        /* Add visual effect to background sibling elements */
        util.domReady(
            util.addClass(
                util.getSiblings( element ),
                [ 'blur','fade in' ]
            )
        );

        /* Display the Overlay */
        element.style.visibility = 'initial';
        util.addClass( element, 'fade in' );
    }
}


export {
    Overlay
};
