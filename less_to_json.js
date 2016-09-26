const {readFileSync, writeFileSync} = require('fs')

const data = []

// see also: https://www.npmjs.com/package/left-pad
String.prototype.leftPad = function(len) {
	return ' '.repeat(len - this.length) + this
}

readFileSync('open-color.less').toString('utf-8').split(/\r?\n/).forEach(line => {
	var m
	if((m = line.match(/^@oc-([a-z]+)-list:\s*([^;]+);?$/)) == null) return;
	const key = (`"${m[1]}"`).leftPad(10)
	const value = m[2].split(/\s*,\s*/).map(v=>`"${v}"`).join(', ')
	data.push(`${key}: [${value}]`)
})

writeFileSync('open-color.json',
	['{', data.join(',\n'), '}'].join('\n') + '\n'
)
