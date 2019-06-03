#!/usr/bin/env python
import adventurelib
from adventurelib import *

import random
import lib.commands

# ------------------------------------------------------------------------------
def prompt():
    return "--> "
adventurelib.prompt = prompt

def invalid_command(cmd):
    print(random.choice([
        "Huh?",
        F"I don't know how to '{cmd}'",
        "Ummm...what?"
    ]))
adventurelib.no_command_matches = invalid_command

set_context("dark")
# ------------------------------------------------------------------------------
start(help=False)
