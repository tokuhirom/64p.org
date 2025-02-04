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
    my $xslate = Text::Xslate->new(
        syntax => 'TTerse',
        path => ['tmpl'],
    );
    my $dat = $xslate->render(
        'index.tt' => {
            talks => [@talks[0..7]],
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

if ($0 eq __FILE__) {
    TGP->regen();
}


1;

