const fs = require('fs');
const path = require('path');
const toml = require('toml');

const readToml = (root, suffix) => {
	const filepath = path.resolve(root, suffix);
	if(!fs.existsSync(filepath)) {
		return {};
	}
	const fileContent = fs.readFileSync(filepath);
	return toml.parse(fileContent.toString());
};

// 默认数据
const workConfig = {
	world: './world.toml',
	roles: './roles.toml',
	chapters: './chapters',
	outline: './outline.toml'
};

const read = (root) => {
	const meta = readToml(path.resolve(root, 'meta.toml'))
	console.log(root, meta);
}

module.exports = {
	read
};