'use strict'



import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    InnerBlocks,
    AlignmentToolbar
} from '@wordpress/block-editor'

import {
    Panel,
    PanelBody,
    PanelRow,
    PanelHeader,
    Button,
    ToggleControl,
    TextControl
} from '@wordpress/components'

import {
    useState
} from '@wordpress/element'

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

            let [
                state,
                setState
            ] = useState(false)

            const {
                image,
                content
            } = properties.attributes

            // custom functions
            const onChangeContent = (value) => {
                properties.etAttributes({content: value})
            }

            const onSelectImage = (newImage) => {
                properties.setAttributes({image: newImage.sizes.full.url}) // Should handle multiple device screen sizes here
            }

            return ([
                <InspectorControls>
                    // <Panel header="Headrt">
                        <PanelBody title="Image Settings">
                            <PanelRow>
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
                            </PanelRow>

                            <PanelRow>
                                <ToggleControl
                                    label="Toggle a dark overlay for the image"
                                    help="help?..."
                                    checked={state}
                                    onChange={() => {
                                        setState((state) => !state)
                                    }}/>
                            </PanelRow>
                        </PanelBody>
                    // </Panel>
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

                <div {...useBlockProps()}>
                    <RichText
                        key="editable"
                        tagName="p"
                        placeholder="Type some text..."
                        value={content}
                        onChange={onChangeContent}
                        inlineToolbar/>
                </div>
            ])
        },

        save: properties => {

            const {
                id,
                content
            } = properties.attributes

            return ([
                <aside className="block-side-note" id={id}>
                    <span className="icon-close"></span>
                    <RichText.Content
                        tagName="p"
                        value={content}/>
                </aside>
            ])
        }
    }
)
