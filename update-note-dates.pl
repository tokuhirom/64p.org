#!/usr/bin/env perl
# Run by lefthook's pre-commit hook (see lefthook.yml). Given staged
# notes/src/*.md paths as argv, stamps YAML frontmatter with created/updated
# timestamps, then regenerates the site as a validation pass (broken [[links]]
# warn here). Build output is gitignored and deployed via GitHub Actions, so
# only the stamped sources are re-staged.
use strict;
use warnings;

my @md_files = @ARGV;
exit 0 unless @md_files;

my ($min, $hour, $mday, $mon, $year) = (localtime)[1, 2, 3, 4, 5];
my $now = sprintf('%04d-%02d-%02d %02d:%02d', $year + 1900, $mon + 1, $mday, $hour, $min);

for my $file (@md_files) {
    next unless -f $file;

    open my $fh, '<:utf8', $file or die "Cannot open $file: $!";
    my $content = do { local $/; <$fh> };
    close $fh;

    if ($content =~ /\A---\n(.*?)\n---\n/s) {
        my $fm = $1;
        if ($fm =~ /^updated:\s*.+$/m) {
            $fm =~ s/^updated:\s*.+$/updated: $now/m;
        }
        else {
            $fm .= "\nupdated: $now";
        }
        $content =~ s/\A---\n.*?\n---\n/---\n$fm\n---\n/s;
    }
    else {
        $content = "---\ncreated: $now\nupdated: $now\n---\n" . $content;
    }

    open my $ofh, '>:utf8', $file or die "Cannot open $file for writing: $!";
    print {$ofh} $content;
    close $ofh;
}

system('perl', 'regen-index.pl') == 0
    or die "regen-index.pl failed\n";

system('git', 'add', 'notes/src/') == 0
    or die "git add failed\n";
