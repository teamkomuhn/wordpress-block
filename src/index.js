'use strict'



import { useBlockProps } from '@wordpress/block-editor' //No idea what this does but it wont work without

wp.blocks.registerBlockType(
    'namespace/name',

    {
        apiVersion: 2,

        title: 'Example: Basic (esnext)',
        description: 'desc',
        icon: 'menu',
        category: 'text',

        attributes: {
            title: {type: 'string'},
            description: {type: 'string'}
        },

        edit: (properties) => {
            const updateTitle = (event) => {
                properties.setAttributes({
                    title: event.target.value
                })
            }

            const updateDescription = (event) => {
                properties.setAttributes({
                    description: event.target.value
                })
            }

            return (
                <>
                    <input onChange={updateTitle} type="text" value={properties.attributes.title} placeholder="Title..."/>
                    <input onChange={updateDescription} type="text" value={properties.attributes.description} placeholder="Description..."/>
                </>
            )
        },

        save: (properties) => {

            return (
                <>
                    <h1>{properties.attributes.title}</h1>
                    <p>{properties.attributes.description}</p>
                </>
            )
        }
    }
)
