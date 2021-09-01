'use strict'



const {
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload
} = wp.editor

const {
    PanelBody,
    IconButton
} = wp.components

wp.blocks.registerBlockType(

    'namespace/name',

    {
        title: 'Custom Block',
        description: 'Description',
        icon: 'format-image',
        category: 'layout',

        attributes: {
            title: {
                type: 'string',
                source: 'html',
                selector: 'h2'
            },

            titleColor: {
                type: 'string',
                default: 'black'
            },

            body: {
                type: 'string',
                source: 'html',
                selector: 'p'
            },

            image: {
                type: 'string',
                default: null
            }
        },

        edit({ attributes, setAttributes }) {
            const {
                title,
                body,
                titleColor,
                image
            } = attributes

            // custom functions
            const onChangeTitle = (newTitle) => {
                setAttributes( { title: newTitle } )
            }

            const onChangeBody = (newBody) => {
                setAttributes( { body: newBody } )
            }

            const onTitleColorChange = (newColor) => {
                setAttributes( { titleColor: newColor } )
            }

            const onSelectImage = (newImage) => {
                setAttributes( {image: newImage.sizes.full.url} )
            }


            return ([
                <InspectorControls>
                    <PanelBody title="Font Color Settings">
                        <ColorPalette
                            value={ titleColor }
                            onChange={ onTitleColorChange }/>
                    </PanelBody>

                    <PanelBody title="Background Image Settings">
                        <MediaUpload
                            onSelect={ onSelectImage }
                            type="image"
                            value={ image }
                            render={ ( { open } ) => (
    							<IconButton
    								className="editor-media-placeholder__button is-button is-default is-large"
    								icon="upload"
    								onClick={ open }>
    								 Background Image
    							</IconButton>
    						)}/>
                    </PanelBody>
                </InspectorControls>,

                <>
                    <RichText
                        key="editable"
                        tagName="h2"
                        placeholder="Your CTA Title"
                        value={ title }
                        onChange={ onChangeTitle }
                        style={ { color: titleColor } }/>

                    <RichText
                        key="editable"
                        tagName="p"
                        placeholder="Your CTA Description"
                        value={ body }
                        onChange={ onChangeBody }/>
                </>
            ])
        },

        save({ attributes }) {
            const {
                title,
                body,
                titleColor
            } = attributes

            return (
                <>
                    <RichText.Content
                        style={{color: titleColor}}
                        tagName="h2"
                        value={ title }/>

                    <RichText.Content
                        tagName="p"
                        value={ body }/>
                </>
            )
        }
    }
)
