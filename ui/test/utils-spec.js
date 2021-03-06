'use strict';

var shim = require( '../../test-shim/js/main' );
var expect = shim.expect;

var util = shim.init( '../../countdown-timer/js/utils', {} );



    // /* Formatting */
    // toWordArray,
    // randomizeArray,
    // formatNumber,
    // formatPrice,
    // twoDigitFormat,
    // stripPlurals,

    // /* DOM Traversal*/
    // eachElem,
    // getSiblings,

    // /* DOM Manipulation */
    // removeNode,
    // insertAfter,

    // /* Classes */
    // addClass,
    // removeClass,
    // hasClass,
    // hasClasses,

    // /* Client Info */
    // getVersionIE,
    // getBreakpoint,
    // isCrawler,
    // hasReferrer,

    // /* Cookies */
    // setCookie,
    // hasCookie,


    // /* Bootstrap Utils */
    // calculateCols,
    // getColumns,

    // /* Event Binding */
    // bindEvent,
    // bindChildren,
    // unbindEvent,
    // domReady,

    // /* Attributes */
    // copyAttrib,
    // mediaSourceSwap,

    // /* Computed Styles */
    // getTransition,

    // /* Retrieve Data */
    // getData,
    // getProducts,
    // getFeaturedProductImage,

    // /* Date + Time */
    // getCalibratedTime,
    // isDST,
    // getTimeDiff,
    // getTimeUntil,
    // parseToMs,
    // convertMs,

    // /* Number Generation */
    // getRandomInRange









/******************************
 +
 + Time and Date Utilities
 +
 *****************************/

/* Scripts to test */
var twoDigitFormat = util.twoDigitFormat;
var getTimeDiff = util.getTimeDiff;
var isDST = util.isDST;
var getTimeUntil = util.getTimeUntil;
var getCalibratedTime = util.getCalibratedTime;

/* Test data */
/* Strings */
var endString = 'December 31, 2040';
var startString = 'March 15, 2015';
var singleLetter = 'r';
var fiveLetter = 'roads';
var nullStr = 'null';
var undefinedStr = 'undefined';

/* Numbers */
var zero = 0;
var singleDigit = 4;
var fiveDigit = 44835;
var endMs = Date.parse( endString );
var startMs = Date.parse( startString );

/* Dates */
var endDateObj = new Date( endMs );
var startDateObj = new Date( startMs );
var nowDateObj = new Date( );
var utcDateObj = new Date( nowDateObj.getTime( ) - ( nowDateObj.getTimezoneOffset( ) * 60 * 1000 ) );

var junVariable = new Date( '2018-06-03 15:00:00 PDT' ); /* PST and PDT here act identically */
var janVariable = new Date( '2018-01-03 15:00:00 PST' );

var junStatic = new Date( Date.UTC( nowDateObj.getUTCFullYear( ), nowDateObj.getUTCMonth( ), nowDateObj.getUTCDate( ), nowDateObj.getUTCHours( ), nowDateObj.getUTCMinutes( ), nowDateObj.getUTCSeconds( ), nowDateObj.getUTCMilliseconds( ) ) );
var janStatic = new Date( Date.UTC( nowDateObj.getUTCFullYear( ), nowDateObj.getUTCMonth( ), nowDateObj.getUTCDate( ), nowDateObj.getUTCHours( ), nowDateObj.getUTCMinutes( ), nowDateObj.getUTCSeconds( ), nowDateObj.getUTCMilliseconds( ) ) );

var datePdt = new Date( '2040-11-01 00:00:00 PDT' );
var datePst = new Date( '2040-11-05 00:00:00 PST' );

var calibratedTime = getCalibratedTime( singleDigit );
var utcCalibratedTime = getCalibratedTime( zero );

// Set locale
var localeDateObj = new Date( );
localeDateObj.setDate( utcDateObj.getDate( ) );
localeDateObj.setHours( utcDateObj.getHours( ) + singleDigit );


/* Tests */

describe( 'Countdown Timer Utilities', function ( ) {

    /* twoDigitFormat */
    describe( 'twoDigitFormat( any )', function ( ) {
        it( 'should trim long values to last two characters', function ( ) {
            expect( twoDigitFormat( fiveDigit ) ).to.equal( fiveDigit.toString( ).substr( -2 ) );
            expect( twoDigitFormat( fiveLetter ) ).to.equal( fiveLetter.substr( -2 ) );
            expect( twoDigitFormat( null ) ).to.equal( nullStr.substr( -2 ) );
            expect( twoDigitFormat( undefined ) ).to.equal( undefinedStr.substr( -2 ) );
        } );

        it( 'should prefix single characters/digits with a 0', function ( ) {
            expect( twoDigitFormat( singleDigit ) ).to.be.a( 'string' ).and.have.length( 2 ).and.equal( '0' + singleDigit.toString( ) );
            expect( twoDigitFormat( singleLetter ) ).to.be.a( 'string' ).and.have.length( 2 ).and.equal( '0' + singleLetter );
        } );

    } );

    /* getCalibratedTime */
    describe( 'getCalibratedTime( number )', function ( ) {

        it( 'should return a Date object', function ( ) {
            expect( calibratedTime ).to.be.an.instanceof( Date );
        } );


        it( 'should be adjusted by defined number of hours', function ( ) {
            expect( calibratedTime.getHours( ) ).to.equal( localeDateObj.getHours( ) );
            expect( calibratedTime.getMinutes( ) ).to.equal( localeDateObj.getMinutes( ) );
            expect( calibratedTime.getSeconds( ) ).to.equal( localeDateObj.getSeconds( ) );
            expect( calibratedTime.getDate( ) ).to.equal( localeDateObj.getDate( ) );

        } );

        it( 'should match UTC time if zero offset', function ( ) {
            expect( utcCalibratedTime.getHours( ) ).to.equal( utcDateObj.getHours( ) );
            expect( utcCalibratedTime.getMinutes( ) ).to.equal( utcDateObj.getMinutes( ) );
            expect( utcCalibratedTime.getSeconds( ) ).to.equal( utcDateObj.getSeconds( ) );
            expect( utcCalibratedTime.getDate( ) ).to.equal( utcDateObj.getDate( ) );

        } );
    } );

    /* getTimeDiff */
    describe( 'getTimeDiff( string/number/Date, [ string/number/Date ] )', function ( ) {
        it( 'should always return a number', function ( ) {
            expect( getTimeDiff( endString ) ).to.be.a( 'number' );
            expect( getTimeDiff( endString, startString ) ).to.be.a( 'number' );
            expect( getTimeDiff( endDateObj ) ).to.be.a( 'number' );
            expect( getTimeDiff( endDateObj, startDateObj ) ).to.be.a( 'number' );
            expect( getTimeDiff( singleDigit ) ).to.be.a( 'number' );
            expect( getTimeDiff( fiveDigit, startDateObj ) ).to.be.a( 'number' );
            expect( getTimeDiff( null ) ).to.be.a('number');
            expect( getTimeDiff( undefined ) ).to.be.a('number');
            expect( getTimeDiff( NaN ) ).to.be.a('number');

        } );

        it( 'should be the difference between two numbers, interpreted as milliseconds', function ( ) {
            expect( getTimeDiff( endMs, startMs ) ).to.be.a( 'number' ).and.equal( endMs - startMs );
            expect( getTimeDiff( fiveDigit, singleDigit ) ).to.be.a( 'number' ).and.equal( fiveDigit - singleDigit );
        } );
    } );

    /* getTimeUntil */
    describe( 'getTimeUntil( string/number/Date, number )', function ( ) {
        var timeLeft = getTimeUntil( endString );

        it( 'should return an object with date number properties', function ( ) {
            expect( timeLeft ).to.be.an( 'object' );
            expect( timeLeft ).to.have.property( 'days' ).that.is.a( 'number' );
            expect( timeLeft ).to.have.property( 'hours' ).that.is.a( 'number' );
            expect( timeLeft ).to.have.property( 'minutes' ).that.is.a( 'number' );
            expect( timeLeft ).to.have.property( 'seconds' ).that.is.a( 'number' );
            expect( timeLeft ).to.have.property( 'total' ).that.is.a( 'number' );
        } );


        it( 'should produce a date where adding current hours and hours remaining until midnight on the end date should be 24 hours, even if Daylight Savings changes during the count',
            function ( ) {

            /* Add hours and minutes (rounded) together */
            var minutesSumPdt = Math.round( ( getTimeUntil( datePdt ).minutes + nowDateObj.getMinutes( ) ) / 60 );
            var hoursSumPdt   = minutesSumPdt + getTimeUntil( datePdt ).hours + nowDateObj.getHours( );

            var minutesSumPst = Math.round( ( getTimeUntil( datePst ).minutes + nowDateObj.getMinutes( ) ) / 60 );
            var hoursSumPst   = minutesSumPst + getTimeUntil( datePst ).hours + nowDateObj.getHours( );

            expect( hoursSumPdt ).to.eq( 24 );
            expect( hoursSumPst ).to.eq( 24 );
        } );
    } );

    /* isDST */
    describe( 'isDST( [ date/date string ] )', function ( ) {

        it( 'should return true when the specified date is experiencing daylight savings', function ( ) {
            expect( isDST( junVariable ) ).to.be.true;
            expect( isDST( janVariable ) ).to.be.false;
        } );

        it( 'should return false when the specified date is not experiencing daylight savings -- always the case in locales that do not change timezones', function ( ) {

            expect( isDST( junStatic ) ).to.be.false;
            expect( isDST( janStatic ) ).to.be.false;
        } );
    } );
} );
