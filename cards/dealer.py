from deck import Deck

class Dealer:

    def __init__(self, player):
        self.__player = player
        self.__deck = Deck()

    @property
    def name(self):
        return self.__player.name

    def change(self, player):
        self.__player = player

    def shuffle(self):
        self.__deck.shuffle()

    def deal(self, players, num_cards):
        for i in range(0, num_cards):
            for p in players:
                p.give_card(self.__deck.deal())

    @property
    def deck(self):
        return self.__deck
