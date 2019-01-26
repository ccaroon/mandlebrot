
class Player:
    def __init__(self, name):
        self.__name = name
        self.__cards = []

    @property
    def name(self):
        return self.__name

    def show_hand(self):
        for card in self.__cards:
            card.flip()
            card.show()

    def give_card(self, card):
        self.__cards.append(card)

    def hand(self, card_num=0):
        return self.__cards[card_num]

    def __str__(self):
        return self.__name
