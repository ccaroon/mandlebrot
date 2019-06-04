from adventurelib import Bag, Item, Room
from colorama import Fore

"""Help functions to give consistenty to created Items and Rooms"""

def build_item(name, desc, aliases=[], isa=[], state=None, color=Fore.WHITE):
    item = Item(name, *aliases)
    item.isa = isa
    item.desc = desc
    item.state = state
    item.color = color

    return (item)

# items   - Items in the room that can be picked up.
# objects - Items in the room that are stationary but can be interacted with:
#           I.e. doors, windows, floor, carpet, large paintings, etc.
# NESW    - Exit to another room in that direction.
def build_room(name, desc, items=[], objects=[], north=None, east=None, south=None, west=None):
    room = Room(desc)
    room.name = name

    room.items = Bag()
    for item in items:
        room.items.add(item)

    room.objects = Bag()
    for obj in objects:
        room.objects.add(obj)

    room.north = north
    room.east = east
    room.south = south
    room.west = west

    return (room)
