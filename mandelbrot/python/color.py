class Color:

    COLORS = [
        (0,0,0),
        (255,0,0),
        (255,128,0),
        (255,255,0),
        (0,255,0),
        (0,0,255),
        (128,0,255),
        (255,0,255),
    ]

    @classmethod
    def rotate_pallete(self):
        c = Color.COLORS.pop(1)
        Color.COLORS.append(c)

    @classmethod
    def randomize_pallete(self):
        pass

    @classmethod
    def to_RGB(self, value):
        return Color.COLORS[value % 8]
