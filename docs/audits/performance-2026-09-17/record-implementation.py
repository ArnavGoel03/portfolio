#!/usr/bin/env python3
"""Update one project in the sequential implementation queue, without losing rows."""
import argparse
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("project")
parser.add_argument("status")
parser.add_argument("work")
args = parser.parse_args()
if any("|" in value or "\n" in value for value in (args.project, args.status, args.work)):
    parser.error("Table values must be single lines without pipes")
path = Path(__file__).with_name("IMPLEMENTATION.md")
lines = path.read_text().splitlines()
matched = [i for i, line in enumerate(lines) if line.startswith("| ") and line.split("|")[2].strip() == args.project]
if len(matched) != 1:
    parser.error(f"Expected one row for {args.project}, found {len(matched)}")
lines[matched[0]] = f"| {args.status} | {args.project} | {args.work} |"
path.write_text("\n".join(lines) + "\n")
print(f"{args.project}: {args.status}")
