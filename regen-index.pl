#!/usr/bin/perl
use strict;
use warnings;
use lib 'lib';
use File::Basename;
use Time::Piece;

$|++;

binmode STDOUT, ':utf8';

package TGP;

use Text::Xslate;

sub regen {
    my @talks = TGP::Talks->regen();
    my @notes = TGP::Notes->regen();
    my @recent_notes = @notes > 5 ? @notes[0..4] : @notes;
    my $xslate = Text::Xslate->new(
        syntax => 'TTerse',
        path => ['tmpl'],
    );
    my $dat = $xslate->render(
        'index.tt' => {
            talks => [@talks[0..7]],
            notes => \@recent_notes,
            now   => scalar(localtime),
        },
    );
    spew('index.html', $dat);
}

sub spew {
    my $fname = shift;
    print("Writing $fname\n");
    open my $fh, '>:utf8', $fname
        or Carp::croak("Can't open '$fname' for writing: '$!'");
    print {$fh} $_[0];
}

package TGP::Talks;

use File::Basename;
use Time::Piece;

sub regen {
    my @files = files();

    my %titles;
    my %dates;
    for my $file (@files) {
        my $htmlfile = "talks/$file/index.html";
        next unless -f $htmlfile;

        my ($fname) = glob("talks/$file/*.txt");
        $fname or die "Missing txt file in $file";
        open my $fh, '<:utf8', $fname or die "Cannot open file $fname: $!";
        my $title = <$fh>;
        $title = <$fh> if $title =~ /Format:/;
        $title =~ s{^TITLE::}{};
        $title =~ s/\n$//;
        $title =~ s/^\x{FEFF}//;
        # print "$title talks/$file\n";
        replace_title($htmlfile, $title);
        $titles{$file} = $title || '-';
        $dates{$file} = scalar(localtime->strptime(substr($file, 0, 8), '%Y%m%d'));
    }

    my %data;
    for my $file (@files) {
        my $year = substr($file, 0, 4);
        push @{$data{$year}}, $file;
    }

    my $dat = [ map { +{ year => $_, files => $data{$_} } } reverse sort keys %data ];
    my @talks = (
        map { +{
            link => "/talks/$_/index.html",
            title => $titles{$_},
            date => $dates{$_},
        } }
        grep { $titles{$_} }
        @files
    );

    my $xslate = Text::Xslate->new(
        syntax => 'TTerse',
        path => ['tmpl'],
    );
    my $html = $xslate->render(
        'talks.tt' => {
            talks => \@talks,
        },
    );
    spew('talks/index.html', $html);

    return @talks;
}

sub spew {
    my $fname = shift;
    print("Writing $fname\n");
    open my $fh, '>:utf8', $fname
        or Carp::croak("Can't open '$fname' for writing: '$!'");
    print {$fh} $_[0];
}

sub files {
    my @f;
    while (my $f = glob('talks/20*')) {
        push @f, basename($f);
    }
    reverse sort { $a cmp $b } @f;
}

sub replace_title {
    my ($filename, $title) = @_;
    open my $ifh, '<:utf8', $filename or die "Cannot open $filename: $!";
    my $src = do { local $/; <$ifh> };
    $src =~ s!<title>.+?</title>!<title>$title</title>!;
    close $ifh;

    open my $ofh, '>:utf8', $filename or die "Cannot open $filename: $!";
    print {$ofh} $src;
    close $ofh;
}

package TGP::Notes;

use Text::Markdown::Discount qw(markdown);
use File::stat;
use Time::Piece;

sub regen {
    # pass 1: slurp every note's raw markdown + slug + title, before any
    # cross-note resolution (wikilinks need to see every title first).
    my @raw = map {
        my $src = $_;
        open my $fh, '<:utf8', $src or die "Cannot open $src: $!";
        my $mkdn = do { local $/; <$fh> };
        my ($title) = ($mkdn =~ /\A#?\s*(.+?)\n/);
        (my $slug = $src) =~ s!^notes/src/!!;
        $slug =~ s/\.md$//;
        +{
            src   => $src,
            slug  => $slug,
            title => $title,
            mkdn  => $mkdn,
            mtime => stat($src)->mtime,
        };
    } glob('notes/src/*.md');
    my %title_by_slug = map { $_->{slug} => $_->{title} } @raw;

    # pass 2: resolve [[slug]] / [[slug|label]] wikilinks into normal
    # markdown links, and record who links to whom for backlinks.
    # Fenced/inline code is protected first, so example [[wikilink]] text
    # in code blocks isn't mistaken for a real link.
    my %backlinks;
    for my $note (@raw) {
        my @protected;
        $note->{mkdn} =~ s{(```.*?```|`[^`\n]*`)}{
            push @protected, $1;
            "\x01$#protected\x02";
        }gse;
        $note->{mkdn} =~ s{\[\[([\w\-]+)(?:\|([^\]]+))?\]\]}{
            my ($target, $label) = ($1, $2);
            if (exists $title_by_slug{$target}) {
                $backlinks{$target}{$note->{slug}} = 1;
                '[' . ($label // $title_by_slug{$target}) . "](/notes/$target.html)";
            }
            else {
                warn "notes/src/$note->{slug}.md: broken wikilink [[$target]]\n";
                '**' . ($label // $target) . '**';
            }
        }ge;
        $note->{mkdn} =~ s{\x01(\d+)\x02}{$protected[$1]}ge;
    }

    # pass 3: render markdown -> html now that wikilinks are plain links.
    my @notes = map {
        my $slug = $_->{slug};
        my $link = "/notes/$slug.html";
        +{
            title     => $_->{title},
            body      => markdown(
                $_->{mkdn},
                Text::Markdown::Discount::MKD_AUTOLINK
                    | Text::Markdown::Discount::MKD_FENCEDCODE
                    | Text::Markdown::Discount::MKD_GITHUBTAGS,
            ),
            link      => $link,
            url       => "https://64p.org$link",
            file      => "$slug.html",
            slug      => $slug,
            mtime     => scalar(localtime($_->{mtime})),
            backlinks => [
                map { +{ title => $title_by_slug{$_}, link => "/notes/$_.html" } }
                sort { $title_by_slug{$a} cmp $title_by_slug{$b} }
                keys %{ $backlinks{$slug} // {} }
            ],
            has_backlinks => (keys %{ $backlinks{$slug} // {} } ? 1 : 0),
        };
    } reverse sort { $a->{mtime} <=> $b->{mtime} } @raw;

    my $xslate = Text::Xslate->new(
        syntax => 'TTerse',
        path => ['tmpl'],
    );
    for my $note (@notes) {
        my $res = $xslate->render(
            'note.tt' => {
                %$note,
                notes        => \@notes,
                current_file => $note->{file},
            },
        );
        spew("notes/$note->{file}", $res);
    }
    my $index = $xslate->render(
        'notes-index.tt' => {
            notes => \@notes,
        },
    );
    spew('notes/index.html', $index);

    return @notes;
}

sub spew {
    my $fname = shift;
    open my $fh, '>:utf8', $fname
        or Carp::croak("Can't open '$fname' for writing: '$!'");
    print {$fh} $_[0];
}

if ($0 eq __FILE__) {
    TGP->regen();
}


1;

