import util from '../../ui/js/utils';
import STRING from './strings';

class ProductGrid {
    constructor ( element ) {
        this.element         = element;
        this.limit           = element.hasAttribute( STRING.data.limit ) ? parseInt( element.getAttribute( STRING.data.limit ) ) : 4;
        this.randomize       = element.hasAttribute( STRING.data.random ) ? true : false;
        this.styles          = element.hasAttribute( STRING.data.styles ) ? element.getAttribute( STRING.data.styles ).split( ' ' ) : [ ];
        this.productTemplate = element.querySelector( STRING.selector.template );
        this.productData     = null;
    }

    init( ) {
        this.element.style.visibility         = 'hidden';
        this.productTemplate.style.visibility = 'hidden';

        if ( this.randomize === true ) {
            util.randomizeArray( this.styles );
        }

        this.productData = getProducts( this.styles, this.limit );
        this.display( );

        return this;
    }

    display ( ) {
        let template = this.productTemplate.cloneNode( true );

        if ( this.productData.length > 0 ) {
            util.addClass( template, util.getColumns( this.productData.length, 2, 3, 4 ) );

            template.style.visibility = 'initial';

            for ( let product in productData ) {
                this.populateProduct( template, productproduct );
                util.insertAfter( template, this.productTemplate );
            }

            util.removeNode( _this.productTemplate );

            this.element.style.visibility = 'initial';
            util.addClass( this.element, 'fade in' );
        } else {

            util.removeNode( this.element );
        }

        return this;
    }

    populateProduct ( elem, product ) {
        elem.querySelectorAll( 'a' ).setAttribute( 'href', product.canonical );
        elem.querySelectorAll( 'img' ).setAttribute( 'src', ( util.getFeaturedImage( ) ).large );
        elem.querySelectorAll( STRING.selector.name).textContent = product.title;
        elem.querySelectorAll( STRING.selector.price ).textContent = formatPrice( product.displayPrice.min, product.displayPrice.max );

        return this;
    }
}

export { ProductGrid };
