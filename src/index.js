`use strict`


import {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
} from '@wordpress/block-editor' // I dont use template literals here because the compiler throws an error

import {
    Panel,
    PanelBody,
    PanelRow,
    PanelHeader,
    Button,
    ToggleControl,
    TextControl,
    SelectControl
} from '@wordpress/components'

import {
    useState,
    useEffect
} from '@wordpress/element'


// BLOCK TEMPLATE

wp.blocks.registerBlockType(

    'blocks/name',

    {
        apiVersion: 2,

        title: 'Custom Block',
        description: `Description`,
        icon: `format-image`, // Dashicon
        category: `text`,

        attributes: {
            image: {
                type: `string`,
                default: null
            },

            content: {
                type: `string`,
                source: `html`,
                selector: `p`
            },

            color: {
                type: `string`
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
                properties.setAttributes({content: value})
            }

            const onSelectImage = (newImage) => {
                properties.setAttributes({image: newImage.sizes.full.url}) // Should handle multiple device screen sizes here
            }

            return ([
                <InspectorControls>
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
                </InspectorControls>,

                <div {...useBlockProps()}>
                    <img src={image} alt="Image..."/>

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

            return (
                <div>
                    <img src={image} alt="Image..."/>

                    <RichText.Content
                        tagName="p"
                        value={content}/>

                    <InnerBlocks.Content/>
                </div>
            )
        }
    }
)


// BLOCK SIDE NOTE

wp.blocks.registerBlockType(

    `blocks/block-side-note`,

    {
        title: `Side Note`,
        description: `Description`,
        icon: `align-right`, //dashicons
        category: `text`,

        attributes: {

            id: {
                type: `string`
            },

            content: {
                type: `string`,
                source: `attribute`,
                selector: `p`
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


// BLOCK GET POSTS

const useConstructor = callback => {
    const [ hasBeenCalled, setHasBeenCalled ] = useState(false)
    if (hasBeenCalled) return
    callback()
    setHasBeenCalled(true)
}


const Post = ({properties}) => {

    const [ options, setOptions ] = useState([])
    const [ result, setResult ]   = useState(<p>Loading...</p>)
    const [ id, setId ]           = useState(properties.attributes.id)
    const [ posts, setPosts ]     = useState(null)


    const updateId = newId => {
        newId = Number(newId)

        setId(newId)
        properties.setAttributes({ id: newId })
    }

    const createOptions = source => {

        source.forEach( post => {

            setOptions( oldOptions => {
                return [
                    ...oldOptions,
    
                    {
                        label: post.title.rendered,
                        value: post.id
                    }
                ]
    
            })

        })
    }


    useConstructor(() => {

        fetch(`../../wp-json/wp/v2/posts`)

        .then(response => response.json())

        .then(posts => {
            setPosts(posts)

            createOptions(posts)
        })
    })

    useEffect(() => {
        if (posts !== null) { 

            const postIsSelected = id !== -1

            if (postIsSelected) {

                const post = posts.find(post => post.id === id)

                setResult(<article>
                    <h2>{post.title.rendered}</h2>
                    <p>{post.excerpt.rendered}</p>
                </article>)

            } else setResult(<p>Select a post.</p>)

        } else setResult(<p>No posts... Create some first.</p>)
    }, [ posts, id ])

    
    return [
        <InspectorControls>

            <SelectControl
                label = 'Select a Post'
                value = {id}
                options = {options}
                onChange = {updateId}
            />

        </InspectorControls>,
        
        result
    ]
}

wp.blocks.registerBlockType(

    `blocks/block-get-posts`,

    {
        apiVersion: 2,

        title: `Block get posts`,
        description: `Description`,
        icon: `embed-post`, // https://developer.wordpress.org/resource/dashicons
        category: `text`,

        attributes: {
            id: {
                type: 'number',
                default: -1
            }
        },

        edit: properties => {

            return <div { ...useBlockProps() }>
                <Post properties = {properties} />
            </div>
        },

        save: properties => {
            return <p>Hello, world!</p>
        }
    }
)

