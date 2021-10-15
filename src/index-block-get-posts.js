'use strict'

/* const {
    useBlockProps,
    RichText,
    InspectorControls,
    MediaUpload,
    InnerBlocks,
    BlockControls,
    BlockSettingsMenu
} = wp.blockEditor

const {
    Panel,
    PanelBody,
    PanelRow,
    PanelHeader,
    Button,
    FormToggle,
    TextControl
    TextControl,
    SelectControl
} = wp.components

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
                propertiesetAttributes({image: newImage.sizes.full.url}) // <= Should handle multiple sizes here
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
                                <label htmlFor="toggle">Dark background</label>
                                <FormToggle
                                    id="toggle"
                                    onChange={(event) => {
                                        event.target.checked = !event.target.checked
                                    }}/>


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
/* BLOCK SIDE NOTE 

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

        edit: ({attributes, setAttributes}) => {

            const {
                id, content
            } = attributes

            // custom functions
            const onChangeID = (value) => {
                setAttributes({id: value})
            }
            const onChangeContent = (value) => {
                setAttributes({content: value})
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
                id, content
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


/* BLOCK GET POSTS 

wp.blocks.registerBlockType(

    'namespace/block-get-posts',

    {
        apiVersion: 2,

        title: 'Get Posts',
        description: 'Description',
        icon: 'format-image', // Dashicon
        category: 'text',

        attributes: {
            json: {
                type: `string`
            }
        },

        edit: ({attributes, setAttributes}) => {
            return ([
                <>
                <input onChange = {(event) => {
                    fetch(`../../wp-json/wp/v2/pages/?slug=${event.target.value}`)

                    .then(response => response.json())

                    .then(json => {
                        setAttributes({json})
                    })
                }}/>

                <p>|{attributes.json}|</p>
                </>
            ]);
        },

        save: () => {
            var result;

            fetch('../../wp-json/wp/v2/posts')

            .then(response => response.json())

            .then(json => {
                result = JSON.stringify(json, null, 4)

                return ([
                    <p>{result}</p>
                ]);
            });
        }
    }
)


wp.blocks.registerBlockType(

    'namespace/name2',

    {
        apiVersion: 2,

        title: 'Custom Block 2',
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
                propertiesetAttributes({image: newImage.sizes.full.url}) // <= Should handle multiple sizes here
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
                                <label htmlFor="toggle">Dark background</label>
                                <FormToggle
                                    id="toggle"
                                    onChange={(event) => {
                                        event.target.checked = !event.target.checked
                                    }}/>


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
)*/

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { SelectControl } = wp.components
const { Component } = wp.element
const { useBlockProps, InspectorControls } = wp.blockEditor


class mySelectPosts extends Component {
    
    static getInitialState(selectedPost) {
        return {
            posts: [],
            selectedPost,
            post: {}
        }
    }

    constructor() {
        super(...arguments)
        this.state = this.constructor.getInitialState(this.props.attributes.selectedPost)
        this.getOptions = this.getOptions.bind(this)
        this.getOptions()
    }
      
      
    getOptions() {
        return new wp.apiFetch({ path: '/wp/v2/posts' })
        
        .then( posts => {
            const post = posts.find( post => post.id === this.state.selectedPost )
            this.setState({
                post,
                posts
            })
        })
    } 

    onChangeSelectPost(value) {

        console.log(this)
        
        const post = this.state.posts.find( post => post.id === Number(value) )
        
        this.setState({
            selectedPost: Number(value),
            post
        })
        
        this.props.setAttributes({
            selectedPost: Number(value),
            title: post.title.rendered,
            content: post.excerpt.rendered,
            link: post.link
        })
    }
  
    render() {
        let options = [{
            value: 0,
            label: 'Select a Post'
        }]

        let output = 'Loading Posts...'

        if (this.state.posts.length > 0) {

            this.state.posts.forEach( post => {
                options.push({
                    value: post.id,
                    label: post.title.rendered
                })
            })

            output = `${this.state.posts.length + 1} posts available.`
        } else {
            output = 'No posts found. Please create some first.'
        }
        
        if ( this.state.post.hasOwnProperty('title') ) {
            output = (
                <div>
                    <a href={ this.state.post.link }>
                        <h2 dangerouslySetInnerHTML={ { __html: this.state.post.title.rendered } }></h2>
                    </a>

                    <p dangerouslySetInnerHTML={ { __html: this.state.post.excerpt.rendered } }></p>
                </div>
            )
        }

        return [
            <InspectorControls>
                <SelectControl onChange={this.onChangeSelectPost} value={ this.props.attributes.selectedPost } label={ 'Select a Post' } options={ options } />
            </InspectorControls>,

            output
        ]
    }
}

registerBlockType( 
    'cgb/block-guten-load-post',
    
    {
        title: 'Load a Post', 
        icon: 'shield',
        category: 'common',
        
        attributes: {
            content: {
                type: 'array',
                source: 'children',
                selector: 'p'
            },

            title: {
                type: 'string',
                selector: 'h2'
            },

            link: {
                type: 'string',
                selector: 'a'
            },

            selectedPost: {
                type: 'number',
                default: 1
            },
        },

        edit: mySelectPosts,

        save: props => {
            return (
                <div>
                    <div>
                        <a href={ props.attributes.link }>
                            <h2 dangerouslySetInnerHTML={ { __html: props.attributes.title } }></h2>
                        </a>
                        <p dangerouslySetInnerHTML = { { __html: props.attributes.content } }></p>
                    </div>
                </div>
            )
        },
    }
)