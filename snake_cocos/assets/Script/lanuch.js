cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        rankdisplay: cc.Sprite,
        // defaults, set visually when attaching this script to the Canvas
    },

    start(){
        this._isShow = true;
        this.tex = new cc.Texture2D();
    },
    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    onClick () {
        this._isShow = !this._isShow;
        // 发消息给子域
        wx.postMessage({
            message: this._isShow ? 'Show' : 'Hide'
        })
    },

    _updaetSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    update () {
        this._updaetSubDomainCanvas();
    }
});
