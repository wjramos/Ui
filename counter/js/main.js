'use strict';

import util from '../../ui/js/utils';
import STRING from './strings';

class Counter {
    constructor ( element ) {
        this.element   = element;
        this.counter   = null; // The count timer
        this.heartbeat = null; // The update interval
        this.badCalls  = 0;
        this.settings  = {
            property : element.hasAttribute( STRING.data.countProperty ) ? element.getAttribute( STRING.data.countProperty ) : 'total',
            endpoint : element.hasAttribute( STRING.data.endpoint ) ? element.getAttribute( STRING.data.endpoint ) : null,
            speed    : element.hasAttribute( STRING.data.countProperty ) ? element.getAttribute( STRING.data.countProperty ) : 8000,
            update   : element.hasAttribute( STRING.data.countProperty ) ? element.getAttribute( STRING.data.countProperty ) : 15000
        };

        this.count = {
            current : 0,
            updated : 0
        };

        this.init( );
    }

    /* Initiate the counter */
    init ( ) {

        /* Get configuration from html data attributes */
        this.getSettings( );

        /* Get initial count */
        this.update( );

        /* Regularly polls for new data */
        this.heartbeat = setInterval(
            ( ) => {
                this.update( );
            },
            this.settings.update
        );
    }

    /* Get settings from data attributes */
    getSettings ( ) {
        let settings = this.settings;

        if ( typeof settings.count === 'string') {
            settings.update = util.parseToMs( settings.count );
        }

        if ( typeof settings.update === 'string') {
            settings.update = util.parseToMs( settings.update );
        }
    }

    /* Update the counter */
    update ( ) {

        const settings = this.settings;
        let count      = this.count;

        /* Clear previous counter */
        clearInterval( this.counter );

        /* Only get data if it has been able to find it */
        if ( this.badCalls < 3 ) {

            /* Get data and update count */
            util.getData(
                settings.endpoint,
                ( newCount ) => {

                    /* Request returned a number */
                    if ( newCount && typeof newCount === 'number' ) {

                        /* Reset consecutive bad call count */
                        this.badCalls = 0;

                        if ( count.current === 0 && newCount > 0 ) {
                            this.setInitial( newCount );
                        }

                        /* Update the count if the new count is larger */
                        if ( count.current < newCount ) {

                            count.updated = parseInt( newCount );
                        }

                        /* It will be one off by the end of the interval - the interval will continue indefinitely
                         * if we use gt,eq so we need to adjust */
                         if ( count.updated - count.current === 1 ) {
                            count.current++;
                        }

                    } else {

                        /* There was some kind of error, or response was not a number */
                        this.badCalls++;
                    }

                    /* Animate count */
                    this.animate( );
                },
                settings.property
            );

        } else {

            /* Kill heartbeat if bad call threshold met */
            clearInterval( this.heartbeat );
        }
    }

    /* Set incremental counter */
    animate ( ) {
        const count    = this.count;
        const settings = this.settings;
        let counter    = this.counter;

        if ( count.current < count.updated ) {

            counter = setInterval(
                function( ) {
                    this.increment( );
                },

                /* Take the entire count duration */
                settings.speed / ( count.updated - count.current )
            );
        }
    }

    /* Increase count */
    increment ( ) {
        let counter = this.counter;
        let count   = this.count;

        /* Increment until new count has been met */
        if ( count.current < count.updated ) {
            count.current = count.current + util.getRandomInRange( 1, Math.min( count.updated - count.current, 5 ) );

            this.display( );

        } else {
            clearInterval( counter );
        }
    }

    /* Show the count */
    display ( ) {
        let element = this.element;

        if ( element.style.visibility === 'hidden' ) {
            element.style.visibility = 'visible';
        }

        element.innerHTML = util.formatNumber( this.count.current );
    }

    /* Set the number to initially display */
    setInitial ( initialCount ) {
        let count = this.count;

        /* Initial count view */
        count.updated = count.current = initialCount;

        this.display( );
    }
}

export { Counter };
