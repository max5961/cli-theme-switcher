import React from 'react';
import {MenuBuilder} from './MenuBuilder.js';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

const options = [
	{
		name: 'Cobalt',
		basename: 'Cobalt2.toml',
	},
	{
		name: 'Mariana',
		basename: 'Mariana.toml',
	},
	{
		name: 'Afterglow',
		basename: 'afterglow.toml',
	},
	{
		name: 'Alabaster',
		basename: 'alabaster.toml',
	},
	{
		name: 'Alabaster Dark',
		basename: 'alabaster_dark.toml',
	},
	{
		name: 'Alacritty',
		basename: 'alacritty_0_12.toml',
	},
	{
		name: 'Argonaut',
		basename: 'argonaut.toml',
	},
	{
		name: 'Ayu Dark',
		basename: 'ayu_dark.toml',
	},
	{
		name: 'Baitong',
		basename: 'baitong.toml',
	},
	{
		name: 'Base 16 Default Dark',
		basename: 'base16_default_dark.toml',
	},
	{
		name: 'Blood Moon',
		basename: 'blood_moon.toml',
	},
	{
		name: 'Bluish',
		basename: 'bluish.toml',
	},
	{
		name: 'Breeze',
		basename: 'breeze.toml',
	},
	{
		name: 'Campbell',
		basename: 'campbell.toml',
	},
	{
		name: 'Carbonfox',
		basename: 'carbonfox.toml',
	},
	{
		name: 'Catppuccin',
		basename: 'catppuccin.toml',
	},
	{
		name: 'Catppuccin Frappe',
		basename: 'catppuccin_frappe.toml',
	},
	{
		name: 'Catppuccin Latte',
		basename: 'catppuccin_latte.toml',
	},
	{
		name: 'Catppuccin Macchiato',
		basename: 'catppuccin_macchiato.toml',
	},
	{
		name: 'Catppucciin Mocha',
		basename: 'catppuccin_mocha.toml',
	},
	{
		name: 'Challenger Deep',
		basename: 'challenger_deep.toml',
	},
	{
		name: 'Cyber Punk Neon',
		basename: 'cyber_punk_neon.toml',
	},
	{
		name: 'Darcula',
		basename: 'darcula.toml',
	},
	{
		name: 'Dark Pastels',
		basename: 'dark_pastels.toml',
	},
	{
		name: 'Deep Space',
		basename: 'deep_space.toml',
	},
	{
		name: 'Doom One',
		basename: 'doom_one.toml',
	},
	{
		name: 'Dracula',
		basename: 'dracula.toml',
	},
	{
		name: 'Everforest Dark',
		basename: 'everforest_dark.toml',
	},
	{
		name: 'Falcon',
		basename: 'falcon.toml',
	},
	{
		name: 'Flat Remix',
		basename: 'flat_remix.toml',
	},
	{
		name: 'Flexoki',
		basename: 'flexoki.toml',
	},
	{
		name: 'Github Dark',
		basename: 'github_dark.toml',
	},
	{
		name: 'Github Dark Colorblind',
		basename: 'github_dark_colorblind.toml',
	},
	{
		name: 'Github Dark Default',
		basename: 'github_dark_default.toml',
	},
	{
		name: 'Github Dark Dimmed',
		basename: 'github_dark_dimmed.toml',
	},
	{
		name: 'Github Dark High Contrast',
		basename: 'github_dark_high_contrast.toml',
	},
	{
		name: 'Github Dark Tritanopia',
		basename: 'github_dark_tritanopia.toml',
	},
	{
		name: 'Gnome Terminal',
		basename: 'gnome_terminal.toml',
	},
	{
		name: 'Gotham',
		basename: 'gotham.toml',
	},
	{
		name: 'Gruvbox Dark',
		basename: 'gruvbox_dark.toml',
	},
	{
		name: 'Gruvbox Material',
		basename: 'gruvbox_material.toml',
	},
	{
		name: 'Gruvbox Material Medium Dark',
		basename: 'gruvbox_material_medium_dark.toml',
	},
	{
		name: 'Hardhacker',
		basename: 'hardhacker.toml',
	},
	{
		name: 'High Contrast',
		basename: 'high_contrast.toml',
	},
	{
		name: 'Horizon Dark',
		basename: 'horizon-dark.toml',
	},
	{
		name: 'Hyper',
		basename: 'hyper.toml',
	},
	{
		name: 'Inferno',
		basename: 'inferno.toml',
	},
	{
		name: 'Iris',
		basename: 'iris.toml',
	},
	{
		name: 'Iterm',
		basename: 'iterm.toml',
	},
	{
		name: 'Kanagawa Dragon',
		basename: 'kanagawa_dragon.toml',
	},
	{
		name: 'Kanagawa Wave',
		basename: 'kanagawa_wave.toml',
	},
	{
		name: 'Konsole Linux',
		basename: 'konsole_linux.toml',
	},
	{
		name: 'Low Contrast',
		basename: 'low_contrast.toml',
	},
	{
		name: 'Marine Dark',
		basename: 'marine_dark.toml',
	},
	{
		name: 'Material Theme',
		basename: 'material_theme.toml',
	},
	{
		name: 'Material Theme Mod',
		basename: 'material_theme_mod.toml',
	},
	{
		name: 'Meliora',
		basename: 'meliora.toml',
	},
	{
		name: 'Midnight Haze',
		basename: 'midnight-haze.toml',
	},
	{
		name: 'Monokai Charcoal',
		basename: 'monokai_charcoal.toml',
	},
	{
		name: 'Monokai Pro',
		basename: 'monokai_pro.toml',
	},
	{
		name: 'Msx',
		basename: 'msx.toml',
	},
	{
		name: 'Nightfox',
		basename: 'nightfox.toml',
	},
	{
		name: 'Noctis Lux',
		basename: 'noctis-lux.toml',
	},
	{
		name: 'Nord',
		basename: 'nord.toml',
	},
	{
		name: 'Nordic',
		basename: 'nordic.toml',
	},
	{
		name: 'Oceanic Next',
		basename: 'oceanic_next.toml',
	},
	{
		name: 'Omni',
		basename: 'omni.toml',
	},
	{
		name: 'One Dark',
		basename: 'one_dark.toml',
	},
	{
		name: 'Pale Night',
		basename: 'palenight.toml',
	},
	{
		name: 'Paper Color',
		basename: 'papercolor_dark.toml',
	},
	{
		name: 'Paper Theme',
		basename: 'papertheme.toml',
	},
	{
		name: 'Pencil Dark',
		basename: 'pencil_dark.toml',
	},
	{
		name: 'Rainbow',
		basename: 'rainbow.toml',
	},
	{
		name: 'Remedy Dark',
		basename: 'remedy_dark.toml',
	},
	{
		name: 'Rose Pine Moon',
		basename: 'rose-pine-moon.toml',
	},
	{
		name: 'Rose Pine',
		basename: 'rose-pine.toml',
	},
	{
		name: 'Seashells',
		basename: 'seashells.toml',
	},
	{
		name: 'Smooth',
		basename: 'smoooooth.toml',
	},
	{
		name: 'Snazzy',
		basename: 'snazzy.toml',
	},
	{
		name: 'Solarized Dark',
		basename: 'solarized_dark.toml',
	},
	{
		name: 'Taerminal',
		basename: 'taerminal.toml',
	},
	{
		name: 'Tango Dark',
		basename: 'tango_dark.toml',
	},
	{
		name: 'Tender',
		basename: 'tender.toml',
	},
	{
		name: 'Terminal App',
		basename: 'terminal_app.toml',
	},
	{
		name: 'The Love Lace',
		basename: 'thelovelace.toml',
	},
	{
		name: 'Tokyo Night Storm',
		basename: 'tokyo-night-storm.toml',
	},
	{
		name: 'Tokyo Night',
		basename: 'tokyo-night.toml',
	},
	{
		name: 'Tomorrow Night',
		basename: 'tomorrow_night.toml',
	},
	{
		name: 'Tomorrow Night Bright',
		basename: 'tomorrow_night_bright.toml',
	},
	{
		name: 'Ubuntu',
		basename: 'ubuntu.toml',
	},
	{
		name: 'Wombat',
		basename: 'wombat.toml',
	},
	{
		name: 'Xterm',
		basename: 'xterm.toml',
	},
	{
		name: 'Zenburn',
		basename: 'zenburn.toml',
	},
];

async function modifyTheme(index) {
	const basename = options[index].basename;
	const home = os.homedir();
	const filePath = path.join(home, '.config', 'alacritty', 'alacritty.toml');
	const regex = /import = .*/gm;
	const newLine = `import = ["${home}/.config/alacritty/dist/themes/${basename}"]`;

	try {
		const data = await fs.readFile(filePath, 'utf-8');
		const modifiedData = data.replace(regex, newLine);
		await fs.writeFile(filePath, modifiedData, 'utf-8');
	} catch (error) {
		console.error(error);
	}
}

export function Alacritty({setMenu}) {
	return (
		<MenuBuilder
			options={options}
			handleChoose={modifyTheme}
			setMenu={setMenu}
		/>
	);
}
