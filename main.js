#!/usr/bin/env node

const fs = require('fs');
const toml = require('toml');
const path = require('path');
const { argv } = require('yargs')
const frontmatter = require('frontmatter');


console.log(process.env);


// 参数
const { config } = argv;

// 运行目录
const pwd = process.env.PWD;

// 默认数据
const workConfig = {
	world: './world.toml',
	roles: './roles.toml',
	chapters: './chapters',
	outline: './outline.toml'
};

const root = path.resolve(pwd, config);

const readToml = (suffix) => {
	const filepath = path.resolve(root, suffix);
	const fileContent = fs.readFileSync(filepath);
	return toml.parse(fileContent.toString());
};

const configPath = path.resolve(root, 'meta.toml');

if (fs.existsSync(configPath)) {
	const content = fs.readFileSync(configPath);
	const userConfig = toml.parse(content.toString());
	Object.assign(workConfig, userConfig);
} else {
	console.log(`请创建（${configPath}）完善书本基础信息`);
}

const roles = readToml(workConfig.roles);
const world = readToml(workConfig.world);

const chapters = fs.readdirSync(path.resolve(root, workConfig.chapters));

console.log('workConfig', workConfig);
console.log('chapters', chapters);
console.log('roles', roles);
console.log('world', world);

