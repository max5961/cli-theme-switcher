import React from 'react';
import {useState} from 'react';
import {useApp, useInput, Text, Box} from 'ink';
import {menus} from './app.js';

function Opt({highlight, opt}) {
	if (highlight) {
		return (
			<Text backgroundColor="white" color="black">
				{opt.name}
			</Text>
		);
	} else {
		return <Text color="white">{opt.name}</Text>;
	}
}

// handles which option is highlighted
export function Window({options, currIndex, sIndex = 0, eIndex = 8}) {
	// default window size is <= 9
	if (options.length < 9) {
		return options.map((opt, index) => {
			if (currIndex === index) {
				return <Opt highlight={true} opt={opt} key={index} />;
			} else {
				return <Opt highlight={false} opt={opt} key={index} />;
			}
		});
	}

	// options exceed maximum window size so we need to create a dynamic window
	const win = options.slice(sIndex, eIndex + 1);

	if (sIndex === 0) {
		return win.map((opt, index) => {
			if (currIndex === index) {
				return <Opt highlight={true} opt={opt} key={index} />;
			} else {
				return <Opt highlight={false} opt={opt} key={index} />;
			}
		});
	}

	if (eIndex === options.length - 1) {
		const relativeIndex = 9 - (options.length - currIndex);
		return win.map((opt, index) => {
			if (relativeIndex === index) {
				return <Opt highlight={true} opt={opt} key={index} />;
			} else {
				return <Opt highlight={false} opt={opt} key={index} />;
			}
		});
	}

	// window is not at beginning or end of options, fix highlight at the middle
	// index of the window
	return win.map((opt, index) => {
		if (index === 4) {
			return <Opt highlight={true} opt={opt} key={index} />;
		} else {
			return <Opt highlight={false} opt={opt} key={index} />;
		}
	});
}

async function chooseAndModifyIndex(handleChoose, handleIncOrDec) {
	await handleChoose();
	handleIncOrDec();
}

export function MenuBuilder({options, handleChoose, setMenu}) {
	const [index, setIndex] = useState(0);
	const [win, setWin] = useState([0, 8]);
	const {exit} = useApp();

	function handleIncrease() {
		let [s, e] = win;
		if (index + 1 <= options.length - 1) {
			setIndex(index + 1);
		} else {
			return;
		}

		// start
		if (index + 1 <= 3) {
			s = 0;
			e = 8;

			// end
		} else if (index + 1 >= options.length - 4) {
			s = options.length - 9;
			e = options.length - 1;

			// middle
		} else {
			s = index + 1 - 4;
			e = index + 1 + 4;
		}

		setWin([s, e]);
	}

	function handleDecrease() {
		let [s, e] = win;
		if (index - 1 >= 0) {
			setIndex(index - 1);
		} else {
			return;
		}

		if (index - 1 <= 3) {
			s = 0;
			e = 8;
		} else if (index - 1 >= options.length - 4) {
			s = options.length - 9;
			e = options.length - 1;
		} else if (s !== 0) {
			s = index - 1 - 4;
			e = index - 1 + 4;
		}

		setWin([s, e]);
	}

	useInput((input, key) => {
		if (input === 'q' || key.escape) {
			exit();
		}

		if (key.return || input === 'l') {
			handleChoose(index);
		}

		if (input === 'h') {
			setMenu(menus.start);
		}

		if (input === 'j') {
			handleIncrease();
		}

		if (input === 'k') {
			handleDecrease();
		}

		if (input === 'J') {
			if (index < options.length - 1) {
				chooseAndModifyIndex(() => {
					handleChoose(index + 1);
				}, handleIncrease);
			}
		}

		if (input === 'K') {
			if (index > 0) {
				chooseAndModifyIndex(() => {
					handleChoose(index - 1);
				}, handleDecrease);
			}
		}
	});

	return (
		<Box borderStyle="single" flexDirection="column" flexWrap="wrap">
			<Window
				options={options}
				currIndex={index}
				sIndex={win[0]}
				eIndex={win[1]}
			/>
		</Box>
	);
}
