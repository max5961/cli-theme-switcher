import React from 'react';
import {PolyBar} from './PolyBar.js';
import {Alacritty} from './Alacritty.js';
import {MenuBuilder} from './MenuBuilder.js';
import {useState} from 'react';

const options = [{name: 'Alacritty'}, {name: 'PolyBar'}];
export const menus = {
	start: 'START',
	alacritty: 'ALACRITTY',
	polybar: 'POLYBAR',
};

export default function App() {
	const [menu, setMenu] = useState(menus.start);

	function handleChoose(index) {
		if (menu !== menus.start) {
			return;
		}

		if (index === 0) {
			setMenu(menus.alacritty);
		}

		if (index === 1) {
			setMenu(menus.polybar);
		}
	}

	if (menu === menus.start) {
		return <MenuBuilder options={options} handleChoose={handleChoose} />;
	} else if (menu === menus.alacritty) {
		return <Alacritty setMenu={setMenu} />;
	} else if (menu === menus.polybar) {
		return <PolyBar setMenu={setMenu} />;
	}
}
