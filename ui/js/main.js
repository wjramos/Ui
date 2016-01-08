'use strict';

import componentInit from './init';

/* UI Components */
import Timer from 'components/countdown-timer/js/main';
import Counter from 'components/counter/js/main';
import ProductGrid from 'components/product-grid/js/main';
import SitewideOverlay from 'components/sitewide-overlay/js/main';

/* Bundle */
const components = [ Timer, Counter, ProductGrid, SitewideOverlay ];

/* Initiate */
function init( ) {
    let i;
    for ( i = 0; i < components.length; i++ ) {
        componentInit( components[ i ], '.js-' + components[ i ].name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase( ) );
    }
}

/* Init on call */
module.exports.init = init;