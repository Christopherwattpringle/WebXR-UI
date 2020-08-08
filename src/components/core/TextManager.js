
import MSDFText from '../../content/MSDFText.js';

/**

Job:
- Routing the request for Text dimensions and Text creation depending on Text type.

Knows:
- this component's textType attribute

Note:
Only one Text type is natively supported by the library at the moment,
but the architecture allows you to easily stick in your custom Text type.
More information here :
https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type

*/
export default function TextManager( Base = class {} ) {

    return class TextManager extends Base {

        createText() {

            const component = this;

            const mesh = (() => {

                switch ( this.getTextType() ) {

                case 'MSDF' :
                    return MSDFText.buildText.call( this )

                default :
                    console.warn(`'${ this.getTextType() }' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type`);
                    break

                }

            })()

            mesh.renderOrder = Infinity;

            // This is for hiddenOverflow to work
            mesh.onBeforeRender = function() {

                if ( component.updateClippingPlanes ) {

                    component.updateClippingPlanes();

                }

            };

            return mesh

        }

        /**
         * Called by Text to get the domensions of a particular glyph,
         * in order for InlineManager to compute its position
         */
        getGlyphDimensions( options ) {

            switch ( options.textType ) {

            case 'MSDF' :

                return MSDFText.getGlyphDimensions( options )

            default :
                console.warn(`'${ options.textType }' is not a supported text type.\nSee https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type`);
                break

            }

        }

    }

}
