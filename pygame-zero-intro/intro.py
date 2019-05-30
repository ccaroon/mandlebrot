#!/usr/bin/env python
import time
import random

alien = Actor('alien', anchor=('left', 'bottom'))
# alien.midleft = (0,57)

WIDTH = 500
HEIGHT = alien.height + 20

alien.speed = 1
alien.pos = (0,HEIGHT)
def draw():
    screen.clear()
    alien.draw()
    
def update(elapsed):
    alien.left += alien.speed
    if alien.left > WIDTH:
        alien.right = 0

#     animate(alien, duration=1, pos=(468, alien.y))

    # if keyboard.left:
    #     alien.x -= 1
    # elif keyboard.right:
    #     alien.x += 1

def on_mouse_down(pos, button):
    if button == mouse.LEFT and alien.collidepoint(pos):
        set_alien_hurt()

def set_alien_hurt():
    sounds.eep.play()
    alien.image = 'alien_hurt'
    alien.angle = -45
    alien.speed = 0
    # print(F"X: {alien.x}, Y: {alien.y} | Center ({alien.center})")
    clock.schedule_unique(set_alien_normal, 1.0)

def set_alien_normal():
    alien.angle = 0
    alien.speed = 1
    alien.image = "alien"

def increase_speed():
    alien.speed += 1
    if alien.speed > 10:
        alien.speed = random.randint(1,5)

clock.schedule_interval(increase_speed, 5.0)
