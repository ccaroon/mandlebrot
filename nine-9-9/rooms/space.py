from adventurelib import Bag, Room

class Space(Room):
    # items   - Items in the room that can be picked up.
    # objects - Items in the room that are stationary but can be interacted with:
    #           I.e. doors, windows, floor, carpet, large paintings, etc.
    # NESW    - Exit to another room in that direction.
    def __init__(self, name, desc, items=[], objects=[], north=None, east=None, south=None, west=None):
        super().__init__(desc)
        self.name = name

        self.items = Bag()
        for item in items:
            self.items.add(item)

        self.objects = Bag()
        for obj in objects:
            self.objects.add(obj)

        self.north = north
        self.east = east
        self.south = south
        self.west = west
