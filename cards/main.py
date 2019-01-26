#!/usr/bin/env python
from card import Card
# from deck import Deck
from dealer import Dealer
from game import Game
from player import Player

# ------------------------------------------------------------------------------
p1 = Player("Cate")
p2 = Player("Craig")

dealer = Dealer(p1)

game = Game(dealer, (p1,p2))

game.play_hi_low()
# ------------------------------------------------------------------------------
