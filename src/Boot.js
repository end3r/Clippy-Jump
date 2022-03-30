class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }
    preload() {
        this.load.image('background', 'img/bg.png');
        this.load.image('platform', 'img/platform.png');
        this.load.image('platform2', 'img/platform2.png');
        this.load.image('clippy', 'img/clippy.png');
        this.load.image('cloud', 'img/cloud.png');
        this.load.image('game', 'img/game.jpg');
        this.load.image('pause', 'img/pause.png');
        this.load.image('powerup1', 'img/powerup1.png');
        this.load.image('powerup2', 'img/powerup2.png');
        this.load.image('logo-enclave', 'img/logo-enclave.png');
        this.load.image('loading-background', 'img/loading-background.png');
        WebFont.load({ custom: { families: ['Berlin'], urls: ['fonts/BRLNSDB.css'] } });
    }
    create() {
        EPT.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };
        EPT.Lang.updateLanguage('en');
        EPT.text = EPT.Lang.text[EPT.Lang.current];
        this.scene.start('Preloader');
    }
}