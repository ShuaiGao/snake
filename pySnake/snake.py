#!/usr/bin/env python
# -*- coding:utf-8 -*-
import copy
import pygame
import random
from common import *


class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __ne__(self, other):
        return self.x != other.x or self.y != other.y

    def __str__(self):
        return '({},{})'.format(self.x,self.y)
        # return '[x:{}, y:{}]'.format(self.x,self.y)

    def moveTo(self, point):
        self.x = point.x
        self.y = point.y

class Snake():
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.body = []
        self.headImg = pygame.image.load("./texture/box_purple.png").convert_alpha()
        self.tailImg = pygame.image.load("./texture/enemybody.png").convert_alpha()
        self.img = pygame.image.load("./texture/box_green.png").convert_alpha()
        self.aimImg = pygame.image.load("./texture/box_red.png").convert_alpha()
        self.aim = Point(10,10)
    def setBody(self, data, aim):
        self.aim.x = aim[0]
        self.aim.y = aim[1]
        for point in data:
            self.body.append(Point(point[0],point[1]))
    def getHeader(self):
        return self.body[-1]

    def getTail(self):
        return self.body[0]
    def out(self):
        print "-"*40
        print self.aim
        for i in self.body:
            print i,",",
        print "\n"
    def getAim(self):
        return self.aim

    def render(self, screen):
        screen.blit(self.aimImg, (self.aim.x * BODY_WIDTH, self.aim.y * BODY_WIDTH))
        for i, body in enumerate(self.body):
            if i == 0:
                screen.blit(self.tailImg, (body.x * BODY_WIDTH, body.y * BODY_WIDTH))
            elif i == len(self.body) - 1:
                screen.blit(self.headImg, (body.x * BODY_WIDTH, body.y * BODY_WIDTH))
            else:
                screen.blit(self.img, (body.x * BODY_WIDTH, body.y * BODY_WIDTH))

    def moveTo(self, point):
        print "start move to ", point
        header = self.body[-1]
        if (header.x - point.x)**2 + (header.y - point.y)**2 != 1:
            print("错误移动点，距离目标点太远", header, point)
            return -1
        for i in self.body[1:]:
            if i == point:
                print "错误移动点", point
                return -1
        if point == self.aim:
            self.body.append(copy.deepcopy(point))
            self.changeAimPos()
            return 1
        else:
            self.body.remove(self.body[0])
            self.body.append(copy.deepcopy(point))

            # for i in range(0, len(self.body)- 2):
            #     self.body[i].moveTo(self.body[i+1])
            # self.body[-1].moveTo(point)
            return 0
        # print "end move to ", point
        # return True

    def changeAimPos(self):
        maxnum = self.width * self.height #- len(self.body)
        if len(self.body) == maxnum:
            print "游戏结束"
            return
        n = random.randint(0, maxnum- 1)
        # print "random n", n
        # tmp_n = 0
        # self.aim.x = -1
        # self.aim.y = -1
        # for i in range(0, self.width):
        #     for j in range(0,  self.height):
        #         if Point(i,j) in self.body:
        #             continue
        #         if tmp_n == n:
        #             self.aim.x = i
        #             self.aim.y = j
        #             return
        #         tmp_n += 1

        for i in range(1, len(self.body) + 1):
            y = n / self.height%self.height
            x = n % self.width
            flag = True
            if Point(x,y) in self.body:
                n += 1
                n = n % maxnum
                flag = False
            # for point in self.body:
            #     if point.x == x and point.y == y:
            #         n = n + 1
            #         flag = False
            #         break
            if flag:
                self.aim.x = x
                self.aim.y = y
            else:
                self.aim.x = -1
                self.aim.y = -1

    #返回按路径行走后的序列
    def tmpMove(self, pointList):
        tmpList = pointList[::-1]

        if len(tmpList) >= len(self.body):
            return tmpList[-len(self.body):]
        else:
            retList = self.body[len(tmpList) - len(self.body):]
            retList.extend(tmpList)
            return retList
        return []