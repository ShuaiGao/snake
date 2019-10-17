# -*- coding:utf-8 -*-


#指定图像文件名称
import pygame
#导入pygame库
from pygame.locals import *
#导入一些常用的函数和常量
from sys import exit
#向sys模块借一个exit函数用来退出程序
from snake import *
from common import *
from manager import *



pygame.init()
#初始化pygame,为使用硬件做准备

screen = pygame.display.set_mode((BODY_WIDTH * WIDTH, BODY_WIDTH * HEIGHT), 0, 32)
#创建了一个窗口
pygame.display.set_caption("snake")
#设置窗口标题
parhPoints = []
# snake = Snake([Point(0,3),Point(1,3),Point(2,3)],Point(10,10), WIDTH, HEIGHT)
snake = Snake(WIDTH, HEIGHT)
# data =((4,1),(4,0),(5,0) , (5,1) , (5,2), (5,3), (5,4), (5,5), (5,6), (5,7), (5,8), (5,9), (6,9),(7,9))
data =((5,2) , (6,2), (7,2))
aim = (2,3)

#aim = (4,8)
#data =((3,0) , (4,0) , (5,0) , (6,0) , (7,0) , (8,0) , (9,0) , (9,1) , (8,1) , (7,1) , (6,1) , (5,1) , (4,1) , (3,1) , (2,1) , (2,2) , (3,2) , (4,2) , (5,2) , (6,2) , (7,2) , (8,2) , (9,2) , (9,3) , (9,4) , (9,5) , (8,5) , (7,5) , (6,5) , (5,5) , (5,6) , (4,6) , (3,6) , (2,6) , (2,7) , (2,8) , (1,8) , (0,8) , (0,7) , (0,6) , (1,6) , (1,5) , (2,5) , (3,5) , (4,5) , (4,4) , (3,4) , (2,4) , (1,4) , (0,4) , (0,3) , (1,3) , (1,2) , (0,2) , (0,1) )

# aim = (3,3)
# data =((9,3) , (9,4) , (9,5) , (9,6) , (9,7) , (9,8) , (9,9) , (8,9) , (8,8) , (8,7) , (8,6) , (8,5) , (8,4\
# ) , (8,3) , (7,3) , (7,4) , (7,5) , (7,6) , (7,7) , (7,8) , (7,9) , (6,9) , (5,9) , (4,9) , (3,9) ,\
# (2,9) , (1,9) , (0,9) , (0,8) , (0,7) , (0,6) , (0,5) , (0,4) , (0,3) , (0,2) , (0,1) , (0,0) , (1,0\
# ) , (1,1) , (1,2) , (2,2) , (2,1) , (2,0) , (3,0) , (4,0) , (5,0) , (6,0) , (7,0) , (8,0) , (9,0) ,\
# (9,1) , (8,1) , (7,1) , (6,1) , (5,1) , (4,1) , (3,1) , (3,2) , (4,2) , (4,3) , (4,4) , (3,4) , (2,4\
# ) , (2,3) , (1,3) , (1,4) , (1,5) , (1,6) , (1,7) , (1,8) , (2,8) , (3,8) , (4,8) , (5,8) , (6,8) ,\
# (6,7) , (6,6) , (5,6) , (5,7) , (4,7) , (3,7) , (2,7) , (2,6) , (3,6) , (4,6) , (4,5) , (5,5) , (6,5\
# ) , (6,4) , (5,4) , (5,3) , (5,2) , (6,2) , (7,2) , (8,2) , (9,2))
snake.setBody(data, aim)
start_flag = False
# Clock对象
clock = pygame.time.Clock()
def init():
    screen.fill((255, 100, 100))
    snake.render(screen)

    pygame.display.update()
step = 1
dead = False
win = False
point = 0
SetSize(WIDTH, HEIGHT)
if __name__ == '__main__':
    init()
    nextPoint = None
    while True:
        if not nextPoint and not dead and start_flag:
            nextPoint = CanMoveToAim(snake.getHeader(), snake.getAim(), snake.body)

            if not nextPoint:
                start_flag = False
        #游戏主循环
        for event in pygame.event.get():
            if event.type == QUIT:
                # 接收到退出事件后退出程序
                exit()
            if event.type == KEYDOWN:
                start_flag = not start_flag
        if not start_flag:
            continue
        if win:
            start_flag = False
            log("Game Over. Win")
            continue
        if dead:
            log("Game Over. Dead")
            continue
        if not nextPoint:
            log("Can not find path.")
            # start_flag = False
            continue
        
        clock.tick(25)
        screen.fill((255, 100, 100))
        # nextPoint = parhPoints.pop()

        retpoint = snake.moveTo(nextPoint)
        if retpoint == -1:
            start_flag = False
        elif retpoint == -2:
            win = True
        point += retpoint
        log("total point", point)
        snake.out()
        nextPoint = None
        snake.render(screen)

        pygame.display.update()
        # start_flag = False
        #刷新一下画面

