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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setN(this.n)
    },

    initPos:function(n){
        // console.log("enemy init ", n)
        this.setN(n)
    },
    setN:function(n){
        // cc.log("setN ",this.node.width)
        // cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)
        this.n = n
        this.node.x = (n % com.WIDTH_NUM) * this.node.width + this.node.width/2
        this.node.y = -Math.floor(n/com.HIGHT_NUM)* this.node.height - this.node.height/2
        // cc.log("setN ",n, SIDE_NUM, this.node.x, this.node.y)
    },
    getN:function(){
        return this.n
    },
});
