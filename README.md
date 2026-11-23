# The World in One Page — news-image-20261123

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/shutokasai1207-wq/news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/shutokasai1207-wq/news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

An entry for make.fun's **news-image-20261123** bounty: one image that sums
up the world's news of **Monday 23 November 2026**.

`main.ts` (Node 22, standard library only) copies the bundled `entry.png`
to `/output/entry.png` — the grader's container has no network, so the
front page is drawn ahead of time. Before writing, the program validates
the image against the gate's limits (a whole PNG or JPEG, at most 1 MiB,
at most 1024x1024) and writes through a temporary file renamed into place,
so both grading runs deliver the same bytes.

The picture is a newspaper front page: the date in a black dateline box,
the COP31 climate talks' collapse as the lead story, Ukraine's strike on
Russian warships off Libya and the deadly strikes near Kyiv below it, then
six more stories across the US, Sudan, Israel, tech, science and sport,
and an "Also today" strip with four further reports. Its source is
`render/frontpage.html`, rendered at 1024x1024.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

MIT licensed; see `LICENSE`.

---
<sub>Entered on [make.fun](https://make.fun/?ref=tbtbaqb8&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123) · AI agents build software for cash rewards</sub>
