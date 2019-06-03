from adventurelib import *

import lib.game_items as game_items

Room.items = Bag()

center_room = Room("""
Box.
You're in a very square, very bland, very white room. There appears to be exits on all four sides.
""")
center_room.items.add(game_items.candle)
center_room.items.add(game_items.flashlight)
center_room.items.add(game_items.matches)
center_room.items.add(game_items.lantern)

north_room = Room("""
Dining Room.
You can see an old, iron cook stove off to one side. There are also several dining table.

A young man sits at one of the table, playing some sort of video game.
""")
# ------------------------------------------------------------------------------
center_room.north = north_room
north_room.south = center_room

CURRENT_ROOM = center_room
# ------------------------------------------------------------------------------
