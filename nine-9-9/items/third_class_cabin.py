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
door   = Object("door", "Solid, wooden door.", state="closed", color=Fore.YELLOW)
bed    = Object("bed", "Single-sized bunk beds.", color=Fore.CYAN)
mirror = Object("mirror", "A floor-length mirror. You can see your whole self in it.", color=Fore.BLUE)
mirror.items.add(red_key)
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# SCENES - 
# ------------------------------------------------------------------------------
mirror.scene = CutScene("Mirror Reveal")
mirror.scene.add_dialogue(F"""
The mirror is covered with a pull-down shade for some odd reason. As you reach out to touch it the shade suddenly rolls itself up.
Ah! There you are.

You see a {red_key} taped to the mirror.
""")
def resolve_mirror():
    # Add red_key to room items
    # rooms.CURRENT_ROOM.items.add(red_key)
    # Stop this scene from triggering again
    mirror.scene = None
mirror.scene.add_action(resolve_mirror, pause=False)
# ------------------------------------------------------------------------------
