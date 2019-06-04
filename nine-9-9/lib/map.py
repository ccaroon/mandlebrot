from adventurelib import *
from colorama import Fore, Style

from lib.factory import build_item, build_room
import lib.game_items as game_items

def obj_desc(object):
    desc = F"{object.color}{object}{Style.RESET_ALL}"
    if object.state:
        desc += F" which is {object.state}"
    return desc

# ------------------------------------------------------------------------------
hallway = build_room(
    "Ship's Passenger Corridor",
    "It's a hallway. There are doors all along it to other passenger cabins."
)
# ------------------------------------------------------------------------------
cabin_door = build_item("door", "Solid, wooden door.", state="closed", color=Fore.YELLOW)
cabin_bed = build_item("bed", "Single-sized bunk beds.", color=Fore.CYAN)
cabin = build_room(
    "Passenger Cabin",
    F"""You're in what appears to be a passenger cabin on a ship. The only way out is through the {obj_desc(cabin_door)}.
Against one wall is a {obj_desc(cabin_bed)}.""",
    items=[game_items.flashlight],
    objects=[cabin_door, cabin_bed],
    north=hallway
)
# ------------------------------------------------------------------------------
CURRENT_ROOM = cabin
# ------------------------------------------------------------------------------
