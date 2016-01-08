'use strict';

export {
    data          : { shown: 'data-shown' },
    viewOverlay   : { interstitialModal: true },
    viewNoOverlay : { interstitialModal: false },
    style         : { opacity   : '.85' },
    cookieName    : 'seenCampaign',
    selector      : {
        defaultId     : document.getElementById( 'sitewide-overlay' ),
        closeTriggers : '.backdrop, .close, .close-overlay'
    },
    effect        : {
        fadeOut   : 'fade out',
        fadeIn    : 'fade in',
        backdrop  : 'blur appear'
    },
    event         : {
        domReady  : 'DOMContentLoaded',
        click     : 'click'
    }
};
