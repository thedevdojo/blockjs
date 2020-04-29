import definitions from '../utilities/definitions.js';
import menuShortKeys from '../utilities/menuShortKeys.js';

export default {

    metaKeyDown: false,

    listen: function (EventBus, editor) {

        EventBus.$on('textBlockFocused', e => {
            editor.activeBlockIndex = e.index;

            if (e.text == "") {
                editor.blocks[e.index].changeBlock = true;
                editor.setBlockLastHovered(editor.blocks[e.index]);
            }

            for (var i = 0; i < editor.blocks.length; i++) {
                editor.blocks[i].changeBlockMenu = false;
            }
        });

        EventBus.$on('globalKeyUp', e => {
            if(e.event.key == "Meta" || e.event.key == "Control"){
                editor.metaKeyDown = false;
            }
        });

        EventBus.$on('globalKeyDown', e => {

            var activeBlock = editor.blocks[editor.activeBlockIndex];

            if (e.event.key == "Escape") {
                console.log('close that shit');
                editor.disableKeys = false;
                if(activeBlock.type == "imageBlock"){
                    editor.getActiveBlock().closeImageSearch();
                }
            }

            if(!editor.disableKeys){

                if(e.event.key == "Meta" || e.event.key == "Control"){
                    editor.metaKeyDown = true;
                }

                

                if (e.event.key == "Enter") {
                    if (!activeBlock.changeBlockMenu) {
                        console.log('meta down: ' + editor.metaKeyDown + ' - ' + activeBlock.type);
                         
                        if( (activeBlock.type == "codeBlock" && editor.metaKeyDown) || activeBlock.type == "textBlock" || activeBlock.type == "imageBlock" || activeBlock.type == "dividerBlock"){
                            console.log('why did we enter');
                            editor.createNewBlock();
                        }
                        
                    } else {
                        editor.getActiveBlockButton().clickActiveBlock();
                    }
                }

                if (e.event.key == "Backspace" || e.event.key == "Delete") {
                    this.backSpace(editor, EventBus);
                }

                if( (e.event.key == "u" || e.event.key == "U") &&  activeBlock.type == "imageBlock" ){
                    editor.getActiveBlock().fireFileInputClick();
                }

                if( (e.event.key == "s" || e.event.key == "S") &&  activeBlock.type == "imageBlock" ){
                    editor.getActiveBlock().fireImageSearch();
                }
            }

        });

        EventBus.$on('setImageURL', e => {
            editor.blocks[e.index].content[0].src = e.url;
        });

        EventBus.$on('disableKeys', e => {
            editor.disableKeys = true;
        });

        EventBus.$on('enableKeys', e => {
            editor.disableKeys = false;
        });

        EventBus.$on('keyUp', e => {

            

            if(editor.disableKeys){
                e.event.preventDefault();
                return false;
            }

            if (e.content.length == 0) {
                editor.blocks[e.index].changeBlock = true;
                editor.blocks[e.index].isEmpty = true;
                editor.blocks[e.index].changeBlockMenu = false;
                if (e.index == 0) {
                    editor.firstBlockEmpty = true;
                }
                editor.setBlockLastHovered(editor.blocks[e.index]);
            } else {

                editor.blocks[e.index].changeBlockMenu = false;
                editor.blocks[e.index].changeBlock = false;
                editor.blocks[e.index].shortKey = false;

                menuShortKeys.handleShortKeys(editor, e.index, e.content);

                editor.blocks[e.index].isEmpty = false;
                if (e.index == 0) {
                    editor.firstBlockEmpty = false;
                }
            }

            if (e.event.key == "Escape") {
                console.log('close that shit');
                editor.blocks[e.index].changeBlockMenu = false;
                editor.blocks[e.index].shortKey = false;
            }

        });

        EventBus.$on('keyDown', e => {

            if(editor.disableKeys){
                e.event.preventDefault();
                return false;
            }

            editor.firstBlockEmpty = false;

            if (e.event.key == "Backspace" || e.event.key == "Delete") {
                if (e.content.length == 0) {
                    e.event.preventDefault();
                    if (e.index != 0) {
                        EventBus.$emit('deleteBlock', { index: e.index });
                        e.event.stopPropagation();
                    }
                }
            }
        });

        EventBus.$on('deleteBlock', e => {
            editor.blocks.splice(e.index, 1);

            // set previuos index to previous block
            editor.activeBlockIndex = parseInt(e.index)  - 1;
            
            if(editor.blocks[editor.activeBlockIndex].type == "textBlock"){
                setTimeout(function(){
                    editor.getBlockWithIndex(editor.activeBlockIndex).setFocus();
                    editor.getBlockWithIndex(editor.activeBlockIndex).setCaretAtEnd();
                }, 10);
            }
        });

        EventBus.$on('changeBlock', e => {
            this.changeBlockType(editor, e.index, e.type);
        });

        EventBus.$on('buttonClicked', e => {
            editor.blocks[e.index].shortKey = false;
            editor.getBlockButtonWithIndex(e.index).setVisibleBlocks({
                image: true,
                code: true,
                divider: true,
                bullets: true,
                list: true
            });
            if (editor.blocks[e.index].changeBlockMenu) {
                editor.blocks[e.index].changeBlockMenu = false;
            } else {
                editor.blocks[e.index].changeBlockMenu = true;
            }

        });

    },

    getBlockDefinitionFromString: function (string) {
        switch (string) {
            case "text":
                return definitions.text();
                break;
            case "image":
                return definitions.image();
                break;
            case "code":
                return definitions.code();
                break;
            case "divider":
                return definitions.divider();
                break;
            case "bullets":
                return definitions.bullets();
                break;
            case "list":
                return definitions.list();
                break;
        }
    },

    backSpace: function(editor, EventBus){
        var activeBlock = editor.blocks[editor.activeBlockIndex];
        if (activeBlock.type != "textBlock") {
            //this.changeCurrentBlockToTextBlock(editor);
            if(editor.activeBlockIndex == 0){
                this.changeBlockType(editor, editor.activeBlockIndex, "text")
            } else {
                EventBus.$emit('deleteBlock', { index: editor.activeBlockIndex });
            }
        }   
    },

    changeBlockType: function(editor, index, type){
        var newBlock = this.getBlockDefinitionFromString(type);
        editor.blocks[index].type = newBlock.type;
        editor.blocks[index].el = newBlock.el;
        editor.blocks[index].content = newBlock.content;

        editor.blocks[index].changeBlock = true;
        editor.blocks[index].changeBlockMenu = false;
        editor.blocks[index].lastHovered = false;
        editor.blocks[index].shortKey = false;

        editor.activeBlockIndex = index;

        if (index == 0) {
            editor.firstBlockEmpty = false;
        }
    }

    

}