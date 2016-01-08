'use strict';

var uiUtil = require( '../../ui/js/utils' );
var STRING = require( './strings' );

function Counter( element ) {
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
};

/* Initiate the counter */
Counter.prototype.init = function( ) {
    var _this    = this;
    var settings = _this.settings;

    // Get configuration from html data attributes
    _this.getSettings( );

    // Get initial count
    _this.update( );

    // Regularly polls for new data
    _this.heartbeat = setInterval(
        function( ) {
            _this.update( );
        },
        settings.update
    );
};

/* Get settings from data attributes */
Counter.prototype.getSettings = function ( ) {
    var settings      = this.settings;

    if ( typeof settings.count === 'string') {
        settings.update = uiUtil.parseToMs( settings.count );
    }

    if ( typeof settings.update === 'string') {
        settings.update = uiUtil.parseToMs( settings.update );
    }
};

/* Update the counter */
Counter.prototype.update = function ( ) {
    var _this    = this;
    var settings = _this.settings;
    var count    = _this.count;
    var badCalls = _this.badCalls;

    /* Clear previous counter */
    clearInterval( _this.counter );

    /* Only get data if it has been able to find it */
    if ( badCalls < 3 ) {

        /* Get data and update count */
        uiUtil.getData(
            settings.endpoint,
            function( newCount ) {

                /* Request returned a number */
                if ( newCount && typeof newCount === 'number' ) {

                    /* Reset consecutive bad call count */
                    _this.badCalls = 0;

                    if ( count.current === 0 && newCount > 0 ) {
                        _this.setInitial( newCount );
                    }

                    /* Update the count if the new count is larger */
                    if ( count.current < newCount ) {

                        count.updated = parseInt( newCount );
                    }

                    /* It will be one off by the end of the interval - the interval will continue indefinitely
                     *  if we use gt,eq so we need to adjust
                     */
                     if ( count.updated - count.current === 1 ) {
                        count.current++;
                    }

                } else {

                    /* There was some kind of error, or response was not a number */
                    _this.badCalls++;
                }

                /* Animate count */
                _this.animate( );
            },
            settings.property
        );

    } else {

        /* Kill heartbeat if bad call threshold met */
        clearInterval( _this.heartbeat );
    }
};

/* Set incremental counter */
Counter.prototype.animate = function ( ) {
    var _this    = this;
    var count    = _this.count;
    var settings = _this.settings;

    if ( count.current < count.updated ) {

        _this.counter = setInterval(
            function( ) {
                _this.increment( );
            },

            /* Take the entire count duration */
            settings.speed / ( count.updated - count.current )
        );
    }
};

/* Increase count */
Counter.prototype.increment = function ( ) {
    var _this   = this;
    var count   = _this.count;

    /* Increment until new count has been met */
    if ( count.current < count.updated ) {
        count.current = count.current + uiUtil.getRandomInRange( 1, Math.min( count.updated - count.current, 5 ) );

        _this.display( );

    } else {
        clearInterval( _this.counter );
    }
};

/* Show the count */
Counter.prototype.display = function ( ) {
    var _this   = this;
    var element = _this.element;
    var count   = _this.count;

    if ( element.style.visibility = 'hidden' ) {
        element.style.visibility = 'visible';
    }

    element.innerHTML = uiUtil.formatNumber( count.current );
};

/* Set the number to initially display */
Counter.prototype.setInitial = function ( initialCount ) {
    var _this   = this;

    /* Initial count view */
    _this.count.updated = _this.count.current = initialCount;

    _this.display( );
};

module.exports = Counter;
