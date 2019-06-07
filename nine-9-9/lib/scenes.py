import pyfiglet
from colorama import Fore

import lib.utils as utils
from lib.cut_scene import CutScene

intro = CutScene("Intro")
intro.add_action(utils.clear_screen, pause=False)
intro.add_dialogue(utils.color_foreground(pyfiglet.figlet_format("999"), Fore.RED))
intro.add_dialogue(utils.color_foreground(pyfiglet.figlet_format("Nine Hours"), Fore.WHITE))
intro.add_dialogue(utils.color_foreground(pyfiglet.figlet_format("Nine Persons"), Fore.WHITE))
intro.add_dialogue(utils.color_foreground(pyfiglet.figlet_format("Nine Doors"), Fore.RED))
intro.add_dialogue("""
Off in the murky, fog shrouded distance appears a cruise ship. It slowly turns broadside as it explodes in a fireball.
""")
