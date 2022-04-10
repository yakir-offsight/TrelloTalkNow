var ICON = 'https://trello-members.s3.amazonaws.com/62527cb59e2a8f234011782e/b87c0a65ee0b19b00320a8d7fd271e49/50.png';

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button2');
};

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button', t, opts);
	return t.popup({
		title: "Estimation",
		url: 'estimate.html'
	});
};

const t = window.TrelloPowerUp.initialize({
	'board-buttons': function (t, opts) {
		return [{
			// we can either provide a button that has a callback function
			icon: {
				dark: ICON,
				light: ICON
			},
			text: 'Talk Now',
			callback: onBtnClick,
			condition: 'edit'
		}]
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
function censor(censor) {
	var i = 0;

	return function (key, value) {
		if (i !== 0 && typeof (censor) === 'object' && typeof (value) == 'object' && censor == value)
			return '[Circular]';

		if (i >= 29) // seems to be a harded maximum of 30 serialized objects?
			return '[Unknown]';

		++i; // so we know we aren't using the original object anymore

		return value;
	}
}
console.log(JSON.stringify(t, censor(t)));
