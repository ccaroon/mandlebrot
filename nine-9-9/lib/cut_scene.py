from abc import ABC, abstractmethod

class CutScene:

    def __init__(self, name):
        self.__name = name
        self.__events = []

    def add_action(self, action, pause=True):
        self.__events.append(CutScene.Action(action, pause))

    def add_dialogue(self, statement, pause=True):
        self.__events.append(CutScene.Dialogue(statement, pause))

    def play(self):
        # count = len(self.__events)
        for i, event in enumerate(self.__events):
            event.run()
            # prompt = F"{i+1}/{count}".center(80, "-")
            # input(prompt)
            if event.pause:
                input()

    # Sub Classes
    class Event(ABC):
        def __init__(self, pause):
            self.pause = pause

        @abstractmethod
        def run(self):
            pass

    class Action(Event):
        def __init__(self, action, pause=True):
            self.__action = action
            super().__init__(pause)

        def run(self):
            self.__action()

    class Dialogue(Event):
        def __init__(self, statement, pause=True):
            self.__stmt = statement
            super().__init__(pause)

        def run(self):
            print(self.__stmt)
