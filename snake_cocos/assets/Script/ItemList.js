// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Item = cc.Class({
    name: 'Item',
    properties: {
        id: cc.Label,
        name: cc.Label,
        score: cc.Label,
        avatar: cc.Sprite
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        items: {
            default: [],
            type: Item
        },
        itemPrefab: cc.Prefab,
        scrollview: cc.ScrollView,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("itemlist ", this.items.length)
        // this.scrollview.node.on('scroll-to-top', this.callback, this);
        this.scrollview.node.on('scroll-to-top', this.callback, this);
        var itemcolor = [cc.hexToColor('#00645C5C'), cc.hexToColor("#00B9ADAD")]
        for (var i = 0; i < 18; ++i) {
            var item = cc.instantiate(this.itemPrefab);
            console.log("itemlist ", item)
            console.log("itemlist ", cc.colorToHex(item.color))
            item.color = itemcolor[i%2]
            item.y = -item.height * i
            item.x = 0
            var data = this.items[i];
            this.node.addChild(item);
            // console.log("itemlist ", i)
            // console.log("itemlist "+ i)
            item.getComponent('ItemTemplate').init({
                id: i+1,
                playername: "name_"+i,
                score: i * 10,
                avatar: null
            });
        }
    },

    start () {

    },

    // update (dt) {},

    // data: {id,avatar,itemName,itemPrice}

    callback:function(event){
        console.log("scrollview scroll-to-top ")
        // console.log("scrollview scroll-to-top ", type(event))
        console.log("scrollview scroll-to-top ", event.detail)
        console.log("scrollview scroll-to-top ", event.getType())
        var scrollview = event.detail;
    },
});
