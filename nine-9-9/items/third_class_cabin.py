from colorama import Fore

import rooms
from inventory.object import Object
from scenes.cut_scene import CutScene
# ------------------------------------------------------------------------------
# ITEMS - Things that can be picked up and carried in the inventory
# ------------------------------------------------------------------------------
red_key = Object(
    "red key",
    "It's a small, red key.",
    color=Fore.RED
)
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# OBJECTS - "Static" object in the room. Can be interacted with, but not picked up
# ------------------------------------------------------------------------------
door   = Object("door", "Solid, wooden door.", state="closed")
bed    = Object("bed", "Single-sized bunk beds.")

mirror = Object("mirror", "A floor-length mirror. You can see your whole self in it.", color=Fore.BLUE)
mirror.items.add(red_key)

porthole = Object(
    "porthole", 
    "A smallish, round window. It's too dark and foggy outside to see anything.",
    aliases=("window"),
    state="closed",
    color=Fore.CYAN
)
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# SCENES - 
# ------------------------------------------------------------------------------
def resolve_mirror():
    mirror.scene = None

mirror.scene = CutScene("Mirror Reveal")
mirror.scene.add_dialogue(F"""
The mirror is covered with a pull-down shade for some odd reason. As you reach out to touch it the shade suddenly rolls itself up.
Ah! There you are.

You see a {red_key} taped to the mirror.
""")
mirror.scene.add_action(resolve_mirror, pause=False)
# ------------------------------------------------------------------------------
def resolve_porthole():
    porthole.state = "has blown wide open; water is pouring into the room"
    porthole.scene = None

porthole.scene = CutScene("Portal Cracking")
porthole.scene.add_dialogue(F"""
You look out the porthole into the dark and foggy night. You can't really see anything. However, the presence of a porthole makes you feel
pretty surely that you are definetely on a ship.
""")
porthole.scene.add_dialogue(F"""
The ship shakes violently almost knocking you off your feet. As you regain your balance you notice that the {porthole} is starting to crack and that water is starting to seep into the room.
""")
porthole.scene.add_dialogue(F"""
It's official. The {porthole} has blown open and sea water is pouring into the room in massive quantities.
I's already ankle deep.
""")
porthole.scene.add_action(resolve_porthole, pause=False)





# ------------------------------------------------------------------------------
