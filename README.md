# :warning: Important Note for future explorers

If you’re looking for good examples of how to build games in Excalibur, please visit the [official sample gallery](https://excaliburjs.com/samples/).

We don’t recommend using this game’s source code as an example for your own work
- it was built quickly during a game jam; the code likely cuts a few corners and is a bit messy in some places
- the version of Excalibur it's using is out-of-date; the API has likely changed, and there are newer, better design patterns for building games using the Excalibur engine.

If you’d like to explore for curiosity’s sake, go on ahead, and good luck!

*- the Excalibur.js team*

---

## ludum-41

Ludum Dare 41 Game Jam (April 20-23, 2018) http://excaliburjs.com/ludum-41

## Setup

### Set up Excalibur submodule:

    git submodule init
    git submodule update
    git fetch

### Build Excalibur:

    cd lib/excalibur
    npm install
    npm run all

## Compiling the game

You will need Node.js and NPM installed.

To compile:

    npm install
    npm start

To update local copy of Excalibur from submodule:

    npm run copy

## Using VSCode

`Ctrl+Shift+b` will run `npm start` and compile on changes

## Git workflow

- use "Pull (Rebase)" from the Source Control panel of VSCode
