from pygame import joystick, key
from pygame.locals import *

joystick.init()

joyin = None
if(joystick.get_count() > 0):
    joyin = joystick.Joystick(0)
    joyin.init()

def check_input(player):
    xaxis = yaxis = 0

    if joyin:
        xaxis = joyin.get_axis(0)
        yaxis = joyin.get_axis(1)

    if key.get_pressed()[K_LEFT] or xaxis < -0.8:
        player.angle = 180
        player.movex = -20
    if key.get_pressed()[K_RIGHT] or xaxis > 0.8:
        player.angle = 0
        player.movex = 20
    if key.get_pressed()[K_UP] or yaxis < -0.8:
        player.angle = 90
        player.movey = -20
    if key.get_pressed()[K_DOWN] or yaxis > 0.8:
        player.angle = 270
        player.movey = 20
