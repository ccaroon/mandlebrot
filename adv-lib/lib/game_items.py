from adventurelib import *

Item.isa = []

# ------------------------------------------------------------------------------
matches = Item("box of matches", "book of matches", "matches")
candle = Item("candle")
flashlight = Item("flashlight", "torch")
lantern = Item("lantern")
for item in [matches, candle, flashlight, lantern]:
    item.isa.append('lightsource')
# ------------------------------------------------------------------------------
key = Item("skeleton key", "master key", "key")
