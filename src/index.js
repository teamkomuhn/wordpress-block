'use strict'



const {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload,
    InnerBlocks
} = wp.blockEditor

const {
    PanelBody,
    Button,
    FormToggle
} = wp.components

wp.blocks.registerBlockType(

    'namespace/name',

    {
        apiVersion: 2,

        title: 'Custom Block',
        description: 'Description',
        icon: 'format-image', //dashicons
        category: 'text',

        attributes: {
            image: {
                type: 'string',
                default: null
            },

            content: {
                type: 'string',
                source: 'html',
                selector: 'p'
            }
        },

        edit: properties => {

            const {
                image,
                content
            } = properties.attributes

            // custom functions
            const onChangeContent = (value) => {
                properties.etAttributes({content: value})
            }

            const onSelectImage = (newImage) => {
                propertiesetAttributes({image: newImage.sizes.full.url}) // <= Should handle multiple sizes here
            }


            return ([
                <InspectorControls>
                    <PanelBody title="Image Settings">
                        <MediaUpload
                            onSelect={ onSelectImage }
                            type="image"
                            value={ image }
                            render={ ( { open } ) => (
    							<Button
    								className="editor-media-placeholder__button is-button is-default is-large"
    								icon="upload"
    								onClick={ open }>
    								 Background Image
    							</Button>
    						)}/>

                            <div>
                                <label htmlFor="toggle">Dark background</label>
                                <FormToggle
                                    id="toggle"
                                    onChange={(obj) => {
                                        console.log(obj);
                                    }}/>
                            </div>

                    </PanelBody>
                </InspectorControls>,

                <div {...useBlockProps()}>
                    <img src={image} alt=""/>

                    <RichText
                        key="editable"
                        tagName="p"
                        placeholder="Type some text..."
                        value={content}
                        onChange={onChangeContent}
                        inlineToolbar/>

                    <InnerBlocks/>
                </div>
            ])
        },

        save: properties => {

            const {
                image,
                content
            } = properties.attributes

            return ([
                <div>
                    <img src={image} alt="Image..."/>

                    <RichText.Content
                        tagName="p"
                        value={content}/>

                    <InnerBlocks.Content/>
                </div>
            ])
        }
    }
)
