from adventurelib import *

from lib.map import CURRENT_ROOM

class Inventory(Bag):
    def contains_some_sort_of(self, looking_for):
        found = False
        for item in self:
            if looking_for in item.isa:
                found = True
                break

        return found

INVENTORY = Inventory()

@when("i")
@when("inventory")
def view():
    if INVENTORY:
        print(F"You're carrying {len(INVENTORY)} items:")
        for item in INVENTORY:
            print(F"{item} - {item.isa}")
    else:
        print("You have nothing!")

@when("pickup ITEM", action="pickup")
@when("search for ITEM", action="search")
@when("take ITEM", action="take")
def add_item(name, action):
    item = CURRENT_ROOM.items.take(name)
    if get_context() == "dark":
        if action == "search":
            say(F"Not sure whether or not there's a {name} about, you cautiously search your surroundings...")
            if item and "lightsource" in item.isa:
                INVENTORY.add(item)
                say(F"Et voila! A {item}!")
                say(F"You ignite your newly discovered {item}. It's no longer pitch black!")
                set_context(None)
            else:
                say(F"Nope. Nothing.")
        else:
            print(F"What {name}? It's pitch black in here. You can't see ANYTHING!")
    else:
        if item:
            INVENTORY.add(item)
            print(F"You take the {name}.")

@when("drop ITEM")
def remove_item(name):
    if INVENTORY.take(name):
        say(F"Dropped {item}.")
    else:
        say(F"You're not even carrying a {name}.")









# 
