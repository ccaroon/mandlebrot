#!/usr/bin/env python
import adventurelib

import random
from lib.context import Context
import lib.contexts as contexts
import lib.commands

# ------------------------------------------------------------------------------
def prompt():
    if Context.ACTIVE:
        return F"999 - {Context.get()}> "
    else:
        return F"999> "
adventurelib.prompt = prompt

def invalid_command(cmd):
    print(random.choice([
        "Huh?",
        F"I don't know how to '{cmd}'",
        "Ummm...what?"
    ]))
adventurelib.no_command_matches = invalid_command

Context.add(contexts.CHEATING)
Context.add(contexts.LOCKED_IN)
# ------------------------------------------------------------------------------
adventurelib.start(help=True)
