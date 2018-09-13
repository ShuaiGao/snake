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
        direction: 0,
        // 暂存 Game 对象的引用
        game_mgr: {
            default: null,
            type:gamemgr
        }
    },

    onLoad () {
        var self = this
        self.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // console.log("diectionChange", self.direction)
            self.game_mgr.directionChange(self.direction)
            // console.log("TOUCH_START")
        });
        if(!CC_WECHATGAME){
            //键盘按下事件
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(event){
                // 在非主线程执行   
                switch(event.keyCode){
                    case cc.KEY.a:
                        this.game_mgr.directionChange(com.LEFT_DIRECTION,1)
                        break
                    case cc.KEY.w:
                        this.game_mgr.directionChange(com.UP_DIRECTION,1)
                        break
                    case cc.KEY.d:
                        this.game_mgr.directionChange(com.RIGHT_DIRECTION,1)
                        break
                    case cc.KEY.s:
                        this.game_mgr.directionChange(com.DOWN_DIRECTION,1)
                        break
                }
                
            },this);
        }
    },


});
