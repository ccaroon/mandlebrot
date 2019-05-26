#!/usr/bin/env python

import pgzrun
import gameinput
import gamemaps
from random import randint
from datetime import datetime

WIDTH = 600
HEIGHT = 660

player = Actor("pacman_o")
SPEED = 3

def draw():
    screen.blit('header', (0,0))
    screen.blit('colourmap', (0,80))

    get_player_image()
    player.draw()

def update():
    if player.input_active:
        gameinput.check_input(player)
        gamemaps.check_move_point(player)
        if player.movex or player.movey:
            input_lock()
            animate(player,
                pos=(player.x + player.movex, player.y + player.movey),
                duration=1/SPEED,
                tween='linear',
                on_finished=input_unlock()
            )

def init():
    player.x = 290
    player.y = 570
    player.status = 0
    input_unlock()

def get_player_image():
    dt = datetime.now()
    a = player.angle
    tc = dt.microsecond % (500000/SPEED) / (100000/SPEED)
    if tc > 2.5 and (player.movex != 0 or player.movey !=0):
        if a != 180:
            player.image = "pacman_c"
        else:
            player.image = "pacman_cr"
    else:
        if a != 180:
            player.image = "pacman_o"
        else:
            player.image = "pacman_or"

    # player.angle = a

def input_lock():
    player.input_active = False

def input_unlock():
    player.movex = player.movey = 0
    player.input_active = True


init()
pgzrun.go()
