// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import player from "player"
import enemy from "enemy"
var com = require("common");
var varr = require("Globals");
var gamemgr = cc.Class({
    extends: cc.Component,

    properties: {
        width:18,
        body_width:20,
        score: 0,

        // score label 的引用
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: player
        },
        // enemy 节点，用于获取主角弹跳的高度，和控制主角行动开关
        enemy: {
            default: null,
            type: enemy
        },
        speed:10,
        step:{
            default:0,
            visible:false
        },
        enemy_n:{
            default:0,
            visible:false
        },
        dead:false,
        // 跳跃音效资源
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        // 死亡音效
        gameoverAudio: {
            default: null,
            url: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // cc.log("game_mgr loading ...")
        varr.score = 0
        // this.gainScore()
        // 生成一个新的星星
        // this.spawnNewEnemy();
        // this.spawnNewSnake();
        if(CC_WECHATGAME){
            wx.showShareMenu();
            wx.onShareAppMessage(function () {
                return {
                title: '我是一只贪吃蛇，贼开心',
                imageUrl: canvas.toTempFilePathSync({
                    destWidth: 300,
                    destHeight: 400
                })
                }
            })
        }
    },

    start () {

    },

    update (dt) {
        if(this.dead)
        { return }
        this.step++
        if(this.step % this.speed != 0){
            return
        }
        this.move()
    },

    move:function(){
        const ret = this.player.move(this.enemy.n)
        if(ret == -1){
            this.dead = true
            this.gameOver(this.score)
        }else if(ret == 1){
            this.gainScore()
            var enemy_new_n = this.randEnemyPos()
            this.enemy.setN(enemy_new_n)
            this.player.addOneBody()
        }
        this.step = 0
    },

    gameOver:function(score){
        varr.score = score
        cc.audioEngine.playEffect(this.gameoverAudio, false);
        setTimeout(function(){
            cc.director.loadScene("gameend")
        },3100)

        
        // 提交得分
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: "x1",
                score: score,
            });
        } else {
            cc.log("提交得分: x1 : " + score)
        }
    },

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = this.score
        // this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },
    directionChange: function(n, pType = 0){
        if(this.dead)
        { return }
        // this.gainScore()
        if(this.player.changeDirection(n))
        {
            if(pType == 1)
            {
                this.step = this.speed - 2
            }
            else
            {
                this.step = this.speed - 2
                // this.move()
            }
        }
    },

    randEnemyPos:function(){
        var total = com.WIDTH_NUM * com.HIGHT_NUM
        var rand_n = Math.floor(Math.random() * total)
        
        var breakFlag = false
        for (var j = 0; j < total; j++) {
            breakFlag = false
            if(this.enemy.getN() == rand_n %total){
                rand_n += 1
                continue;
            }
            for (var i = 0; i < this.player.bodys.length; i++) {
                if(this.player.bodys[i].getN() == rand_n%total){
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
});



