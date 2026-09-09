# Destination Home case study

| Where | What it is |
|---|---|
| [`/portfolio/destination-home/`](../../portfolio/destination-home/index.html) | The page on the site. This is what the list card links to. |
| [`components/work-list.js`](../../components/work-list.js) | The card summary and the ten gallery captions. |

## Adoption status

Dylan confirmed on 8 September 2026 that Destination Home has been adopted by
Sterling Lexicon. The portfolio card and case study reflect that confirmation.
Adoption scope, user counts and measured business impact were not supplied.
The earlier engineering review and screenshots remain historical evidence;
deployment dependencies and review findings were not reverified in this update.

## Re-shooting the screenshots

The app is not public, so the screenshots come from a local build of
`~/Documents/projects/lexicon_v2`. Three things have to be up first.

```bash
cd ~/Documents/projects/lexicon_v2 && docker compose up -d
```

```bash
cd ~/Documents/projects/lexicon_v2/server/DestinationHome.Api && OPENAI_API_KEY=... dotnet run --no-launch-profile --urls http://localhost:5283
```

```bash
cd ~/Documents/projects/lexicon_v2/angular && npx ng serve --port 4200
```

Then drive it. Playwright is not a dependency of this static site, so point
`NODE_PATH` at a project that has it.

```bash
NODE_PATH=/Users/devbydylan/Documents/projects/2k26/node_modules node docs/destination-home/src/capture.mjs
```

Two things will bite if you skip the setup:

- **SQL Server has to be running**, or every session write returns 500. The UI
  survives it, but the run cannot resume and the plan drawer counts drift.
- **The API's `SessionDb` connection string has to be present**, even when SQL
  itself is down. Blank it and the app takes its no-database path, where one
  endpoint's `sessions` parameter is inferred as a body parameter and poisons the
  whole route matcher, so every request 500s. That gap is tracked in the app's
  own repo, not here.

The capture drives a real intake, so it spends a few tenths of a cent of model
tokens per run and takes about six minutes.

## Rebuilding what the site ships

```bash
bash docs/destination-home/src/build-derivatives.sh
```

The site never loads a PNG. `work-list.js` maps every source path through its
`variant()` helper into `/images/cards/`, `/images/thumbs/` and `/images/full/`,
so a fresh screenshot stays invisible until this runs. The PNG masters in
`images/destination-home/` stay on disk and do not ship.

## What the screenshots are allowed to claim

The screenshots show the earlier pre-production build, and two things in these frames are not real data.
The program corpus it answers from is placeholder content, and the seeded
neighborhood list was hand-typed from memory, which the data file itself
discloses. A later probe against a real neighborhood dataset agreed with six of
the eight Austin entries.

Measurement provenance in the ranked areas is genuine where it is shown, which is
the point of the provenance plate. Anything the app could not measure says so on
screen rather than showing a bar.

Everything quoted in the case study traces back to the project's own verified
inventory. If a figure here disagrees with that repo, that repo wins.
