# Etch-A-Sketch
Toy *Etch-A-Sketch* project using vanilla `JavaScript`, `HTML`, and `CSS`, as part of the Odin Project Foundations lesson. Live demo [hero](https://kckuei.github.io/odin-etch-a-sketch/).

### Features
V2 of *Etch-A-Sketch* features:
* Hotkeys!
* Pick your color of choice!
* Draw in monochrome colors!
* Draw in rainbow mode!
* Made a booboo? Erase a section of your canvas!
* Sick of the whole thing? Clear the canvas in one stroke!
* Increase the resolution of the canvas! (but be weary of latency!)
* Show the gridlines!


### Some Useful References
* For achieving a gradually changing sequential color spectrum versus randomly selecting colors, these two resources were helpful: 
  * [Link 1](https://nicoguaro.github.io/posts/cyclic_colormaps/)
  * [Link 2](https://krazydad.com/tutorials/makecolors.php)

* Toggle button effect sourced from [here](https://www.w3schools.com/howto/howto_css_switch.asp).

### Reflection and Ideas
Some future features that could be fun to work on/add:
* Add an undo or redo option
* Add a rainbow banner when in rainbow mode
* Add a line weight option
* Add a box or lasso-selection option
* Add a save canvas option
* Add an eraser icon when erasing
* Add a pixelated odin on page initiation
* Add a grid flutter animation for blocks to move away from cursor (because it would look really cool!)
* Before any of the above, maybe see if we can write our code or optimize it to avoid hangups at higher resolutions
* Create an object to store all the state variables
* Refactor/re-organize the code to perhaps follow a functional or OOP paradigm

### Note to Self
* Pushing the headers and footers to the edges with margin-top/bottom seems to mess with the drawing responsiveness