'use strict'



const {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    InnerBlocks
} = wp.blockEditor

const {
    Panel,
    PanelBody,
    PanelRow,
    PanelHeader,
    Button,
    FormToggle,
    TextControl
} = wp.components

const {
    useState
} = wp.element // @wordpress/element

wp.blocks.registerBlockType(

    'namespace/name',

    {
        apiVersion: 2,

        title: 'Custom Block',
        description: 'Description',
        icon: 'format-image', // Dashicon
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
                properties.setAttributes({image: newImage.sizes.full.url}) // <= Should handle multiple sizes here
            }


            return ([
                <InspectorControls>
                    <PanelBody title="Image Settings">
                        <MediaUpload
                            onSelect={onSelectImage}
                            type="image"
                            value={image}
                            render={({open}) => (
    							<Button
    								className="editor-media-placeholder__button is-button is-default is-large"
    								icon="upload" // Dashicon
    								onClick={open}>
    								Background Image
    							</Button>
    						)}/>

                            <PanelRow>

                            </PanelRow>

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



/* BLOCK SIDE NOTE */

wp.blocks.registerBlockType(

    'namespace/block-side-note',

    {
        title: 'Side Note',
        description: 'Description',
        icon: 'align-right', //dashicons
        category: 'text',

        attributes: {

            id: {
                type: 'string'
            },

            content: {
                type: 'string',
                source: 'attribute',
                selector: 'p'
            }
        },

        edit: properties => {

            const {
                id,
                content
            } = properties.attributes

            const onChangeID = (value) => {
                properties.setAttributes({id: value})
            }

            const onChangeContent = (value) => {
                properties.setAttributes({content: value})
            }

            return ([
                <InspectorControls>
                    <PanelBody title="Side Note ID">
                        <PanelRow>
                            <TextControl
                                label="Add an ID for this side note."
                                value={id}
                                onChange={onChangeID}
                            />
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>,

                <>
                    <RichText
                        key="editable"
                        tagName="p"
                        placeholder="Type some text..."
                        value={content}
                        onChange={onChangeContent}
                        inlineToolbar/>
                </>
            ])
        },

        save: properties => {

            const {
                id,
                content
            } = properties.attributes

            return ([
                <aside class="block-side-note" id={id}>
                    <span class="icon-close"></span>
                    <RichText.Content
                        tagName="p"
                        value={content}/>
                </aside>
            ])
        }
    }
)
