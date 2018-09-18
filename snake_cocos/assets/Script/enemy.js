// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// import gamemgr from "gamemgr"
var com = require("common");
cc.Class({
    extends:cc.Component,

    properties: {
        n:0,
        // 暂存 Game 对象的引用
        // game_mgr: {
        //     default: null,
        //     type:gamemgr
        //     // serializable: false
        // }
        img_n:1,
        ememy_img:{
            default:[],
            type:[cc.SpriteFrame],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.pic = []
        // cc.loader.loadResDir("fruit", function (err, assets) {
        //     cc.log("gaoshuai ok", err,assets)
        //     cc.log("gaoshuai ok", err,assets.length)
        //     for (var i = 0; i < assets.length; i++) {
        //         // cc.log("gaoshuai 22" ,assets[i])
        //         // cc.log("gaoshuai 22" ,i, assets[i], type(assets[i]))
        //         this.pic = assets[i]
        //     }
        //     // assets.forEach(element => {
        //         // cc.log("gaoshuai 11", element[0], element[1])
        //     // });
        // });

        // this.setN(this.n)
        this.imgurl = []
        for(var i = 1; i <= this.img_n; i++)
        {
            this.imgurl[i-1] = cc.url.raw('resources/fruit/fruit_'+i+'.png')
        }
    },
    start () {
        this.setN(this.n)
    },

    initPos:function(n){
        // console.log("enemy init ", n)
        this.setN(n)
    },
    setN:function(n){
        // cc.log("setN ",this.node.width)
        // cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)
        var img = this.getComponent(cc.Sprite)
        if(img){
            // img.spriteFrame.clearTexture()
        }
        
        this.n = n
        this.node.x = (n % com.WIDTH_NUM) * this.node.width + this.node.width/2
        this.node.y = -Math.floor(n/com.HIGHT_NUM)* this.node.height - this.node.height/2
        // cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)

        // var hh  = this.getComponent(cc.Sprite)//.clearTexture()
        // cc.log("gaoshuai ", hh, hh.spriteFrame)
        // hh.spriteFrame.setTexture(cc.url.raw('fruit/fruit_1'))
        // hh.spriteFrame.setTexture(cc.loader.releaseRes("fruit/fruit_1", cc.SpriteFrame))
        // this.spriteFrame.setTexture(this.pic[0])
        // hh.spriteFrame.clearTexture()
        var index = Math.floor(Math.random() * this.img_n)
        // var realurl = cc.url.raw('resources/fruit/fruit_'+index+'.png')
        // var realurl = this.imgurl[index]
        // var texture = cc.textureCache.addImage(realurl);
        // cc.log("gaoshuai 98", img)
        // cc.log("gaoshuai 99", texture)
        if( img){
            // img.spriteFrame = new cc.SpriteFrame(texture)
            img.spriteFrame = this.ememy_img[index]
        }
        // var mylogo  = new cc.SpriteFrame('Textures/fruit/fruit_1.png'); 
        // img.spriteFrame = mylogo;
        // var self = this
        // cc.loader.load({url: "fruit/fruit_1", type: 'png'}, function(err,img){
        //     var mylogo  = new cc.SpriteFrame(img); 
        //     self.spriteFrame = mylogo;
        // });
    },
    getN:function(){
        return this.n
    },
});
