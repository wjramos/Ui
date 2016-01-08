'use strict';

export {
    data          : { shown: 'data-shown' },
    viewOverlay   : { interstitialModal: true },
    viewNoOverlay : { interstitialModal: false },
    style         : { opacity   : '.85' },
    cookieName    : 'seenCampaign',
    selector      : {
        defaultId     : document.getElementById( 'sitewide-overlay' ),
        backdrop      : '.backdrop',
        closeTriggers : '.backdrop, .close, .close-overlay'
    },
    effect        : {
        hidden    : 'hidden',
        blur      : 'blur',
        appear    : 'appear',
        fadeOut   : 'fade out',
        fadeIn    : 'fade in',
        backdrop  : 'blur fade in appear'
    },
    event         : {
        domReady  : 'DOMContentLoaded',
        click     : 'click'
    }
};
