from colorama import Fore

from scriptum.screen import Screen
from scriptum.scene import Scene

scene = Scene("Intro")
scene.add_action(Screen.clear, pause=False)
scene.add_dialogue("999",          enlarge=True, color=Fore.RED)
scene.add_dialogue("Nine Hours",   enlarge=True, color=Fore.WHITE)
scene.add_dialogue("Nine Persons", enlarge=True, color=Fore.WHITE)
scene.add_dialogue("Nine Doors",   enlarge=True, color=Fore.RED)
scene.add_dialogue("""
Off in the murky, fog shrouded distance appears a cruise ship. It slowly turns broadside as it explodes in a fireball.
""")
