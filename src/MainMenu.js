class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
        // this.bgFilesLoaded = false;
    }
    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0,0);

        this._score = 0;
        this._clouds = null;
        this._platforms = null;

		EPT.Storage.initUnset('ClippyJump-highscore', 0);
        // EPT.Storage.set('ClippyJump-highscore', 30);
		var highscore = EPT.Storage.get('ClippyJump-highscore');

        // this.waitingForSettings = false;

        // var title = this.add.sprite(EPT.world.centerX, EPT.world.centerY-50, 'title');
        // title.setOrigin(0.5);

        this._clouds = this.add.group();
        this._clouds.create(150, 150, 'cloud').setOrigin(0.5);
        this._clouds.create(550, 220, 'cloud').setOrigin(0.5);
        this._clouds.create(350, 350, 'cloud').setOrigin(0.5);

        this._platforms = this.add.group();
        this._platforms.create(150, 750, 'platforms', 0).setOrigin(0.5);
        this._platforms.create(550, 520, 'platforms', 0).setOrigin(0.5);
        this._platforms.create(350, 650, 'platforms', 0).setOrigin(0.5);

        this._platforms.create(110, 585, 'platforms', 0).setOrigin(0.5);
        this._platforms.create(350, 350, 'platforms', 0).setOrigin(0.5);
        this._platforms.create(350, 250, 'platforms', 0).setOrigin(0.5);

        this._platforms.create(350, 150, 'platforms', 1).setOrigin(0.5);

        this._clippy = this.add.sprite(125, EPT.world.centerY+100, 'clippy').setOrigin(0.5,1);
        this._story = this.add.sprite(350, EPT.world.centerY+30, 'story').setScale(0.5);

        // this._clouds.children.iterate(function (cloud) {
        //     var randomDir = (Phaser.Math.Between(0, 10))-5;
        //     cloud.dir = randomDir/10;
        // });

        this.input.keyboard.on('keydown', this.handleKey, this);

        // this.tweens.add({targets: title, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
        // this.tweens.add({targets: title, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

  //       this.buttonSettings = new Button(20, 20, 'button-settings', this.clickSettings, this);
  //       this.buttonSettings.setOrigin(0, 0);

  //       var buttonEnclave = new Button(20, EPT.world.height-40, 'logo-enclave', this.clickEnclave, this, 'static');
  //       buttonEnclave.setOrigin(0, 1);

  //       this.buttonStart = new Button(EPT.world.width-20, EPT.world.height-20, 'button-start', this.clickStart, this);
  //       this.buttonStart.setOrigin(1, 1);

		// var fontHighscore = { font: '38px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 5 };
		// var textHighscore = this.add.text(EPT.world.width-30, 60, EPT.text['menu-highscore']+highscore, fontHighscore);
		// textHighscore.setOrigin(1, 0);

		// this.buttonStart.x = EPT.world.width+this.buttonStart.width+20;
        // this.tweens.add({targets: this.buttonStart, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		// buttonEnclave.x = -buttonEnclave.width-20;
        // this.tweens.add({targets: buttonEnclave, x: 20, duration: 500, ease: 'Back'});

        // this.buttonSettings.y = -this.buttonSettings.height-20;
        // this.tweens.add({targets: this.buttonSettings, y: 20, duration: 500, ease: 'Back'});

        // textHighscore.y = -textHighscore.height-30;
        // this.tweens.add({targets: textHighscore, y: 40, duration: 500, delay: 100, ease: 'Back'});

        this.cameras.main.fadeIn(250);

        // if(!this.bgFilesLoaded) {
        //     this.time.addEvent({
        //         delay: 500,
        //         callback: function() {
        //             this.startPreloadInTheBackground();
        //         },
        //         callbackScope: this
        //     }, this);
        // }
        this.buttonStart = new Button(EPT.world.centerX, EPT.world.height-200, 'button-start', this.clickStart, this).setScale(0.5);
        this.buttonStart.setOrigin(0.5);
        this.buttonStart.setScale(0.25);
        this.buttonStartTweenIn = this.tweens.add({targets: this.buttonStart, scale: 0.5, duration: 500, ease: 'Back'});

        this.startTimerMod = 0;
        this.startTimer = this.time.addEvent({ delay: 3000, loop: true, callback: function(){
            this.startTimerMod++;
            if(this.startTimerMod % 2) {
                this.buttonStartTweenScaleIn = this.tweens.add({targets: this.buttonStart, scale: 0.6, duration: 100, ease: 'Linear'});
                this.buttonStartTweenScaleOut = this.tweens.add({targets: this.buttonStart, scale: 0.5, duration: 750, delay: 100, ease: 'Back'});
            }
            else {
                this.buttonStartTweenAngle1 = this.tweens.add({targets: this.buttonStart, angle: this.buttonStart.angle-30, duration: 200, ease: 'Sine.easeInOut' });
                this.buttonStartTweenAngle2 = this.tweens.add({targets: this.buttonStart, angle: this.buttonStart.angle+60, duration: 200, ease: 'Sine.easeInOut', delay: 200 });
                this.buttonStartTweenAngle3 = this.tweens.add({targets: this.buttonStart, angle: this.buttonStart.angle-30, duration: 200, ease: 'Sine.easeInOut', delay: 400 });
                this.buttonStartTweenAngle4 = this.tweens.add({targets: this.buttonStart, angle: this.buttonStart.angle, duration: 200, ease: 'Sine.easeInOut', delay: 600 });
            }
        }, callbackScope: this});

        this.storyTweenMoveDown = this.tweens.add({targets: this._story, y: this._story.y-10, duration: 2000, ease: 'Linear'});
        this.storyTweenMoveUp = this.tweens.add({targets: this._story, y: this._story.y, duration: 2000, delay: 2000, ease: 'Linear'});
        this.startTimerStory = this.time.addEvent({ delay: 4000, loop: true, callback: function(){
                this.storyTweenMoveDown = this.tweens.add({targets: this._story, y: this._story.y-10, duration: 2000, ease: 'Linear'});
                this.storyTweenMoveUp = this.tweens.add({targets: this._story, y: this._story.y, duration: 2000, delay: 2000, ease: 'Linear'});
        }, callbackScope: this});

        var fontScore = { font: '42px '+EPT.text['FONT'], fill: '#1978ca' };
        var fontScoreWhite =  { font: '42px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };
        this.textScore = this.add.text(25, 20, highscore, fontScore);
        this.textScore.setOrigin(0,0);
        this.textScore.y = -this.textScore.height-20;
        this.tweens.add({targets: this.textScore, y: 20, duration: 500, delay: 0, ease: 'Back'});

        this.buttonSettings = new Button(EPT.world.width-20, EPT.world.height-20, 'button-settings', this.clickSettings, this).setScale(0.5);
        this.buttonSettings.setOrigin(1,1);
        this.buttonSettings.y = EPT.world.height+this.buttonSettings.height+20;
        this.tweens.add({targets: this.buttonSettings, y: EPT.world.height-20, duration: 500, delay: 100, ease: 'Back'});        

        // this.add.sprite(0, 0, 'background').setOrigin(0,0).setScale(0.1);
        // this.add.sprite(EPT.world.width-20, 0, 'background').setOrigin(0.5,0).setScale(0.1);
    }
    update() {
        // this._clouds.children.iterate(function (cloud) {
        //     cloud.x += cloud.dir;
        //     if(cloud.x-cloud.width/2 > EPT.world.width) {
        //         cloud.x = -cloud.width/2;
        //     }
        //     if(cloud.x+cloud.width/2 < 0) {
        //         cloud.x = EPT.world.width+cloud.width/2;
        //     }
        // });
    }
    handleKey(e) {
        switch(e.code) {
            // case 'KeyS': {
            //     this.clickSettings();
            //     break;
            // }
            case 'Enter': {
                this.clickStart();
                break;
            }
            default: {}
        }
    }
    clickEnclave() {
        EPT.Sfx.play('click');
        window.top.location.href = 'https://enclavegames.com/';
    }
    clickSettings() {
        if(this.bgFilesLoaded) {
            EPT.Sfx.play('click');
            if(this.loadImage) {
                this.loadImage.destroy();
            }
            EPT.fadeOutScene('Settings', this);
        }
        else {
            var animationFrames = this.anims.generateFrameNumbers('loader');
            animationFrames.pop();
            this.waitingForSettings = true;
            this.buttonSettings.setAlpha(0.1);
            var loadAnimation = this.anims.create({
                key: 'loading',
                frames: animationFrames,
                frameRate: 12,
                repeat: -1
            });
            this.loadImage = this.add.sprite(30, 30, 'loader').setOrigin(0,0).setScale(1.25);
            this.loadImage.play('loading');
        }
    }
    clickStart() {
        // if(this.bgFilesLoaded) {
        //     EPT.Sfx.play('click');
        //     if(this.loadImage) {
        //         this.loadImage.destroy();
        //     }
        //     // EPT.fadeOutScene('Story', this);
        //     EPT.fadeOutScene('Game', this);
        // }
        // else {
        //     var animationFrames = this.anims.generateFrameNumbers('loader');
        //     animationFrames.pop();
        //     this.waitingForStart = true;
        //     this.buttonStart.setAlpha(0.1);
        //     var loadAnimation = this.anims.create({
        //         key: 'loading',
        //         frames: animationFrames,
        //         frameRate: 12,
        //         repeat: -1
        //     });
        //     this.loadImage = this.add.sprite(EPT.world.width-85, EPT.world.height-85, 'loader').setOrigin(1,1).setScale(1.25);
        //     this.loadImage.play('loading');
        // }
        EPT.fadeOutScene('Game', this);
    }
    startPreloadInTheBackground() {
        console.log('[EPT] Starting background loading...');
        this.load.image('img/clickme');
        this.load.once('filecomplete', this.addFiles, this);
        this.load.start();
    }
    addFiles() {
        var resources = {
            'image': [
                ['clickme', 'img/clickme.png'],
                ['overlay', 'img/overlay.png'],
                ['button-beer', 'img/button-beer.png'],
                ['banner-beer', 'img/banner-beer.png'],
                ['particle', 'img/particle.png']
            ],
            'spritesheet': [
                ['button-continue', 'img/button-continue.png', {frameWidth:180,frameHeight:180}],
                ['button-mainmenu', 'img/button-mainmenu.png', {frameWidth:180,frameHeight:180}],
                ['button-restart', 'img/button-tryagain.png', {frameWidth:180,frameHeight:180}],
                ['button-achievements', 'img/button-achievements.png', {frameWidth:110,frameHeight:110}],
                ['button-pause', 'img/button-pause.png', {frameWidth:80,frameHeight:80}],
                ['button-credits', 'img/button-credits.png', {frameWidth:80,frameHeight:80}],
                ['button-sound-on', 'img/button-sound-on.png', {frameWidth:80,frameHeight:80}],
                ['button-sound-off', 'img/button-sound-off.png', {frameWidth:80,frameHeight:80}],
                ['button-music-on', 'img/button-music-on.png', {frameWidth:80,frameHeight:80}],
                ['button-music-off', 'img/button-music-off.png', {frameWidth:80,frameHeight:80}],
                ['button-back', 'img/button-back.png', {frameWidth:70,frameHeight:70}]
            ],
            'audio': [
                ['sound-click', ['sfx/audio-button.m4a','sfx/audio-button.mp3','sfx/audio-button.ogg']],
                ['music-theme', ['sfx/music-bitsnbites-liver.m4a','sfx/music-bitsnbites-liver.mp3','sfx/music-bitsnbites-liver.ogg']]
            ]
        };            
        for(var method in resources) {
            resources[method].forEach(function(args) {
                var loader = this.load[method];
                loader && loader.apply(this.load, args);
            }, this);
        };
        this.load.on('complete', function(){
            console.log('[EPT] All files loaded in the background.');
            this.bgFilesLoaded = true;
            EPT.Sfx.manage('music', 'init', this);
            EPT.Sfx.manage('sound', 'init', this);
            if(this.waitingForSettings) {
                this.clickSettings();
            }
            if(this.waitingForStart) {
                this.clickStart();
            }            
        }, this);
    }
}