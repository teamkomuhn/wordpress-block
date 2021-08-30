'use strict'



// import { useBlockProps } from '@wordpress/block-editor'


wp.blocks.registerBlockType(
    'namespace/name',

    {
        title: 'Example: Basic (esnext)',
        description: 'desc',
        icon: 'menu',
        category: 'text',

        example: {},

        edit() {
            return (
                <div>Hello World (from the editor).</div>
            )
        },

        save() {
            return (
                <div>
                    Hello World (from the frontend).
                </div>
            )
        }
    }
)
