'use strict';

import util from '../../ui/js/utils';
import STRING from './strings';

class Timer{
    constructor ( element ) {
        this.element = element;
        this.remaining = null;
        this.countdown = null;
        this.settings = {
            end: element.hasAttribute( STRING.data.end ) ? element.getAttribute( STRING.data.end ) : new Date( ),
            display: null,
            endMessage: element.hasAttribute( STRING.data.endMessage ) ? element.getAttribute( STRING.data.endMessage ) : '',
            utcOffset: element.hasAttribute( STRING.data.utcOffset ) ? parseInt( element.getAttribute( STRING.data.utcOffset ) ) : ( util.isDST( ) ? 7 : 8 )
        };

        this.init( );
    }

    init ( ) {
        const element = this.element;
        let settings = this.settings;

        element.style.visibility = 'hidden'; // Do not display until populated

        if ( settings.end && settings.utcOffset ) {
            settings.display = element.innerHTML;
            this.countdown = setInterval(
                ( ) => {
                    this.update( );
                },
                1000
            );
        }

        return this;
    }

    update ( ) {
        this.remaining = util.getTimeUntil( this.settings.end, this.settings.utcOffset );
        this.display( );

        return this;
    }

    display ( ) {
        let element = this.element;

        element.innerHTML = this.buildDisplay( );

        if ( element.style.visibility === 'hidden' ) {
            element.style.visibility = 'initial';
        }

        /* Current datetime is past end datetime */
        if ( this.remaining.total <= 0 ) {
            clearInterval( this.countdown );
        }
    }

    replaceCount ( countString ) {
        const remaining = this.remaining;
        const unitsRegex = /{\s*?(SECONDS?|HOURS?|MINUTES?)\s*?}/ig;

        if ( remaining.days < 1 && countString.search( unitsRegex ) ) {
            return util.stripPlurals( countString.replace( /{\s*?DAYS?\s*?}/ig, 'Last' ) );
        } else {
            return countString
                .replace( /{\s*?DAYS?\s*?}/ig, remaining.days.toString( ) )
                .replace( /{\s*?HOURS?\s*?}/ig, util.twoDigitFormat( remaining.hours ) )
                .replace( /{\s*?MINUTES?\s*?}/ig, util.twoDigitFormat( remaining.minutes ) )
                .replace( /{\s*?SECONDS?\s*?}/ig, util.twoDigitFormat( remaining.seconds ) )
                .replace( /{\s*?DATE?\s*?}/ig, new Date( this.settings.end ).toDateString( ) );
        }
    }

    buildDisplay ( ) {

        /* Current datetime is past end datetime */
        if ( this.remaining.total > 0 ) {

            /* Substitute number values into label */
            return this.replaceCount( this.settings.display );

        } else {

            /* Display End */
            return this.settings.endMessage;
        }
    }
}

export { Timer };
