import lib.utils as utils
import items.third_class_cabin as items

from .space import Space
from .hallway import room as hallway
# ------------------------------------------------------------------------------
room = Space(
    "Third Class Cabin",
    F"""
You're in what appears to be a passenger cabin on an old ship, reminiscent of the Titanic. 
The only way out is through the {items.door.state_desc()}.

A set of {items.bunks_1.state_desc()} is against the wall on the right side of the room, 
while a set of {items.bunks_2.state_desc()} is against the left wall.

There's a {items.mirror.state_desc()} between the {items.bunks_2} and the front wall.

At the back of the room is a {items.porthole.state_desc()} with a {items.table}
under it.
""",
    # items=[items.red_key],
    objects=[
        items.door, items.bunks_1, items.pillow, items.bunks_2, items.mirror, 
        items.porthole, items.table
    ],
    north=hallway
)
