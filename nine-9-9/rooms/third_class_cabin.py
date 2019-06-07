import lib.utils as utils
import items.third_class_cabin as items

from .space import Space
from .hallway import room as hallway
# ------------------------------------------------------------------------------
room = Space(
    "Third Class Cabin",
    F"""You're in what appears to be a passenger cabin on a ship. The only way out is through the {items.door.state_desc()}.
Against one wall is a {items.bed.state_desc()}.""",
    # items=[items.flashlight],
    objects=[items.door, items.bed, items.mirror],
    north=hallway
)
