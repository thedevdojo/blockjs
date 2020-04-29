export default {

    text: function () {
        return {
            type: "textBlock",
            el: "p",
            content: [{
                type: "text",
                text: ""
            }],
            changeBlock: true,
            changeBlockMenu: false,
            lastHovered: false,
            isEmpty: true,
            shortKey: false
        };
    },

    image: function () {
        return {
            type: "imageBlock",
            el: "img",
            content: [{
                src: ""
            }]
        }
    },

    code: function () {
        return {
            type: "codeBlock",
            el: "code",
            content: [{
                lang: "html",
            }]
        }
    },

    divider: function () {
        return {
            type: "dividerBlock",
            el: "hr",
            content: ""
        }
    },

    bullets: function () {
        return {
            type: "listBlock",
            el: "ul",
            content: {
                items: [

                ]
            }
        }
    },

    list: function () {
        return {
            type: "listBlock",
            el: "ol",
            content: {
                items: [

                ]
            }
        }
    }

};