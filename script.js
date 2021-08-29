'use strict'

// This wp Objects is a global Object added by WordPress automatically to interact with it.

// namespace/name is the computer redable name and title is the human redable name
wp.blocks.registerBlockType('namespace/name', {
    title: 'Super cool name',
    icon: 'smiley', // Use Dashicon icon name: https://developer.wordpress.org/resource/dashicons/
    category: 'common', // Block category
    attributes: {
        title: {type: 'string'},
        content: {type: 'string'} // I think it should use the class instead of a sting Eg:. 'string' => String
    },
    edit: (properties) => {
        return wp.element.createElement(
            "div",
            null,
            wp.element.createElement(
                "input",
                null
            )
        )
    },
    save: (properties) => {
        return null
    }
})

//wp.element = React reatch may work now but not in the future
