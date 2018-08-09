// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        id: cc.Label,
        avatar: cc.Sprite,
        playername: cc.Label,
        score: cc.Label,
        avateUrl: "",
        loadAvatar:false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    // update () {
    // },
    setAvatarUrl(avateUrl){
        this.avateUrl = avateUrl;
        var self = this
        cc.loader.load({url: avateUrl, type: 'png'}, function (err, tex) {
            if (err) {
                    cc.error('load img error:' + err);
                    return;
            } else {
                cc.error('load img succ:' + err);
                self.loadAvatar = true
                self.avatar.spriteFrame = new cc.SpriteFrame(tex);
                    // this.avatar.type = cc.Sprite.Type.SIMPLE;
                    // this.avatar.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                //再次设置node的Size
                    // courseMainNode.width = parentNode.width;
                    // courseMainNode.height = parentNode.height;
        
            }
        });
    },
    // data: {id,avatar,name,score}
    init: function (data) {
        this.id.string = data.id;
        this.playername.string = data.playername;
        this.score.string = data.score;
    //     if(data.avatar)
    //         this.avatar.spite = data.avatar;
    }
});
