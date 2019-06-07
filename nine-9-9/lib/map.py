import lib.utils as utils
import items.third_class_cabin as third_class_cabin

from colorama import Fore
from lib.factory import build_item, build_room

def obj_desc(object):
    desc = utils.color_foreground(str(object), object.color)
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
    "Third Class Cabin",
    F"""You're in what appears to be a passenger cabin on a ship. The only way out is through the {obj_desc(cabin_door)}.
Against one wall is a {obj_desc(cabin_bed)}.""",
    items=[third_class_cabin.flashlight],
    objects=[cabin_door, cabin_bed],
    north=hallway
)
# ------------------------------------------------------------------------------
CURRENT_ROOM = cabin
# ------------------------------------------------------------------------------
