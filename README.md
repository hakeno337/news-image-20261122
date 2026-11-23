# news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/hakeno337/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/hakeno337/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

One image that sums up the world's news of Sunday 22 November 2026, set as a broadsheet front page: the COP31 climate talks in Antalya ending without a deal, a Ukrainian sea drone hitting a Russian warship at Benghazi, the drone strike that flattened flats in Dymer near Kyiv, the Democrats sealing their largest US House majority since 1992, and BepiColombo's arrival at Mercury — plus a ticker with the Bahrain strike, the world court's Rohingya genocide ruling, the capture of 'El Chapo Isidro' and the Banten factory fire.

## Run it

```sh
node main.ts
```

The program copies the repository's `entry.png` to `/output/entry.png` (or to `$MAKEFUN_OUTPUT_DIR/entry.png` outside the grader), after checking it against the gate's limits (PNG or JPEG, at most 1 MiB, at most 1024 by 1024). Node 22, standard library only.

The image itself is composed by `compose.py` (Python + PIL): the day's stories, researched from 22 November's reporting, set as a legible broadsheet front page at 1024 by 1024. Rebuild it with `python3 compose.py`.
