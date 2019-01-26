import random

from card import Card

class Deck():
    def __init__(self, **kwargs):
        self.__cards = []
        for suit in Card.SUITS:
            for cv in range(1,11):
                self.__cards.append(Card(cv,suit))

            for cv in Card.FACE_CARDS:
                self.__cards.append(Card(cv, suit))

        if kwargs.get('jokers', False):
            self.__cards.append(Card(Card.BIG, Card.JOKER))
            self.__cards.append(Card(Card.SMALL, Card.JOKER))

    def show(self, per_row=1):
        for c in self.__cards:
            c.show()

    def shuffle(self):
        random.shuffle(self.__cards)

    def pick(self):
        i = random.randint(0, len(self.__cards)-1)
        return self.__cards.pop(i)

    def deal(self):
        return self.__cards.pop()

    def count(self):
        return len(self.__cards)
