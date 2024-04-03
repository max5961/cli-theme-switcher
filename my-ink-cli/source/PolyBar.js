import React from 'react';
import {spawn} from 'node:child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import {MenuBuilder} from './MenuBuilder.js';

const options = [
	{
		name: 'Mono Dark',
		basename: 'mono-dark',
	},
	{
		name: 'Transparent Mono Dark',
		basename: 'transparent-mono-dark',
	},
	{
		name: 'Gruvbox',
		basename: 'gruvbox',
	},
	{
		name: 'Chnvok',
		basename: 'chnvok',
	},
	{
		name: 'Catppuccin',
		basename: 'catppuccin',
	},
];

function launchPolyBar() {
	const polybar = spawn('/home/max/common/dotfiles/polybar/launch.sh', [], {
		detached: true,
		stdio: 'ignore',
	});
	polybar.unref();
}

async function modifyTheme(index) {
	const basename = options[index].basename;
	const home = os.homedir();
	const filePath = path.join(home, '.config', 'polybar', 'config.ini');
	const regex = /\; colorscheme\ninclude-file.*/gm;
	const newLine = `; colorscheme\ninclude-file = ${home}/.config/polybar/colors/${basename}.ini`;

	try {
		const data = await fs.readFile(filePath, 'utf-8');
		const modifiedData = data.replace(regex, newLine);
		await fs.writeFile(filePath, modifiedData, 'utf-8');
	} catch (error) {
		console.error(error);
	}

	launchPolyBar();
}

export function PolyBar({setMenu}) {
	return (
		<MenuBuilder
			options={options}
			handleChoose={modifyTheme}
			setMenu={setMenu}
		/>
	);
}
