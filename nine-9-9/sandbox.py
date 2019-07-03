#!/usr/bin/env python
import adventurelib
from adventurelib import *
from inventory.object import Object
INVENTORY = Bag()

# aliases = ("window", "fish", "ghoti")
# porthole = Item("porthole", *aliases)
# porthole.desc = "A Round Window"
# porthole = Object(
#     "porthole",
#     "A Round Window",
#     aliases=("window", "fene")
# )
porthole = Object(
    "porthole", 
    "A smallish, round window. It's too dark and foggy outside to see anything.",
    aliases=("window",),
    state="closed"
)
INVENTORY.add(porthole)

@when("examine THING")
@when("x THING")
def examine(thing):
    item = INVENTORY.find(thing)

    if item:
        say(F"{item} - {item.desc}")
    else:
        say(F"You don't have any {thing}.")

adventurelib.start(help=True)
