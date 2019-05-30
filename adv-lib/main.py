#!/usr/bin/env python
import adventurelib
from adventurelib import *

import random
# ------------------------------------------------------------------------------
import lib.game_items as game_items
from lib.inventory import INVENTORY
from lib.map import CURRENT_ROOM

# ------------------------------------------------------------------------------
def prompt():
    return "--> "
adventurelib.prompt = prompt

def invalid_command(cmd):
    print(random.choice([
        "Huh?",
        F"I don't know how to '{cmd}'",
        "Ummm...what?"
    ]))
adventurelib.no_command_matches = invalid_command

set_context("dark")
# ------------------------------------------------------------------------------
@when("l")
@when("look")
def where_am_i():
    if INVENTORY.contains_some_sort_of('lightsource'):
        set_context(None)
        print("You're in a not-very-interesting room.")
    else:
        set_context("dark")
        print("It's pitch black. You can't see a thing.")

start(help=False)
