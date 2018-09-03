// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// class Player extends Entity{
//   constructor(x, y, width, n, img_index) {
//     super(width, width, x, y)
//     this.n = n
//     this.img_index = img_index
//     this.m_aBody = new Array();
//     this.direction = UP_DIRECTION
//   }

//   set_x(x){this.x = x}
//   set_y(y){this.y = y}
//   move_to(point){
//     this.x = point.x
//     this.y = point.y
//     this.n = point.n
//     this.img_index = point.img_index
//   }
//   mypaint(ctx){
//     this.drawToCanvas(ctx, atlas, this.img_index * 20, 0, 20, 20)
//     // ctx.drawImage(atlas, this.img_index * 20, 0, 20, 20, this.x, this.y, this.width, this.height)
//   }
// }
var com = require("common");
var body = cc.Class({
    extends: cc.Component,

    properties: {
    },

    setN:function(n){
        this.n = n
        this.node.x = (n % com.WIDTH_NUM) * this.node.width + this.node.width/2
        this.node.y = -Math.floor(n/com.HIGHT_NUM)* this.node.height - this.node.height/2
    },
    getN:function(){
    	return this.n
    }
});
