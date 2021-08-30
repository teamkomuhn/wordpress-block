'use strict'



wp.blocks.registerBlockType(
    'namespace/name',
    {
        apiVersion: 2,

        title: 'Example: Basic (esnext)',
        description: 'desc',
        icon: 'menu',
        category: 'text',

        example: {},

        edit() {
            return (
                <>back</>
            )
        },

        save() {
            return (
                <>front</>
            )
        }
    }
)
