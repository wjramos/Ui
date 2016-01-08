var util   = require( '../../ui/js/utils' );
var STRING = require( './strings' );

function ProductGrid( element ) {
    this.element         = element;
    this.limit           = element.hasAttribute( STRING.data.limit ) ? parseInt( element.getAttribute( STRING.data.limit ) ) : 4;
    this.randomize       = element.hasAttribute( STRING.data.random ) ? true : false;
    this.styles          = element.hasAttribute( STRING.data.styles ) ? element.getAttribute( STRING.data.styles ).split( ' ' ) : [ ];
    this.productTemplate = element.querySelector( STRING.selector.template );
    this.productData     = null;
};

ProductGrid.prototype.init = function ( ) {
    var _this = this;

    _this.element.style.visibility         = 'hidden';
    _this.productTemplate.style.visibility = 'hidden';

    if ( _this.randomize = true ) {
        util.randomizeArray( _this.styles );
    }

    _this.productData = getProducts( _this.styles, _this.limit );

    _this.display( );
};

ProductGrid.prototype.display = function ( ) {
    var _this = this;

    if ( _this.productData.length > 0 ) {
        util.addClass( _this.productTemplate, util.getColumns( _this.productData.length, 2, 3, 4 ) );

        var template = _this.productTemplate.cloneNode( true );
        template.style.visibility = 'initial';

        for ( var product in productData ) {
            _this.populateProduct( template, productproduct )
            util.insertAfter( template, _this.productTemplate );
        }

        util.removeNode( _this.productTemplate );

        _this.element.style.visibility = 'initial';
        util.addClass( this.element, 'fade in' );
    } else {
        util.removeNode( _this.element );
    }
};

ProductGrid.prototype.populateProduct = function ( elem, product ) {
    elem.querySelectorAll( 'a' ).setAttribute( 'href', product.canonical );
    elem.querySelectorAll( 'img' ).setAttribute( 'src', ( util.getFeaturedImage( ) ).large );
    elem.querySelectorAll( STRING.selector.name).textContent = product.title;
    elem.querySelectorAll( STRING.selector.price ).textContent = formatPrice( product.displayPrice.min, product.displayPrice.max );
};

module.exports = ProductGrid;