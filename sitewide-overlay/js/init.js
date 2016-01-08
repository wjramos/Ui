import Overlay from './main';
import STRING from './strings';

/* It is necessary to fire immediately when the overlay has priority over the rest of the page */
Overlay.init( STRING.selector.defaultId );
