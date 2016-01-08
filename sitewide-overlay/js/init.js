var overlay = require( 'components/sitewide-overlay/js/main' );
var STRING  = require( 'components/sitewide-overlay/js/strings' );

/* It is necessary to fire immediately when the overlay has priority over the rest of the page */
overlay.init( STRING.selector.defaultId );