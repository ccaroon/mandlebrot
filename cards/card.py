class Card:

    HEARTS = "♥"
    DIAMONDS = "♦"
    CLUBS = "♣"
    SPADES = "♠"

    JOKER = "🃏"
    # JOKER = "J"

    BIG = "B"
    SMALL = "S"
    JOKERS = (BIG, SMALL)

    SUITS = (CLUBS, DIAMONDS, HEARTS, SPADES)

    JACK = "J"
    QUEEN = "Q"
    KING = "K"

    ACE = "A"

    FACE_CARDS = (JACK, QUEEN, KING)

    def __init__(self, value, suit):
        self.__face_up = True

        if suit not in Card.SUITS and suit != Card.JOKER:
            raise ValueError("Invalid card suit: %s" % suit)
        else:
            self.__suit = suit

        if value in Card.FACE_CARDS or value == Card.ACE or value in Card.JOKERS or (value >= 1 and value <= 10):
            if value == 1:
                self.__value = Card.ACE
            else:
                self.__value = value
        else:
            raise ValueError("Invalid card value: %s" % str(value))

    def show(self):
        print(self)

    # TODO: get rid of this????
    def flip(self):
        pass
        # self.__face_up = not self.__face_up

    def __show_face_up(self):
        card = """+-----+
|%2s   |
|  %s  |
|   %2s|
+-----+""" % (self.__value, self.__suit, self.__value)

        return (card)

    def __show_face_down(self):
        card = """+-----+
|-----|
|-----|
|-----|
+-----+"""
        return (card)

    def __suit_rank(self):
        rank = 0
        if self.__suit == Card.CLUBS:
            rank = 1
        elif self.__suit == Card.DIAMONDS:
            rank = 2
        elif self.__suit == Card.HEARTS:
            rank = 3
        elif self.__suit == Card.SPADES:
            rank = 4

        return rank

    def __value_rank(self):
        rank = 0

        if self.__suit == Card.JOKER:
            rank = 0
        else:
            if self.__value == Card.JACK:
                rank = 11
            elif self.__value == Card.QUEEN:
                rank = 12
            elif self.__value == Card.KING:
                rank = 13
            elif self.__value == Card.ACE:
                rank = 14
            else:
                rank = self.__value

        return rank

    @property
    def rank(self):
        return self.__value_rank() * 10 + self.__suit_rank()

    def __eq__(self, other):
        return self.rank == other.rank

    def __lt__(self, other):
        return self.rank < other.rank

    def __gt__(self, other):
        return self.rank > other.rank

    def __str__(self):
        card = None
        if self.__face_up:
            card = self.__show_face_up()
        else:
            card = self.__show_face_down()

        return card
