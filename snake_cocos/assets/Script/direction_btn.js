// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import gamemgr from "gamemgr"
var com = require("common");
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
        
        direction: 0,
        // 暂存 Game 对象的引用
        game_mgr: {
            default: null,
            type:gamemgr
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.keyDown,this);
    },

    start () {

    },

    // update (dt) {},

    clickBtn: function(){
       console.log("diectionChange", this.direction)
       this.game_mgr.directionChange(this.direction)
    },

    //键盘按下事件
    keyDown(event)
    {
        // 在非主线程执行   
        switch(event.keyCode){
            case cc.KEY.a:
                this.game_mgr.directionChange(com.LEFT_DIRECTION)
                break
            case cc.KEY.w:
                this.game_mgr.directionChange(com.UP_DIRECTION)
                break
            case cc.KEY.d:
                this.game_mgr.directionChange(com.RIGHT_DIRECTION)
                break
            case cc.KEY.s:
                this.game_mgr.directionChange(com.DOWN_DIRECTION)
                break
        }        
    }
});
