'use strict'



wp.blocks.registerBlockType('namespace/name', {
    title: 'Custom WordPress Block',
    icon: 'menu', // Use a Dashicon: https://developer.wordpress.org/resource/dashicons/
    category: 'text',
    attributes: {
        title: {type: 'string'},
        content: {type: 'string'}
    },

    edit: (properties) => {

        const updateContent = (event) => {
            properties.setAttributes({content: event.target.value})
        }

        return <input type="text"/>
    },

    save: (properties) => {
        return (<p>hello</p>)
    }
})

//wp.components
// () and {}
