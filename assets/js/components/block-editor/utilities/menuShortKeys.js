export default {
    handleShortKeys: function (editor, index, content) {
        if (content[0] == "/") {
            var matchString = content.replace('/', '').toLowerCase();
            var imgString = 'image';
            var codeString = 'code';
            var dividerString = 'divider';
            var bulletString = 'bullets';
            var listString = 'list';

            console.log('index here: ' + index);
            console.log(editor.$refs.button[index]);
            //editor.$refs.button[index].setActiveBlock('image');

            if (imgString.startsWith(matchString) || codeString.startsWith(matchString) || dividerString.startsWith(matchString) || bulletString.startsWith(matchString) || listString.startsWith(matchString)) {
                editor.blocks[index].changeBlockMenu = true;
                editor.blocks[index].changeBlock = true;
                editor.blocks[index].shortKey = true;

                editor.$refs.button[index].setVisibleBlocks({
                    image: true,
                    code: true,
                    divider: true,
                    bullets: true,
                    list: true
                });

                if (imgString.startsWith(matchString) && matchString != "") {
                    editor.$refs.button[index].setVisibleBlocks({
                        image: true,
                        code: false,
                        divider: false,
                        bullets: false,
                        list: false
                    });
                    editor.$refs.button[index].setActiveBlock('image');
                }

                if (codeString.startsWith(matchString) && matchString != "") {
                    editor.$refs.button[index].setVisibleBlocks({
                        image: false,
                        code: true,
                        divider: false,
                        bullets: false,
                        list: false
                    });
                    editor.$refs.button[index].setActiveBlock('code');
                }

                if (dividerString.startsWith(matchString) && matchString != "") {
                    editor.$refs.button[index].setVisibleBlocks({
                        image: false,
                        code: false,
                        divider: true,
                        bullets: false,
                        list: false
                    });
                    editor.$refs.button[index].setActiveBlock('divider');
                }

                if (bulletString.startsWith(matchString) && matchString != "") {
                    editor.$refs.button[index].setVisibleBlocks({
                        image: false,
                        code: false,
                        divider: false,
                        bullets: true,
                        list: false
                    });
                    editor.$refs.button[index].setActiveBlock('bullets');
                }

                if (listString.startsWith(matchString) && matchString != "") {
                    editor.$refs.button[index].setVisibleBlocks({
                        image: false,
                        code: false,
                        divider: false,
                        bullets: false,
                        list: true
                    });
                    editor.$refs.button[index].setActiveBlock('list');
                }

            } else {
                editor.blocks[index].changeBlockMenu = false;
                editor.blocks[index].changeBlock = false;
                editor.blocks[index].shortKey = false;
            }

        }
    }
}