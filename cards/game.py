class Game:
    def __init__(self, dealer, players):
        self.__dealer = dealer
        self.__players = players

    def change_dealers(self):
        pass

    def play_hi_low(self):
        self.__dealer.shuffle()
        self.__dealer.deal(self.__players, 1)

        winner = self.__players[0]
        for p in self.__players:
            print("===== %s =====" % p.name)
            p.show_hand()

            if p.hand() > winner.hand():
                winner = p

        print("---*** WINNER ***---")
        print(winner)
        winner.show_hand()

