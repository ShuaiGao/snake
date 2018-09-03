// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import body from "body";
import gamemgr from "gamemgr";
import enemy from "enemy"
var com = require("common");
cc.Class({
    extends: cc.Component,

    properties: {
        // 移动 方向
        direction: 3,
        body_len:3,
        bodyPrefab:{
            default: null,
            type: cc.Prefab
        },
        // 暂存 Game 对象的引用
        game_mgr: {
            default: null,
            type:cc.Node
            // serializable: false
        },
        m_head: {
            default: null,
            type:body
        },
        enemy: {
            default: null,
            type:enemy
        },
        bodys:{
            default:[],
            type:[body]
        },
        header_n:40,
        speed:20,
        step:{
            default:0,
            visible:false
        },
        
    },

    
    onLoad () {
        this.direction_has_changed = false
        this.total = com.WHDTH_NUM * com.HIGHT_NUM
        for (var i = 0; i < this.body_len; i++) {
            // 使用给定的模板在场景中生成一个新节点
            // var body_x = this.bodyPrefab.width * (n%this.SIDE_NUM) + this.bodyPrefab.width/2;
            // var body_y = -Math.floor(n/this.SIDE_NUM)* this.bodyPrefab.height - this.bodyPrefab.height/2;
            var newBody = this.swapnBody(this.header_n + i);
            this.bodys.push(newBody.getComponent("body"));
            // 为星星设置一个随机位置
            // this.gamemgr.gainScore()
        }
        this.header_n = this.header_n + this.body_len - 1
        this.m_head = this.swapnBody(this.header_n).getComponent("body");
    },

    // LIFE-CYCLE CALLBACKS:
    swapnBody:function(n){
        var newBody = cc.instantiate(this.bodyPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newBody);
        // console.log("sqapnBody ", type(newBody))
        newBody.getComponent("body").setN(n);
        return newBody;
    },
    move:function(enemy_n){
        // if (this.dead) {
        //   return 0
        // }
        var ret = 0
        var head_n = this.m_head.getN()
        if (this.direction == com.UP_DIRECTION) {
            if(Math.floor(head_n/com.HIGHT_NUM) == 0){ //撞墙了
                return -1
            }
            head_n -= com.WIDTH_NUM            
        } else if (this.direction == com.DOWN_DIRECTION) {
            if(Math.ceil(head_n/com.HIGHT_NUM) == com.HIGHT_NUM){//撞墙了
                return -1
            }
            head_n += com.WIDTH_NUM 
        } else if (this.direction == com.LEFT_DIRECTION) {
            if(head_n%com.WIDTH_NUM == 0){ //撞墙了
                return -1
            }
            head_n -= 1
        } else if (this.direction == com.RIGHT_DIRECTION) {
            if((head_n+1) % com.WIDTH_NUM == 0){ //撞墙了
                return -1
            }
            head_n += 1
        }
        this.m_head.setN(head_n)
        
        //检查是否撞到敌人，是否撞自己；向前移动
        if (head_n == enemy_n)
        {
            // this.bodys.push(this.swapnBody(head_n).getComponent("body"))    
            // console.log("enemy_new_n 111" )
            // var enemy_new_n = this.randEnemyPos()
            // console.log("enemy_new_n ", enemy_new_n)
            
            // this.enemy.setN(enemy_new_n, 20)
            ret = 1
        }
        else{
            //撞自己，死了
            for (var i = this.bodys.length - 2; i > 0; i--) {
              if (head_n == this.bodys[i].n){
                ret = -1
                break
              }
            }
            if(ret != -1){
                for (var i = 0; i < this.bodys.length - 1; i++) {
                    this.bodys[i].setN(this.bodys[i+1].getN())
                }
                this.bodys[this.bodys.length-1].setN(head_n)
            }
        }
        this.direction_has_changed = false;
        return ret
    },
    addOneBody(){
        var head_n = this.m_head.getN()
        this.bodys.push(this.swapnBody(head_n).getComponent("body"))   
    },
    changeDirection:function(direction){
        // 同方向和反方向，返回
        if((this.direction + direction) % 2 == 0){
            return false
        }
        // 已经转向但是还没移动返回
        if(this.direction_has_changed){
            return false
        }
        this.direction = direction
        this.direction_has_changed = true
        return true
    },
    start () {
        // var windowSize=cc.winSize;//推荐  原因  短  
        // cc.log("width="+windowSize.width+",height="+windowSize.height); 
        // var ResolutionPolicy = cc.ResolutionPolicy;
        // console.log("head"+ ResolutionPolicy.FIXED_WIDTH);
        // console.log("head"+ResolutionPolicy.FIXED_HEIGHT);
        // // screenWidth = window.innerWidth,
        // // screenHeight = window.innerHight,
        // // console.log("this is player"+screenHeighti)
        // // console.log("this is player"+screenWidth)
        // console.log("this is player");
        // console.log("this is player" + 123);
        // for (var i = this.bodys.length - 1; i >= 0; i--) {
        //     console.log("body " +this.bodys[i].getSize()),
        //     console.log("body " +this.bodys[i].Node.Y)
        // }
    },

    update (dt) {
        // this.step++
        // if(this.step % this.speed != 0){
        //     return
        // }
        // this.move()
    },
    initPos:function(n){
        console.log("enemy init ", n)
        // for (var i = this.bodys.length - 1; i >= 0; i--) {
        //     console.log("body " ,i ),
        //     this.bodys[i].setN(n+i)
        // }
    },
    randEnemyPos:function(){
        var rand_n = Math.floor(Math.random() * this.total)
        cc.log("enemy_new_n ", rand_n)
        
        var breakFlag = false
        for (var j = 0; j < this.total; j++) {
            breakFlag = false
            for (var i = 0; i < this.bodys.length - 1; i++) {
                if(this.bodys[i].getN() == rand_n%this.total){
                    rand_n += 1
                    breakFlag = true
                    break
                }
            }
        }
        // 这里表示已经没有空位置了
        if(breakFlag){
            return -1
        }
        return rand_n
    },
    getN(){
        return this.m_head.getN()
    }
});
