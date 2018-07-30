// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var varr = require("Globals");
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
        rank: {
            default: null,
            type: cc.Prefab,
          },
          rankNode:{
              default:null,
              type:cc.Node,
              visible:false
          }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    toScene: function(){
       cc.director.loadScene("gamemain")
    },
    
    click_reStart: function(){
        console.log("click_reStart")
        this.game_mgr.restart()
     },
     
    click_toHone: function(){
        cc.director.loadScene("gamestart")
     },

    click_showRank: function(){
        cc.log("show rank")
        var scene = cc.director.getScene();
        var node = cc.instantiate(this.rank);
        node.parent = scene;
        // node.setPosition(0, 0);
     },
     click_closeRank: function(){
        cc.log("close rank")
        var scene = cc.director.getScene();
        var node = scene.getChildByName("rank")
        cc.log("close rank", node)
        if(node){
            node.destroy();
        }
     },
});
