from adventurelib import *

import lib.game_items as game_items

Room.items = Bag()

center_room = Room("""
You're in a very square, very bland, very white room. There appears to be exits on all four sides.
""")
center_room.items.add(game_items.candle)
center_room.items.add(game_items.flashlight)
center_room.items.add(game_items.matches)
center_room.items.add(game_items.lantern)


CURRENT_ROOM = center_room
