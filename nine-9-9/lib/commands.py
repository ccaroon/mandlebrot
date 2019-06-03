from adventurelib import *

from lib.inventory import INVENTORY
from lib.map import CURRENT_ROOM

# ------------------------------------------------------------------------------
# Inventory Related Commands
# ------------------------------------------------------------------------------
@when("i")
@when("inventory")
def view():
    if INVENTORY:
        print(F"You're carrying {len(INVENTORY)} items:")
        for item in INVENTORY:
            print(F"{item} - {item.isa}")
    else:
        print("You have nothing!")

@when("pickup THING", action="pickup")
@when("search for THING", action="search")
@when("take THING", action="take")
def add_item(thing, action):
    item = CURRENT_ROOM.items.take(thing)
    if get_context() == "dark":
        if action == "search":
            say(F"Not sure whether or not there's a {thing} about, you cautiously search your surroundings...")
            if item and ("lightsource" in item.isa):
                INVENTORY.add(item)
                say(F"Et voila! A {item}!")
                say(F"You ignite your newly discovered {item}. It's no longer pitch black!")
                set_context(None)
            else:
                say(F"Nope. Nothing.")
        else:
            print(F"What {thing}? It's pitch black in here. You can't see ANYTHING!")
    else:
        if item:
            INVENTORY.add(item)
            print(F"You take the {thing}.")

@when("drop THING")
def remove_item(thing):
    item = INVENTORY.take(thing)
    if item:
        CURRENT_ROOM.items.add(item)
        say(F"Dropped {thing}.")
    else:
        say(F"You're not even carrying a {thing}.")
# ------------------------------------------------------------------------------
# Room Related Commands
# ------------------------------------------------------------------------------
@when("l")
@when("look")
def look():
    if INVENTORY.contains_some_sort_of('lightsource'):
        set_context(None)

        print(CURRENT_ROOM)

        if CURRENT_ROOM.items:
            print("\nThere's several items scattered about: ")
            for thing in CURRENT_ROOM.items:
                print(thing)

        exits = CURRENT_ROOM.exits()
        if exits:
            print(F"\nExits: {exits}")
    else:
        set_context("dark")
        print("It's pitch black. You can't see a thing.")
# ------------------------------------------------------------------------------
# Movement
# ------------------------------------------------------------------------------
@when('n', direction='north')
@when('e', direction='east')
@when('s', direction='south')
@when('w', direction='west')
def move(direction):
    global CURRENT_ROOM

    if get_context() == 'dark':
        print("It's pitch black. You probably shouldn't be moving around in here.")
    else:
        room = CURRENT_ROOM.exit(direction)
        if room:
            CURRENT_ROOM = room
            print(CURRENT_ROOM)
        else:
            print(F"You can't move {direction}.")
