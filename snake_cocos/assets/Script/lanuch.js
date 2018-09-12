cc.Class({
    extends: cc.Component,

    properties: {
        rankdisplay: cc.Sprite,
        bk: cc.Node,
        // defaults, set visually when attaching this script to the Canvas
    },

    onLoad() {
        if(CC_WECHATGAME){
            wx.showShareMenu();
            wx.onShareAppMessage(function () {
            return {
                title: '这游戏可带劲儿了，快来玩吧',
                imageUrl: canvas.toTempFilePathSync({
                destWidth: 300,
                destHeight: 400
                })
            }
            })
        }
      },

    start(){
        this.tex = new cc.Texture2D();
    },

    hideRank(){
        this.node.active = false
    },

    showFriendRank(){
        this.node.active = true

        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        } else {
            cc.log("获取好友排行榜数据。x1");
        }
    },

    _updaetSubDomainCanvas () {
        if (window.sharedCanvas != undefined) {
            var openDataContext = wx.getOpenDataContext();
            var sharedCanvas = openDataContext.canvas;
            this.tex.initWithElement(sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankdisplay.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },

    update () {
        this._updaetSubDomainCanvas();
    }
});
