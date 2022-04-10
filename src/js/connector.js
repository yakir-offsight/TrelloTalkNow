var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button2');
};

var onBtnClick = function (t, opts) {
	console.log('Someone clicked the button');
};
console.log("Hello!");
window.TrelloPowerUp.initialize({
	'board-buttons': function (t, opts) {
		return [{
			// we can either provide a button that has a callback function
			icon: {
				dark: 'https://trello-members.s3.amazonaws.com/62527cb59e2a8f234011782e/b87c0a65ee0b19b00320a8d7fd271e49/50.png',
				light: 'https://trello-members.s3.amazonaws.com/62527cb59e2a8f234011782e/b87c0a65ee0b19b00320a8d7fd271e49/50.png'
			},
			text: 'Talk Now',
			callback: onBtnClick,
			condition: 'edit'
		}]
	},
	'card-buttons': function (t, opts) {
		return [{
			// usually you will provide a callback function to be run on button click
			// we recommend that you use a popup on click generally
			icon: GRAY_ICON, // don't use a colored icon here
			text: 'Open Popup',
			callback: onBtnClick,
			condition: 'edit'
		}]
	}

});