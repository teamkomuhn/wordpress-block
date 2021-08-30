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
        return (<p>hello</p>)

        // return wp.element.createElement(
        //     'p',
        //     null,
        //     `${properties.attributes.content}`
        // );
    }
})

//wp.components
// () and {}
