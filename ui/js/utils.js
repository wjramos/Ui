'use strict';


/************************
 +  Data formatting
 * ********************/

/**
 * Splits string or array into array of individual words
 *
 * @param  { string/array } source Phrase/set of phrases to split
 * @return { array } Returns array of individual words
 */
function toWordArray( source ) {
    source = source.split( ' ' );
    let i;

    // Break up any classes that contain multiple
    for ( i = 0; i < source.length; i++ ) {
        if ( source[ i ].indexOf( ' ' ) > -1 ) {
            let multiple = source[ i ].split( ' ' );
            let j;

            // Remove index that contains multiple
            source.splice( i, 1 );

            for ( j = 0; j < multiple.length; j++ ) {
                source.push( multiple[ j ] );
            }
        }
    }

    return source;
}


/**
 * Rearranges the indexes in an array to be random
 *
 * @param  { Array } arr The array to randomize
 * @return { array } Returns array with its indexes in random order
 */
function randomizeArray( arr ) {
    let i;

    for ( i = arr.length; i; ) {
        let j = parseInt( Math.random( ) * i );
        let x = arr[ --i ];
        arr[ i ] = arr[ j ];
        arr[ j ] = x;
    }

    return arr;
}

/**
 * Formats number to string with commas for thousands
 *
 * @param  { number } number The number to format
 * @return { string } Returns string of number formatted to thousands
 */
function formatNumber( num ) {
    let formattedNum;

    if ( typeof num === 'string' ) {
        formattedNum= parseFloat( formattedNum.replace( /,/g, '' ) );
    }

    return formattedNum && typeof formattedNum === 'number' ? formattedNum.toString( ).replace( /\B(?=(\d{3})+(?!\d))/g, ',' ) : '';
}

/**
 * Formats number to string of price or price range
 *
 * @param  { Number } max The maximum price
 * @param  { Number } min The minimum price
 * @return { string } Returns string of number formatted as a price or price range
 */
function formatPrice( max, min ) {
    let maxPrice = parseFloat( max ).toFixed( 2 );
    let minPrice = parseFloat( min ).toFixed( 2 );

    if ( minPrice < maxPrice ) {
        return '$' + minPrice + '&nbsp;&#8209;&nbsp;$' + maxPrice;
    } else if ( ( maxPrice && !minPrice ) || maxPrice === minPrice ) {
            return '$' + maxPrice;
    } else if ( minPrice && !maxPrice ) {
        return '$' + minPrice;
    } else {
        return 'Unavailable';
    }
}


/**
 * Formats number to a two-digit number ( ex. 9 -> 09 )
 *
 * @param  { Number } number  Any number
 * @return { String } Returns 0 prefixed ( one-digit param ),
 *                    trimmed ( three-digit param ),
 *                    or same number ( two-digit param )
 *                    as string.
 */
function twoDigitFormat( num ) {
    return typeof num === 'number' ? ( '0' + num ).slice( -2 ) : false;
}


/**
 * Display words following numbers as singular if they end with 's' and preceding number is 1, 01, etc.
 *
 * @param  { String } str The string to parse
 * @return { String } Returns string with proper plurality for words following numbers
 */
function stripPlurals( str ) {
    return str.replace( /(\b(?:0*?1|LAST)(?:\s*?<.*?>\s*?)*?\s+?(?:\s*?<.*?>\s*?)*?\w+?)(s)\b/ig, '$1' );
}


/**
 * Parse string to JSON object, correctly handling invalid inputs and false positive inputs
 *
 * @param  { String } json The string to parse
 * @return { Object | false } Returns valid JSON object or false
 */
function parseToJson( json ) {
    try {
        const parsedJson = JSON.parse( json );
        return parsedJson && typeof parsedJson === 'object' && parsedJson !== null;
    }

    catch ( e ) { }

    return false;
}


/************************
 +  DOM Traversal
 * ********************/

/**
 * Element Iterations with callback
 *
 * @param    { element/nodeList } elems Elements to interate
 * @callback { function } func Callback function to perform on each element in set
 */
function eachElem( elems, callback ) {
    const elemList = elems.length ? elems : [ elems ];
    let i;

    for ( i = 0; i < elemList.length; i++ ) {
        callback( elems[ i ] );
    }
}


/**
 * Get element siblings
 *
 * @param  { element }  element The element to get the siblings of
 * @return { nodeList } returns an array list of node siblings
 */
function getSiblings( elem ) {

    return Array.prototype.filter.call(
        elem.parentNode.children,
        ( child ) =>{
            return child !== elem;
        }
    );
}




/************************
 +  DOM Manipulation
 * ********************/

/**
 * Removes selected node from DOM
 *
 * @param { element } elem The element to remove
 */
function removeNode( elem ) {
    elem.parentNode.removeChild( elem );
}


/**
 * Inserts a node after another node
 *
 * @param { element } elem       The element to insert
 * @param { Element } targetElem The new older sibling
 */
function insertAfter( elem, targetElem ) {
    targetElem.parentNode.insertBefore( elem, targetElem.nextSibling );
}



/************************
 +  Classes
 * ********************/

/**
 * Add a set of classes to an element
 *
 * @param { element/array } elements The elements to add classes to
 * @param { string/array }  classes  The classes to add
 */
function addClass( elems, classes ) {
    const classList = toWordArray( classes );

    // Iterate through elements
    eachElem(
        elems,
        ( elem ) => {
            if ( elem.classList ) {
                elem.classList.add.apply( elem.classList, classList );
            } else {
                let i;

                for ( i = 0; i < classList.length; i++ ) {
                    elem.className += ' ' + classList[ i ].join( ' ' );
                }
            }
        }
    );
}


/**
 * Remove a set of classes from a set of elements
 *
 * @param { nodeList }      elems The elements to remove classes from
 * @param { string/array }  classes The classes to remove
 */
function removeClass( elems, classes ) {
    const classList = toWordArray( classes );

    // Iterate through elements
    eachElem(
        elems,
        ( elem ) => {
            if ( elem.classList ) {
                elem.classList.remove.apply( elem.classList, classList );
            } else {
                elem.className = elem.className.split( ' ' ).filter(
                    ( className ) => {
                        return classList.indexOf( className ) < 0;
                    }
                ).join( ' ' );
            }
        }
    );
}


/**
 * Detects presence of a single class on a single element
 *
 * @param { node }   elem  The element to check whether it has a specific class
 * @param { string } class The class to check for
 */
function hasClass( elem, classStr ) {
    if ( elem.classList ) {
        return elem.classList.contains( classStr );
    } else {
        return ( ' ' + elem.className + ' ' ).replace( /[\t\r\n\f]/g, ' ' ).indexOf( ' ' + classStr + ' ' ) < 0;
    }
}


/**
 * Asynchronous function to check any number of elements for any number of classes, and do something with it
 *
 * @param { nodeList }      elems    The elements to check whether they have classes
 * @param { string/array }  classes  The classes to check for
 * @param { function }      callback The function that uses the result
 */
function hasClasses( elems, classes, callback ) {
    const classList = toWordArray( classes );

    // Iterate through elements
    eachElem(
        elems,
        ( elem ) => {
            let i;

            for ( i = 0; i < classList.length; i++ ) {

                // Break loop - return false
                if ( !hasClass( elem, classList[ i ] ) ) {
                    return callback( false );
                }
            }
        }
    );

    // If loop finishes, it means all classes are present
    return callback( true );
}




/************************
 +  Client Info
 * ********************/

/**
 * Checks if client is a version of IE, false if not IE
 *
 * @return { number / false } Returns number or false corresponding to IE version
 */
function getVersionIE( ) {
    var version = false;

    /* IE 10- */
    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
        if ( navigator.userAgent.indexOf( 'MSIE' ) > -1 ) {
            version = parseInt( navigator.userAgent.match( /MSIE ([\d.]+)/ )[ 1 ], 10 );
        }

        /* IE 11+ */
    } else if ( navigator.appName === 'Netscape' ) {
        if ( navigator.userAgent.indexOf( 'Trident' ) > -1 ) {
            version = parseInt( navigator.userAgent.match( /Trident\/7.0;.*rv:([\d.]+)/ )[ 1 ], 10 );
        } else if ( navigator.userAgent.indexOf( 'Edge' ) > -1 ) {
            version = parseInt( navigator.userAgent.match( /Edge\/([\d.]+)/ )[ 1 ], 10 );
        }
    }

    return version;
}


/**
 * Checks the computed style on the <body> element to see if the appropriate breakpoint element is showing.
 *
 * @return { String | null } String containing the value in the content property of the body:after element, if no win.getComputedStyle, returns null.
 */
function getBreakpoint( ) {
    if ( window.getComputedStyle ) {
        var contentString = window.getComputedStyle( document.body, ':after' ).getPropertyValue( 'content' );
        return contentString.replace( /\W/g, '' );
    }

    return null;
}


/**
 * Returns true if client user agent matches common search crawler patterns
 *
 * @return { bool } T/F for whether user agent matches search crawler pattern
 */
function isCrawler( ) {
    return navigator.userAgent.match( /bot|crawl|slurp|spider/i ) !== null;
}


/**
 * Checks a referrer or set or referrers against client's referrer
 *
 * @param { String / Array } referrers The set of referrers to check if present
 * @return { String / false } Returns matching domain if any
 */
function hasReferrer( ref ) {
    const referrer = document.referrer;
    const referrers = toWordArray( ref );
    let i;

    for ( i = 0; i < referrers.length; i++ ) {
        let refRegex = '^https?:\/\/([^\/]+\.)?' + referrers[ i ] + '(\/|$)';

        if ( referrer.match( new RegExp( refRegex, 'ig' ) ) ) {
            return referrers[ i ];
        }
    }

    return false;
}





/************************
 +  Cookies and Local Data
 * ********************/

/**
 * Sets a client cookie
 *
 * @param { string } param Description
 * @param { string } value The value of the cookie
 * @param { number } days  Days until the cookie should expire
 */
function setCookie( name, value, days ) {
    var expiration = new Date( );

    /* Set expiration to expire in X days from initial */
    expiration.setDate( expiration.getDate( ) + days );

    var cookieString = escape( value ) + ( ( days === null ) ? '' : ';expires=' + expiration.toUTCString( ) );

    document.cookie = name + '=' + cookieString + ';path=/;domain=' + window.location.hostname;
}

/**
 * Returns true if cookie is present with name
 *
 * @return { bool } T/F for whether cookie exists
 */
function hasCookie( name ) {
    return window.document.cookie.indexOf( name ) >= 0;
}





/************************
 +  Bootstrap Utils
 * ********************/

/**
 * Calculates best appropriate number of columns in a 12 column grid given number of items
 *
 * @param  { Number } items Description
 * @return { String } Returns a number between 1 and 12 that should best fit the number of items in a 12 column grid
 */
function calculateCols( items ) {
    return items % 12 === 0 ? 1
        :  items % 11 === 0
        || items % 10 === 0
        || items % 9  === 0
        || items % 8  === 0
        || items % 7  === 0
        || items % 6  === 0 ? 2
        :  items % 5  === 0
        || items % 4  === 0 ? 3
        :  items % 3  === 0 ? 4
        :  items % 2  === 0 ? 6
        :  12;
}


/**
 * Given a collection of items it will return a string of Bootstrap class names for columns at various breakpoints
 *
 * @param  { NodeList / Array } elems The collection of items to calculate sizes for
 * @param  { Number }           xs The desired column span for xs breakpoint
 * @param  { Number }           sm The desired column span for sm breakpoint
 * @param  { Number }           md The desired column span for md breakpoint
 * @return { String } Returns
 */
function getColumns( elems, xs = 12, sm = 6, md = 3 ) {
    const classes = {
        /* If even number of items, use desired count, else use 12 cols -- Assure specified columns fit cleanly */
        xs: 'col-xs-' + ( 12 / xs % 1 === 0 ? xs : calculateCols( elems.length ) ),
        sm: 'col-sm-' + ( 12 / sm % 1 === 0 ? sm : calculateCols( elems.length ) ),
        md: 'col-md-' + ( 12 / md % 1 === 0 ? md : calculateCols( elems.length ) )
    };
    let classList = '';
    let clss;

    for ( clss in classes ) {
        classList += ( classList.length ? ' ' : '' ) + classes[ clss ];
    }
    return classList;
}



/************************
 +  Events
 * ********************/

/**
 * Binds an event to an element
 *
 * @param  { element }  element The element to bind
 * @param  { string }   evnt    The event to bind
 * @param  { function } funct   The function to bind
 * @return { return }   Returns element method that binds function to event on the element
 */
function bindEvent( elem, evnt, funct ) {
    if ( elem.attachEvent ) {
        return elem.attachEvent( 'on' + evnt, funct );
    } else {
        return elem.addEventListener( evnt, funct, false );
    }
}


/**
 * Unbinds a handler of an element
 *
 * @param  { element }  element The element to unbind
 * @param  { string }   evnt    The handler to unbind
 * @return { return }   Returns element method that unbinds event on the element
 */
function unbindEvent( elem, evnt, funct ) {
    if ( elem.attachEvent ) {
        return elem.detachEvent( 'on' + evnt, funct );
    } else {
        return elem.removeEventListener( evnt, funct, false );
    }
}

/**
 * Binds triggers within element to act as close
 *
 * @param { element }      element  The parent element(s)
 * @param { string/array } children The child elements to bind event to
 * @param { string }       evnt     The event to bind
 * @param { function }     funct    The callback functino
 */
function bindChildren( elems, children, evnt, funct ) {
    eachElem(
        elems,
        ( elem ) => {
            let i;

            for ( i = 0; i < children.length; i++ ) {
                bindEvent(
                    elem.querySelectorAll( children[ i ] ),
                    evnt,
                    funct
                );
            }
        }
    );
}

/**
 * Binds an function to the loaded event on document
 *
 * @param  { Function } funct The function to bind
 */
function domReady( funct ) {
    bindEvent( window.document, 'DOMContentLoaded', funct );
}



/************************
 +  Data attributes
 * ********************/

/**
 * Sets an element's attribute from another attribute
 *
 * @param { element/nodeList } element The element(s) to set attributes of
 * @param { string }           srcAttrib The attribute to set source from
 * @param { string }           tarAttrib The attribute to set
 */
function copyAttrib( elems, srcAttrib, tarAttrib ) {
    eachElem(
        elems,
        ( elem ) => {
            if ( elem.hasAttribute( srcAttrib ) ) {
                elem.setAttribute( tarAttrib, elem.getAttribute( srcAttrib ) );
            }
        }
    );
}


/**
 * Sets an element's media (image or video) sources depending on breakpoint -- Prevents loading unnecessary resources
 *
 * @param { element/nodeList } elem The element containing the media
 */
function mediaSourceSwap( elem ) {

    const videos = elem.querySelectorAll( 'video' );
    const images = elem.querySelectorAll( 'img' );
    const breakpoint = getBreakpoint( );

    /* Add true src from data attribute to prevent unneeded partial load when not visible */
    if ( !!videos.length && ( ( breakpoint !== 'xs' && breakpoint !== 's' ) || !images.length ) ) {

        /* Load video assets if above small breakpoint */
        const sources = videos.querySelectorAll( 'source' );

        copyAttrib( videos, 'data-poster', 'poster' );
        copyAttrib( sources, 'data-src', 'src' );

        eachElem( videos,
            () => {
                this.load();
                this.play();
            }
        );

    } else if ( !!images.length ) {
        copyAttrib( images, 'data-src', 'src' );
    }
}




/************************
 +  Computed styles
 * ********************/

/**
 * Gets the transition duration property of an element in ms
 *
 * @param  { element } element The element to get transition property of
 * @return { return }  Returns a number, reflecting transition duration in ms
 */
function getTransition( element ) {
    const properties = [
        'transitionDuration',
        'WebkitTransitionDuration',
        'msTransitionDuration',
        'MozTransitionDuration',
        'OTransitionDuration'
    ];

    let property;
    while ( property === properties.shift( ) ) {
        let duration = getComputedStyle( element ).getPropertyValue( property );

        if ( typeof duration !== 'undefined' ) {
            return parseFloat( duration ) * 1000;
        }
    }

    return 0;
}




/************************
 +  Data Retrieval
 * ********************/

/**
 * Performs AJAX call to endpoint to retrieve an updated count
 *
 * @param { string }   endpoint An endpoint for at AJAX call
 * @param { function } callback Callback for the data
 * @param { string }   property (Optional) The data property to return
 * @callback Invokes callback function with new data. Returns value if property set
 *           or returns an object if unset
 */
function getData( endpoint, callback, property, cache ) {

    /* Response callbacks */
    function error( ) {
        callback( false );
    }

    function success( data ) {
        const jsonData = parseToJson( data );

        /* Success */
        callback( jsonData[ property ] || jsonData );
    }

    function request( endpoint, success, error ) {
        const hostname = window.location.hostname;
        const versionIE = getVersionIE( );
        let dataEndpoint;
        let crossDomain;

        /* Instruct jQuery to use crossOrigin */
        if ( endpoint.indexOf( hostname ) < 0 ) {
            crossDomain = true;
        }

        /* Add extra cache-busting */
        dataEndpoint = endpoint + ( ( /\?/ ).test( endpoint ) ? '&' : '?' ) + ( new Date( ) ).getTime( );

        if ( crossDomain === true && versionIE && versionIE < 10 && 'ActiveXObject' in window ) {

            /* IE8 & 9 only Cross domain JSON GET request */
            if ( 'XDomainRequest' in window && window.XDomainRequest !== null ) {

                const protocol = window.location.protocol;

                /* Requires data source to share the same protocol */
                if ( dataEndpoint.indexOf( protocol ) < 0 ) {
                    dataEndpoint = dataEndpoint.replace( /^http[s]?\:/, protocol );
                }

                let xdr = new XDomainRequest( );

                xdr.open( 'GET', endpoint );

                xdr.onload = ( ) => {
                    let dom = new ActiveXObject( 'Microsoft.XMLDOM' );
                    let data = xdr.responseText;

                    dom.async = false;

                    if ( data === null || typeof data === 'undefined' ) {
                        data = $.parseJSON( data ).firstChild.textContent;
                        data = data.firstChild.textContent;
                    }

                    success( data );
                };

                xdr.onerror = ( ) => {
                    error( );
                };

                /* Prevents IE from timing out mid-transit */
                xdr.onprogress = ( ) => {};
                xdr.ontimeout = ( ) => {};

                setTimeout(
                    ( ) => {
                        xdr.send( );
                    },
                    0
                );

            } else if ( versionIE < 8 ) {
                /* IE7 and lower can't do cross domain */
                error( 'IE 8 and below do not support Cross-Origin requests' );
            }

        } else {
            var $ = require( 'jquery2');

            if ( crossDomain ) {
                $.support.cors = true;
            }

            /* Primary request */
            $.ajax( {
                url: endpoint.replace( /^http[s]?\:/, '' ),
                crossDomain: crossDomain ? crossDomain : false,
                method: 'GET',
                cache: cache ? cache : false,
                dataType: 'json',
                success: success,
                error: error
            } );
        }
    }

    /* Send request */
    request( endpoint, success, error );
}



/**
 * Given a product object, returns the featured image if applicable
 *
 * @param  { Object } product The product object
 * @return { Object } Returns the object containing the featured image
 */
function getFeaturedProductImage( product ) {
    return product.media.filter(
        ( image ) => {
            return image.isFeatured === true;
        }
    )[ 0 ];
}



/**
 * Performs AJAX call to product endpoint to retrieve data for provided style numbers
 *
 * @param { String / Number / Array } styles The styles to query for
 * @param { Number } limit The maximum number of products to retrieve
 *
 * @return Returns an array of products that contain necessary data, indexed by style
 */
function getProducts( styles, limit = -1 ) {
    var styleList = toWordArray( styles );

    const products = [];
    let i;

    for ( i = 0; i < styleList.length && ( products.length <= limit || limit === -1 ); i++ ) {
        getData(
            '/rest/products/' + styleList[ i ],
            ( product ) => {

            if  ( product.isOnline === true &&
                  getFeaturedProductImage( ) !== undefined &&
                ( product.displayPrice.max !== null ||
                  product.displayPrice.min !== null ) ) {

                products[ styleList[ i ] ] = product;
            }
        } );
    }

    return products;
}




/************************
 +  Date and Time
 * ********************/

/**
 * Adjusts client's datetime to consistent timezone
 *
 * @param  { number } utcOffset The UTC offset to calibrate local time to
 * @return { return } Returns Date object, adjusted to specific timezone
 */
function getCalibratedTime( utcOffset ) {
    const localTime = new Date( );
    const localMsOffset = localTime.getTimezoneOffset( ) * 60 * 1000;
    const utcMsOffset = utcOffset * 60 * 60 * 1000;

    if ( localMsOffset !== utcMsOffset ) {

        // Calibrate time to a static UTC utcOffset
        return new Date( localTime.getTime( ) - localMsOffset + utcMsOffset );
    }

    return localTime;
}


/**
 * Detects if client is currently in DST
 *
 * @param  { date }   date The client date
 * @return { return } Returns T/F if client is experiencing DST
 */
function isDST( date ) {
    const tarDate = date ? new Date( date ) : !( date instanceof Date ) ? new Date( ) : date;
    const jan = new Date( date.getFullYear( ), 0, 1 );
    const jul = new Date( date.getFullYear( ), 6, 1 );

    return tarDate.getTimezoneOffset( ) < Math.max( jan.getTimezoneOffset( ), jul.getTimezoneOffset( ) );
}


/**
 * Gets ms between two datetimes
 *
 * @param  { string/number } end   A parsable date string/UNIX timestamp
 * @param  { string/number } start A parsable date string/UNIX timestamp
 * @return { number } Returns the number of ms between two datetimes
 */
function getTimeDiff( end, start = new Date( ).getTime( ) ) {
    const startDate = Date.parse( start );
    const endDate = Date.parse( end );
    const diff = endDate - startDate;

    return diff > 0 ? diff : 0;
}


/*
 * Converts ms to an object of datetime units
 *
 * @param  { number } ms A number in ms
 * @return { object } Returns an object containing numerical date-time properties
 */
function convertMs( ms ) {

    // Convert to days, hours, minutes, and seconds - wait to round
    const seconds = ms    / 1000;
    const minutes = seconds / 60;
    const hours   = minutes / 60;
    const days    = hours   / 24;

    return {
        'days'   : Math.floor( days ),
        'hours'  : Math.floor( hours   % 24 ),
        'minutes': Math.floor( minutes % 60 ),
        'seconds': Math.floor( seconds % 60 ),
        'total'  : ms
    };
}


/**
 * Gets time remaining from now until a certain datetime.
 *
 * @param  { string/number } end A parsable date string/UNIX timestamp
 * @param  { number } utcOffset  A timezone offset
 * @return { object } Returns an object containing numerical date-time properties
 */
function getTimeUntil( end, utcOffset = 8 ) {
    const endDate = new Date( end );
    const dst    = isDST( );
    const endDst = isDST( endDate );
    const offset = dst && !endDst ? utcOffset - 1 : !dst && endDst ? utcOffset + 1 : utcOffset;
    const now    = getCalibratedTime( offset );

    return convertMs( getTimeDiff( endDate, now ) );
}


/**
 * Formats number to string with commas for thousands
 *
 * @param  { number } number The number to format
 * @return { string | NaN } Returns string of number formatted to thousands
 */
function parseToMs( time ) {
    const timeStr = time.toString( ).toLowerCase( );

    // Hours input
    if ( timeStr.indexOf( 'h' ) > -1 ) {
        return parseFloat( timeStr ) * 1000 * 60 * 60;
    }

    // Minutes input
    if ( timeStr.indexOf( 'm' ) > -1 ) {
        return parseFloat( timeStr ) * 1000 * 60;
    }

    // Seconds input
    else if ( timeStr.indexOf( 's' ) > -1 ) {
        return parseFloat( timeStr ) * 1000;
    }

    // Assume ms input
    else {
        return parseInt( timeStr );
    }
}




/************************
 +  Data Generation
 * ********************/

/**
 * Get random number in range
 *
 * @param  { number } min Minimum number boundary of range
 * @param  { number } max Maximum number boundary of range
 * @return { number } Returns random number within range, or zero if bad input
 */
function getRandomInRange( min, max ) {
    return min && max ? Math.floor( Math.random( ) * ( parseFloat( max - min ) ) ) + min : max ? max : 0;
}




/************************
 +  Exports
 * ********************/

export {

    /* Formatting */
    toWordArray,
    randomizeArray,
    formatNumber,
    formatPrice,
    twoDigitFormat,
    stripPlurals,

    /* DOM Traversal*/
    eachElem,
    getSiblings,

    /* DOM Manipulation */
    removeNode,
    insertAfter,

    /* Classes */
    addClass,
    removeClass,
    hasClass,
    hasClasses,

    /* Client Info */
    getVersionIE,
    getBreakpoint,
    isCrawler,
    hasReferrer,

    /* Cookies */
    setCookie,
    hasCookie,


    /* Bootstrap Utils */
    calculateCols,
    getColumns,

    /* Event Binding */
    bindEvent,
    bindChildren,
    unbindEvent,
    domReady,

    /* Attributes */
    copyAttrib,
    mediaSourceSwap,

    /* Computed Styles */
    getTransition,

    /* Retrieve Data */
    getData,
    getProducts,
    getFeaturedProductImage,

    /* Date + Time */
    getCalibratedTime,
    isDST,
    getTimeDiff,
    getTimeUntil,
    parseToMs,
    convertMs,

    /* Number Generation */
    getRandomInRange
};
