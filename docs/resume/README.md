# Editing the resume PDF without Enhancv

The resume was built in Enhancv and there is no source file. Enhancv access is
gone, so the PDF itself is the only master. These scripts edit it in place.

Nothing here ships. `build.sh` copies a fixed list of paths into `dist/`, and
`docs/` is not on it.

## Why this is not a one-liner

Enhancv draws every character as its own positioned `Tj` against a subset font
with Identity-H encoding, so the file contains no searchable text. A string swap
is impossible; the glyph ids and their advance widths both have to be rebuilt.

Two coordinate systems overlap on the page. Text draws under a CTM scale of
**0.63431** (a `Tf 13` run renders at 8.25pt), the contact-row icons under
**0.24**. Mixing them silently puts things in the wrong place.

`decode.py` reverses the encoding: it walks each `BT..ET` block, decodes the
glyph runs through the font's ToUnicode CMap, and reports the text with byte
offsets and page coordinates. `patch.py` splices new runs back in, reusing the
glyph ids and `/W` widths already embedded in the file. No font is added and no
text is drawn over the old text, so the output is metrically identical to
Enhancv's and `pdffonts` shows the same six fonts as the input.

## Constraints worth knowing before editing

- **Only characters already in the subsets are available.** Inter-Bold has no
  `3`, `6`, `;` or em dash, because the resume never bolded them. `patch.py`
  raises `KeyError` rather than emitting a blank. Inter-Regular covers far more.
- **Replacement text must occupy the same number of lines.** Nothing reflows:
  every line is absolutely positioned, so a seventh line in a six-line bullet
  overprints whatever sits below it. `patch.py` aborts if the wrap count moves.
- **Wrap to 298.5pt** for the left column. That is the width the original lines
  were broken against, derived from where its own lines ended.
- **Wrap every new run in an `ActualText` span.** Some glyphs have a broken
  ToUnicode entry (the em dash maps to U+0000): it renders correctly but
  extracts as nothing, which means an ATS reading the file as text loses it.
  Enhancv works around this the same way.
- **Shifting text means shifting its icon too.** The contact row is tightly
  packed, so shortening an item leaves a visible hole. `patch.py` moves the pin
  icon and the location text left by the exact width the URL gave up.

## Running it

Inter is a variable font; the two weights are instanced from it with fontTools.
The copy under `ghost-test` is the one used so far, and any Inter with a `wght`
axis works. Measured against an untouched original line, the instanced metrics
came within 0.26%.

```bash
python3 -m venv venv && ./venv/bin/pip install reportlab pypdf fonttools
```

`decode.py <needle>` locates text and prints byte offsets. Put those offsets in
`patch.py`, edit the strings, and run it. It prints the wrap before writing.

Always diff the extracted text afterwards. It catches both a botched splice and
a change you did not intend:

```bash
pdftotext old.pdf - > a.txt && pdftotext new.pdf - > b.txt && diff a.txt b.txt
```

## If this stops being worth it

Anything that changes line counts, moves sections, or edits page 2's sidebar is
past what splicing handles well. At that point rebuild the resume as HTML with
print CSS and print it to PDF from Chrome. Two pages of text, one headshot,
Inter and Rubik is the whole design, and `decode.py` will dump the current
content to start from.
