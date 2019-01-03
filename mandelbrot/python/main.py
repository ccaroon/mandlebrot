#!/usr/bin/env python

import pygame
import sys
import time

from color import Color
from mandelbrot import Mandlebrot

pygame.init()

pygame.display.set_caption("Mandlebrot")
screen = pygame.display.set_mode((640, 480))
screen.fill((0,0,0))

# Animate
# curr_iter = 1
# iter_inc = 1
# max_iter = 35

# Detailed
curr_iter = 50
iter_inc = 1
max_iter = 50

m = Mandlebrot(-2, 1, -1, 1)

while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()

    if curr_iter <= max_iter:
        print("%d/%d" % (curr_iter, max_iter))
        curr_iter += iter_inc

        m.compute(curr_iter, screen)
        pygame.display.flip()

        Color.rotate_pallete()

        # time.sleep(0.25)
