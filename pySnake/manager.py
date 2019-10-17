# -*- coding:utf-8 -*-

from common import log
import random
import copy
from snake import Point
from sys import maxsize as MAXSIZE

SNAKE_BODY = -3
NOT_USED = -1
USED = -2

class Com():
    def __init__(self):
        self.WIDTH = 10
        self.HEIGHT = 10
    def setSize(self, w, h):
        self.WIDTH = w
        self.HEIGHT = h
    def getBoxNum(self):
        return self.WIDTH * self.HEIGHT
com = Com()

def getNeighbors(point):
    neighborList = []
    if point.x > 0:
        neighborList.append(Point(point.x - 1, point.y))
    if point.x < com.WIDTH  - 1:
        neighborList.append(Point(point.x + 1, point.y))
    if point.y > 0:
        neighborList.append(Point(point.x, point.y - 1))
    if point.y < com.HEIGHT - 1:
        neighborList.append(Point(point.x, point.y + 1))

    return neighborList

def IsRechabled(startPoint, dis_data):
    for point in getNeighbors(startPoint):
        if dis_data[point.y][point.x] < 0 :
            continue
        return point
    return False


def getDis(bodys, aim, cannotmove_point = None):
    dis_data = [[NOT_USED]*com.WIDTH for i in range(0, com.HEIGHT)]
    for body in bodys:
        dis_data[body.y][body.x] = SNAKE_BODY
    # print "\n"
    dis_data[aim.y][aim.x] = 1
    tmpList = [aim]
    # for i,data in enumerate(dis_data): print i,data
    # print "-"*30
    while len(tmpList) > 0:
        a = tmpList.pop()
        for point in getNeighbors(a):
            if dis_data[point.y][point.x] != NOT_USED:
                continue
            dis_data[point.y][point.x] = dis_data[a.y][a.x] + 1
            tmpList.insert(0, point)
    # for i, data in enumerate(dis_data): print i,data
    # print "-"*30
    dis_data[bodys[0].y][bodys[0].x] = SNAKE_BODY
    if cannotmove_point:
        dis_data[cannotmove_point.y][cannotmove_point.x] = SNAKE_BODY
    return dis_data

def VirturalMove(body, aim, dis_data, next_point):
    tmpBody = copy.deepcopy(body)
    headPoint = tmpBody[-1]
    while headPoint != aim:
        dis_data = getDis(tmpBody, aim)
        #找距离最近的位置
        next_pointList = []
        for point in getNeighbors(headPoint):
            if dis_data[point.y][point.x] > 0 :
                next_pointList.append(point)
        # random.shuffle(next_pointList)
        dis = MAXSIZE
        neighborPoint = None
        for point in next_pointList:
            nowdis = dis_data[point.y][point.x]
            if nowdis <= -1:
                continue
            if len(body) > com.getBoxNum() * 4.0 / 5.0:
                # print("long body ......")
                # tmpBody.append(point)
                # tmp_dis_data = getDis(tmpBody, aim)
                # if IsRechabled(point, tmp_dis_data):
                if MAXSIZE == dis:
                    neighborPoint = point
                    dis = nowdis
                    # print "dis ", dis, nowdis
                if nowdis > dis:
                    neighborPoint = point
                    dis = nowdis
                # tmpBody.pop()
            else:
                if nowdis < dis:
                    neighborPoint = point
                    dis = nowdis

        # for i in tmpBody: print i,
        # print "\n"
        # print "-"*30
        if not neighborPoint:
            return False

        tmpBody.append(neighborPoint)

        if neighborPoint != aim:
            tmpBody = tmpBody[1:]
        if body[-1] == headPoint:
            next_point.x = neighborPoint.x
            next_point.y = neighborPoint.y
        headPoint = neighborPoint

    if len(tmpBody) != len(body) + 1:
        log("error, virtual body length != body length")

    #下面判断虚拟蛇的蛇头能不能到达蛇尾
    tmpDisData = getDis(tmpBody, tmpBody[0])
    return IsRechabled(tmpBody[-1], tmpDisData)

def VirturalMove_rand(body, aim, dis_data, next_point):
    tmpBody = copy.deepcopy(body)
    headPoint = tmpBody[-1]
    while headPoint != aim:
        #找距离最近的位置
        next_pointList = []
        for point in getNeighbors(headPoint):
            if dis_data[point.y][point.x] != SNAKE_BODY and dis_data[point.y][point.x] != NOT_USED:
                next_pointList.append(point)
        random.shuffle(next_pointList)
        dis = MAXSIZE
        neighborPoint = None
        for point in next_pointList:
            nowdis = dis_data[point.y][point.x]
            if nowdis < dis and nowdis > -1:
                neighborPoint = point
                dis = nowdis
        # if len(next_pointList) < 1: return False
        # neighborPoint = random.choice(next_pointList)
        if not neighborPoint: return False
        tmpBody.append(neighborPoint)

        if neighborPoint != aim:
            tmpBody = tmpBody[1:]
        if body[-1] == headPoint:
            next_point.x = neighborPoint.x
            next_point.y = neighborPoint.y
        headPoint = neighborPoint

    if len(tmpBody) != len(body) + 1:
        log("error, virtual body len({}) != body len({}) + 1".format(len(tmpBody), len(body) + 1))

    #下面判断虚拟蛇的蛇头能不能到达蛇尾
    tmpDisData = getDis(tmpBody, tmpBody[0])
    return IsRechabled(tmpBody[-1], tmpDisData)

global depthest
def DFS(curDepth, dis_data, point):
    global depthest
    print dis_data[point.y][point.x]
    if dis_data[point.y][point.x] == SNAKE_BODY:
        return
    if dis_data[point.y][point.x] == USED:
        dis_data[point.y][point.x] = NOT_USED
        return
    dis_data[point.y][point.x] = USED
    curDepth += 1
    log("curDepth", curDepth , "depthest", depthest)
    if curDepth > depthest:
        depthest = curDepth
    neighbors = getNeighbors(point)

    for i in neighbors:
        DFS(curDepth, dis_data, point)


def getDepth(dis_data, poit):
    global depthest
    depthest = 0
    curDepth = 0
    dis_data[poit.y][poit.x] = USED
    DFS(curDepth, dis_data, poit)
    dis_data[poit.y][poit.x] = NOT_USED
    return depthest

def wanderMove(body, next_point):
    global depthest
    dis_data = [[NOT_USED] * com.WIDTH for i in range(0, com.HEIGHT)]
    for point in body:
        dis_data[point.y][point.x] = SNAKE_BODY

    neighbors = getNeighbors(body[-1])

    random.shuffle(neighbors)
    nowDepth = -1
    nowPoint = None
    for point in neighbors:
        # print "邻居节点 ", point
        if dis_data[point.y][point.x] == SNAKE_BODY:continue
        depth = getDepth(dis_data, point)
        print depth
        if depth > nowDepth:
            nowPoint = point

    if body[0] in neighbors:
        next_point.x = body[0].x
        next_point.y = body[0].y
        return next_point

    if not nowPoint:
        log( "wanderMove GAME OVER")
        return False
    next_point.x = nowPoint.x
    next_point.y = nowPoint.y
    return nowPoint

def followTail_isSafe(body, next_point):
    #得到移动后的身体
    tmpBody = copy.deepcopy(body)
    tmpBody = tmpBody[1:]
    tmpBody.append(next_point)

    dis_data = getDis(body, body[0])
    nei = getNeighbors(body[-1])
    for i in nei:
        tmp_dis = dis_data[i.y][i.x]
        if tmp_dis > 0:
            return True
    return False

def followTail(body, next_point, enemy_aim):
    log("move, follow tail")
    dis_data = getDis(body, body[0], enemy_aim)
    # for i in dis_data: print i
    # print "="*30
    nei = getNeighbors(body[-1])
    # random.shuffle(nei)
    # for i in nei: print i, dis_data[i.y][i.x]

    if not IsRechabled(body[-1], dis_data):
        return False
    # maxDistancePoint = max([dis_data[i.y][i.x] for i in nei])
    # next_point.x = maxDistancePoint.x
    # next_point.y = maxDistancePoint.y
    # print "dis_data ", dis_data
    # print "nei ", 
    # for i in nei: print i,
    # print "\n"
    # print [dis_data[i.y][i.x] for i in nei]

    random.shuffle(nei)
    min_dis = 0#MAXSIZE
    min_point = (0,0)#MAXSIZE
    for i in nei:
        tmp_dis = dis_data[i.y][i.x]
        if tmp_dis <= 0: 
            continue
        elif tmp_dis > 0:
            flag = False
            if tmp_dis == min_dis:
                preDis = (min_point.x - enemy_aim.x) **2 + (min_point.y - enemy_aim.y)**2
                nowDis = (i.x - enemy_aim.x) **2 + (i.y - enemy_aim.y)**2
                if nowDis > preDis:
                    flag = True

            elif tmp_dis > min_dis:
                flag = True

            if flag:
                # print "min_dis ", min_dis, i
                # dis_data[i.y][i.x] = SNAKE_BODY
                if not followTail_isSafe(body, i):
                    continue
                min_dis = tmp_dis
                min_point = i

                next_point.x = i.x
                next_point.y = i.y
                # return True
                # tmp_nei = getNeighbors(i)
                # for j in tmp_nei:
                #     if dis_data[j.y][j.x] < tmp_dis:
                #
                #         return True
                # dis_data[i.y][i.x] = tmp_dis
    if min_dis > 0: return True
    return False

def SetSize(w,h):
    com.setSize(w,h)

def CanMoveToAim(start, aim, body):
    log( "searching path ...")
    next_point = Point(0,0)
    dis_data = getDis(body, aim)
    # for i in dis_data: print i
    # print "="*30
    if IsRechabled(start, dis_data):
        n = 2#random.randint(0, 99)
        if n % 2 == 0:
            if VirturalMove(body, aim, dis_data, next_point ):
                # print "VirturalMove"
                return next_point
            elif VirturalMove_rand(body, aim, dis_data, next_point ):
                # print "VirturalMove_rand"
                return next_point
        else:
            if VirturalMove_rand(body, aim, dis_data, next_point ):
                return next_point
            elif VirturalMove(body, aim, dis_data, next_point ):
                # print "VirturalMove_rand"
                return next_point
    ret =  followTail(body, next_point, aim)
    if ret:
        log( "ret == ", ret)
        return next_point
    else:
        return wanderMove(body, next_point)

