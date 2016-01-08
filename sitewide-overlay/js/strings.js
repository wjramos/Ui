module.exports = {
    data          : { shown: 'data-shown' },
    viewOverlay   : { interstitialModal: true },
    viewNoOverlay : { interstitialModal: false },
    style         : { opacity   : '.85' },
    cookieName    : 'seenCampaign',
    selector      : {
        defaultId     : 'sitewide-overlay',
        backdrop      : '.backdrop',
        closeTriggers : '.backdrop, .close, .close-overlay'
    },
    effect        : {
        hidden    : 'hidden',
        blur      : 'blur',
        appear    : 'appear',
        fadeOut   : 'fade out',
        fadeIn    : 'fade in'
    },
    event         : {
        domReady  : 'DOMContentLoaded',
        click     : 'click'
    }
}