var gameConfig = {
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 640,
		height: 960
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 7500 },
			debug: false
		}
	},
	scene: [Boot, Preloader, MainMenu, Settings, Story, Game]
}
game = new Phaser.Game(gameConfig);
window.focus();