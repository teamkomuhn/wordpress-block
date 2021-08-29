'use strict'

// This wp Objects is a global Object added by WordPress automatically to interact with it.

// namespace/name is the computer redable name and title is the human redable name
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

        return wp.element.createElement(
            'input',
            {
                type: "text",
                value: properties.attributes.content,
                onChange: updateContent
            }
        )
    },

    save: (properties) => {
        return wp.element.createElement(
            'p',
            null,
            `${properties.attributes.content}`
        );
    }
})

//wp.components
