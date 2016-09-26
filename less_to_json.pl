use strict;
use warnings;

my @data;

open my $fh, "<:encoding(UTF-8)", "open-color.less" or die $!;
while (<$fh>) {
	next unless /^\@oc-([a-z]+)-list:\s*([^;]+);?$/;
	push @data, (
		sprintf '%10s: [%s]', qq/"$1"/, (
			join ', ', map{qq/"$_"/} split(/\s*,\s*/, $2)
		)
	)
}
close $fh;

open my $fs, ">:encoding(UTF-8)", "open-color.json" or die $!;
print $fs "{\n" . (join ",\n", @data) . "\n}\n";
close $fs;
