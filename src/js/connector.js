var ICON = 'https://trello-members.s3.amazonaws.com/62527cb59e2a8f234011782e/b87c0a65ee0b19b00320a8d7fd271e49/50.png';

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button2');
};


function boardBar(t) {
	return t.boardBar({
		url: 'https://localhost:3000/pages/main',
		args: { text: 'Hello' },
		accentColor: '#00FFFF',
		height: 80, // initial height for iframe
		callback: () => console.log('Goodbye from boardBar.'),
		resizable: true,
		title: 'Offsight',
		actions: [{
			icon: ICON,
			url: 'https://localhost:3000/',
			alt: 'Leftmost',
			position: 'left',
		}, {
			icon: 'https://toppng.com/uploads/preview/clickable-button-11550128821vvz86og3cm.png',
			callback: (tr) => tr.popup({
				title: 'appear_in_settings',
				url: 'estimate.html',
				height: 164,
			}),
			alt: 'Second from left',
			position: 'left',
		}, {
			icon: ICON,
			callback: () => console.log(':tada:'),
			alt: 'Right side',
			position: 'right',
		}],
	});
}


function popup() {
	return t.popup({
		title: "Estimation",
		url: 'estimate.html'
	});
}

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button', t, opts);
	//return t.confetti();
	return boardBar(t)
	return popup(t);

};

const t = window.TrelloPowerUp.initialize({
	'on-enable': function (t, options) {
		console.log('on-enable');
	},
	'on-disable': function (t, options) {
		console.log('on-disable');
	},
	'show-settings': function (t, opts) {
		return boardBar(t);
	},
	'board-buttons': function (t, opts) {
		boardBar(t);
		return [{
			// we can either provide a button that has a callback function
			icon: {
				dark: ICON,
				light: ICON
			},
			text: 'Talk Now',
			callback: onBtnClick,
			condition: 'edit'
		}];
	},
	'card-badges': function (t, opts) {
		return [{
			// usually you will provide a callback function to be run on button click
			// we recommend that you use a popup on click generally
			icon: ICON, // don't use a colored icon here
			text: 'Open Popup',
			color: 'green'
		}]
	}

});


// setTimeout(() => {
// 	console.log('alerting');
// 	t.alert({
// 		message: 'Powering-Up, give us a second...'
// 	});

// }, 1500);
