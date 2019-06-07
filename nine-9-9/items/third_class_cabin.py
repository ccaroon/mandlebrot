from lib.factory import build_item

# ------------------------------------------------------------------------------
flashlight = build_item(
    "flashlight", 
    "It's one of those fancy LED flashlights. The batteries should last forever. Nifty!",
    aliases=("torch", "flashlite"),
    isa=['lightsource']
)
# ------------------------------------------------------------------------------
