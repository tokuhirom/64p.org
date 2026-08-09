# Welcome to Notes

This corner is for jotting down small things I looked up, often with help from an AI assistant — quick research results, snippets, and things I don't want to forget.

Unlike [the blog](https://blog.64p.org/), these are meant to be short and informal.

## Example: code blocks

Code snippets are rendered with syntax highlighting:

```perl
use strict;
use warnings;

sub greet {
    my ($name) = @_;
    return "Hello, $name!";
}

print greet("world"), "\n";
```

```bash
# a quick shell one-liner
find . -name '*.md' | xargs wc -l
```

## Adding a new note

Drop a new Markdown file into `notes/src/`, with the title as the first line (either `# Title` or plain text), then run:

```sh
perl regen-index.pl
```
