!function(){"use strict";var e=window.wp.element;window.wp.blockEditor,wp.blocks.registerBlockType("namespace/name",{apiVersion:2,title:"Example: Basic (esnext)",description:"desc",icon:"menu",category:"text",attributes:{title:{type:"string"},description:{type:"string"}},edit:t=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)("input",{onChange:e=>{t.setAttributes({title:e.target.value})},type:"text",value:t.attributes.title,placeholder:"Title..."}),(0,e.createElement)("input",{onChange:e=>{t.setAttributes({description:e.target.value})},type:"text",value:t.attributes.description,placeholder:"Description..."})),save:t=>(0,e.createElement)(e.Fragment,null,(0,e.createElement)("h1",null,t.attributes.title),(0,e.createElement)("p",null,t.attributes.description))})}();