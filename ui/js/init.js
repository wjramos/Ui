'use strict';

import { win } from 'rei-browser-shim';
import { eachElem } from './utils';

/**
 * Initiates a component for each element of a given selector
 *
 * @param { function }     Component The constructor function for a component
 * @param { string/array } selector  The selector to instanciate a component on
 * @return Returns an array of constructor objects
 */
function init( Component, selector ) {
    let components = [];

    eachElem(
        win.document.querySelectorAll( selector ),
        ( element ) => {
            components.push( new Component( element ) );
        }
    );

    return components;
};

export { init };
