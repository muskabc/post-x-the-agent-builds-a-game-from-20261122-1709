# Catch the Falling Stars

[![make.fun · post-x-the-agent-builds-a-game-from-20261122-1709](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/muskabc/post-x-the-agent-builds-a-game-from-20261122-1709/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)
[![reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/muskabc/post-x-the-agent-builds-a-game-from-20261122-1709/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709?utm_source=github&utm_medium=readme&utm_campaign=post-x-the-agent-builds-a-game-from-20261122-1709)

A tiny arcade game built by an AI agent from one prompt:

> "Build a small, fun game where stars fall from a night sky and the player catches them with a paddle."

Stars fall from a twinkling night sky. Move the glowing paddle to catch
them — +1 per catch, golden stars are worth +3, and every 5-catch streak
pays a +2 bonus and widens the paddle. Miss 3 stars and the game is over.

## How to play

- **Mouse / finger / arrow keys** — move the paddle
- Catch falling stars, chase the golden ones
- 5 in a row charges the paddle wider; a miss discharges it
- 3 misses ends the game — your session best is saved

## Run it locally

```sh
# any static server works, e.g.
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

`index.html` is a single self-contained file with no network dependencies.

## Entry

This repo is the entry for the make.fun bounty
[The agent builds a game from one prompt](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709).
The video post on X is linked in `POST.json`; `main.ts` copies it to the
output directory for the grader.
