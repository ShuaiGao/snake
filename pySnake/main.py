#!/usr/bin/env python
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
        if dead:
            print "死掉了"
        if not nextPoint:
            print "找不到路径点"
            # start_flag = False
            continue
        # start_flag = False
        clock.tick(25)
        screen.fill((255, 100, 100))
        # nextPoint = parhPoints.pop()

        retpoint = snake.moveTo(nextPoint)
        point += retpoint
        print "得分 ", point
        snake.out()
        nextPoint = None
        snake.render(screen)

        pygame.display.update()
        #刷新一下画面

