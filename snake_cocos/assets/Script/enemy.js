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
cc.Class({
    extends:cc.Component,

    properties: {
        n:0,
        SIDE_NUM: 20,
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
        // 暂存 Game 对象的引用
        // game_mgr: {
        //     default: null,
        //     type:gamemgr
        //     // serializable: false
        // }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("enemy init ")
        this.setN(this.n, this.SIDE_NUM)
        console.log("enemy init 111")
    },

    // start () {
        // console.log("this is enemy")
        // 
    // },

    // update (dt) {},

    initPos:function(n){
        console.log("enemy init ", n)
        this.setN(n)
    },
    setN:function(n, SIDE_NUM){
        cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)
        cc.log("setN ",this.node)
        this.n = n
        this.node.x = (n%SIDE_NUM) * this.node.width + this.node.width/2
        this.node.y = -Math.floor(n/SIDE_NUM)* this.node.height - this.node.height/2
        cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)
    },
    getN:function(){
        // console.log("ememy getN ");
        return this.n
    },
});
