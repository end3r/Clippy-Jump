class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    create() {
        this.add.sprite(0, 0, 'background').setOrigin(0,0);
        // this.add.plugin(Phaser.Plugin.Debug);
        this.stateStatus = null;
        this._score = 0;
        // this._time = 10;
		this._gamePaused = false;
		this._runOnce = false;

		this._platforms = null;
		this._clippy = null;
		this._bonuses = null;

		this._speedUp = 2;

		this._cursors = this.input.keyboard.createCursorKeys();

        // this.buttonDummy = new Button(EPT.world.centerX, EPT.world.centerY, 'clickme', this.addPoints, this, 'static');
        // this.buttonDummy.setOrigin(0.5,0.5);
        // this.buttonDummy.setAlpha(0);
        // this.buttonDummy.setScale(0.1);
        // this.tweens.add({targets: this.buttonDummy, alpha: 1, duration: 500, ease: 'Linear'});
        // this.tweens.add({targets: this.buttonDummy, scale: 1, duration: 500, ease: 'Back'});
        
        // this.currentTimer = this.time.addEvent({
        //     delay: 1000,
        //     callback: function(){
        //         this._time--;
        //         this.textTime.setText(EPT.text['gameplay-timeleft']+this._time);
        //         if(!this._time) {
        //             this._runOnce = false;
        //             this.stateStatus = 'gameover';
        //         }
        //     },
        //     callbackScope: this,
        //     loop: true
        // });

        // this.add.sprite(EPT.world.centerX-200, EPT.world.height-150, 'platform').setOrigin(0.5,1).setScale(0.5);

		this._clouds = this.add.group();

		// var cloudStartingPoint = 150;
		// var cloudX = 0;
		// var cloudY = 0;
		// var cloudOffsetX = 200;
		// var cloudOffsetY = 75;
		// for(var c=0; c<10; c++) {
		// 	// cloudX += cloudOffsetX;
		// 	this._clouds.create(150, 150, 'cloud').setScale(0.5).setOrigin(0.5);
		// }

		this._clouds.create(150, 150, 'cloud').setOrigin(0.5);
		this._clouds.create(550, 220, 'cloud').setOrigin(0.5);
		this._clouds.create(350, 350, 'cloud').setOrigin(0.5);
		this._clouds.create(150, -150, 'cloud').setOrigin(0.5);
		this._clouds.create(550, -220, 'cloud').setOrigin(0.5);
		this._clouds.create(350, -350, 'cloud').setOrigin(0.5);
		this._clouds.create(150, -550, 'cloud').setOrigin(0.5);
		this._clouds.create(550, -750, 'cloud').setOrigin(0.5);
		this._clouds.create(350, -850, 'cloud').setOrigin(0.5);
		this._clouds.create(350, -990, 'cloud').setOrigin(0.5);

	    this._clouds.children.iterate(function (cloud) {
	    	var randomDir = (Phaser.Math.Between(0, 10))-5;
	        cloud.dir = randomDir/10;
	    });

		
		this._bonuses = this.physics.add.staticGroup();
		this._bonus1 = this._bonuses.create(1270, 1360, 'item1');
		this._bonus2 = this._bonuses.create(1180, -1400, 'item1');


		this._platforms = this.physics.add.staticGroup();
		this._platforms.createMultiple({key:'platforms',frame:[0],repeat:5});
		this._platforms.spawnCount = 0;

		// this.movingPlatform = this._platforms.create(0, 320, 'platform').setOrigin(0.5,1).setScale(0.5).refreshBody();

		this._platforms.offsetX = 150;
		this._platforms.offsetY = 140;
		this._platforms.currentX = EPT.world.centerX;
		this._platforms.currentY = EPT.world.height;

	    this._platforms.children.iterate(function (platform) {
	    	// platform.refreshBody();

		    	// var randomDir = (Phaser.Math.Between(0, 1)*2)-1;
		    	// // console.log(randomDir);
		     //    platform.dir = randomDir;
		     //    platform.setVelocityX(50);
		     //    platform.body.velocity.x = platform.dir*10;

	    	this.placeNewPlatform(platform);
	    },this);

		// for(var p=0; p<10; p++) {
			
			// cloudX += cloudOffsetX;
			// this._platforms.create(platformX*p, platformY*p, 'platform').setScale(0.5).refreshBody();

			// this._platforms.create(platformCurrentX,this.platformCurrentY, 'platform').setScale(0.5).refreshBody();

			// var randomOffsetX = Phaser.Math.Between(-200, 200);
			// var randomDirX = (Phaser.Math.Between(0, 1)*2)-1;
			// console.log(randomOffsetX);
			// platformCurrentX += (platformOffsetX*randomDirX)+randomOffsetX;
			// this.platformCurrentY -= platformOffsetY;

			// if(platformCurrentX < 0) {
			// 	platformCurrentX += platformOffsetX*2;
			// }
			// if(platformCurrentX > EPT.world.width) {
			// 	platformCurrentX -= platformOffsetX*2;
			// }
		// }


        this._platforms.create(EPT.world.centerX, EPT.world.height, 'platforms', 0).setOrigin(0.5,1);

		// this._platforms.create(100, EPT.world.height-platformOffsetY, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(400, 568, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(550, 400, 'platform').setScale(0.5).refreshBody();

		// this._platforms.create(320, 240, 'platform').setScale(0.5).refreshBody();

		// this._platforms.create(100, 100, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(400, 0, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(550, -100, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(80, -350, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(300, -200, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(530, -400, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(340, -500, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(100, -700, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(330, -800, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(550, -900, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(150, -1100, 'platform').setScale(0.5).refreshBody();
		// this._platforms.create(250, 250, 'platform2').setScale(0.5).refreshBody();

		// this.add.sprite(250, 250, 'platform2').setScale(0.5);

	    this._platforms.children.iterate(function (platform) {
	    	// var randomDir = (Phaser.Math.Between(0, 1)*2)-1;
	    	var randomDir = (Phaser.Math.Between(-15, 15))*0.1;
	    	// console.log(randomDir);
	        platform.dir = randomDir;
	        // platform.setVelocityX(50);
	        // platform.body.velocity.x = randomDir+10;

	        platform.body.checkCollision.down = false;
	        platform.body.checkCollision.left = false;
	        platform.body.checkCollision.right = false;
	    });

        this._clippy = this.physics.add.sprite(EPT.world.centerX, EPT.world.height-65, 'clippy').setOrigin(0.5,1);
		this._clippy.setBounce(0);//.setCollideWorldBounds(true);
		this._clippy.body.setSize(30,115);
		// this._clippy.body.setOffset(-10,0);

		// this._bonuses = this.physics.add.staticGroup();
		// this._bonus1 = this._bonuses.create(1270, 1360, 'item1');
		// this._bonus2 = this._bonuses.create(1180, -1400, 'item1');

		this.physics.add.collider(this._clippy, this._platforms, this.collideWithPlatform);
		// this.physics.add.overlap(this._clippy, this._platforms, this.collidePlatform, null, this);
		this.physics.add.overlap(this._clippy, this._bonuses, this.collectBonus, null, this);
		// this.physics.add.overlap(this._clippy, this._platforms, null, this);

        this.initUI();

		this.input.on('pointerdown', function (pointer) {
			this.click();
		}, this);

		// this.input.keyboard.on('keydown', this.handleKey, this);
        this.cameras.main.fadeIn(250);
        this.stateStatus = 'playing';
    }
    collideWithPlatform(clippy, platform) {
	   	if(platform.moving) {
    		clippy.x += platform.dir*2;
		}
		if(clippy.body.touching.down && platform.body.touching.up && platform.disappear) {
			platform.disappearing = true;
		}
    }
	update() {
		switch(this.stateStatus) {
			case 'paused': {
				if(!this._runOnce) {
					this.statePaused();
					this._runOnce = true;
				}
				break;
			}
			case 'gameover': {
				if(!this._runOnce) {
					this.stateGameover();
					this._runOnce = true;
				}
				break;
			}
			case 'playing': {
				this.statePlaying();
			}
			default: {
			}
		}

	    // this._platforms.children.iterate(function (platform) {
	    	// var randomDir = (Phaser.Math.Between(0, 1)*2)-1;
	    	// console.log(randomDir);
	        // platform.dir = randomDir;
	        // platform.setVelocityX(50);
	        // platform.body.velocity.x = platform.dir*10;
	    // });
	    
		this._platforms.children.iterate(function (platform) {
	    	if(platform.moving) {
		    	platform.x += platform.dir;
		    	platform.refreshBody();

			    if(platform.x-platform.width > EPT.world.width) {
			    	platform.x = -platform.width/2;
			    }

			    if(platform.x+platform.width/2 < 0) {
			    	platform.x = EPT.world.width+platform.width/2;
			    }
	    	}

	    	if(platform.disappearing && platform.alpha == 1) {
				this.tweens.add({targets: platform, alpha: 0, duration: 1000, ease: 'Linear.None', onComplete: function(){
					// platform.x = 1000;
					// platform.alpha = 1;
					// platform.refreshBody();
				}, onCompleteScope: this});
	    	}
    	}, this);

	    // this.movingPlatform.x += 1;
	    // this.movingPlatform.refreshBody();
	    // if(this.movingPlatform.x-this.movingPlatform.width > EPT.world.width) {
	    // 	this.movingPlatform.x = -this.movingPlatform.width/2;
	    // }

	    // if(this.movingPlatform.x+this.movingPlatform.width/2 < 0) {
	    // 	this.movingPlatform.x = EPT.world.width+this.movingPlatform.width/2;
	    // }

    	this._clouds.children.iterate(function (cloud) {
    		cloud.x += cloud.dir;
    		if(cloud.x-cloud.width/2 > EPT.world.width) {
    			cloud.x = -cloud.width/2;
    		}
    		if(cloud.x+cloud.width/2 < 0) {
    			cloud.x = EPT.world.width+cloud.width/2;
    		}
    	});

	    if(this._clippy.y < EPT.world.centerY+200) {
	    	// this._clippy.y += 1;
	    	// this._clippy.refreshBody();
	    	this._platforms.children.iterate(function (platform) {
	    		platform.y += this._speedUp;
	    		platform.refreshBody();
	    	}, this);
	    	this._bonuses.children.iterate(function (bonus) {
	    		bonus.y += this._speedUp;
	    		bonus.refreshBody();
	    	}, this);
	    	this._clouds.children.iterate(function (cloud) {
	    		cloud.y += this._speedUp;
	    	}, this);
	    	this._clippy.y += this._speedUp;
	    }
	}
    handleKey(e) {
        switch(e.code) {
            case 'Enter': {
                this.addPoints();
                break;
            }
            case 'KeyP': {
                this.managePause();
                break;
            }
            // case 'KeyX': {
            //     this.clippyJump();
            //     break;
            // }
            // case 'KeyZ': {
            //     this.clippyLeft();
            //     break;
            // }
            // case 'KeyC': {
            //     this.clippyRight();
            //     break;
            // }
            case 'KeyB': {
                this.stateBack();
                break;
            }
            case 'KeyT': {
                this.stateRestart();
                break;
            }
            default: {}
        }
    }
    // clippyJump() {
    // 	console.log('jump, Clippy!');
    // 	// if(!this._clippy.body.touching.down) {
    // 		this._clippy.setVelocityY(-1250);
    // 	// }
    // }
    // clippyLeft() {
    // 	console.log('left, Clippy!');
    // 	this._clippy.setVelocityX(-400);
    // }
    // clippyRight() {
    // 	console.log('left, Clippy!');
    // 	this._clippy.setVelocityX(400);
    // }
    managePause() {
        this._gamePaused =! this._gamePaused;
        // this.currentTimer.paused =! this.currentTimer.paused;
		EPT.Sfx.play('click');
		if(this._gamePaused) {
			EPT.fadeOutIn(function(self){
				self.buttonPause.input.enabled = false;
				// self.buttonDummy.input.enabled = false;
				self.stateStatus = 'paused';
				self._runOnce = false;
			}, this);
			this.screenPausedBack.x = -this.screenPausedBack.width-20;
			this.tweens.add({targets: this.screenPausedBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
			this.screenPausedContinue.x = EPT.world.width+this.screenPausedContinue.width+20;
			this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
		}
		else {
			EPT.fadeOutIn(function(self){
				self.buttonPause.input.enabled = true;
				// self.buttonDummy.input.enabled = true;
				self._stateStatus = 'playing';
				self._runOnce = false;
			}, this);
			this.screenPausedBack.x = 100;
			this.tweens.add({targets: this.screenPausedBack, x: -this.screenPausedBack.width-20, duration: 500, ease: 'Back'});
			this.screenPausedContinue.x = EPT.world.width-100;
			this.tweens.add({targets: this.screenPausedContinue, x: EPT.world.width+this.screenPausedContinue.width+20, duration: 500, ease: 'Back'});
        }
    }
	statePlaying() {
        // if(this._time === 0) {
        //     this._runOnce = false;
        //     this.stateStatus = 'gameover';
        // }
	    // if(this._cursors.left.isDown) {
	    //     this._clippy.setVelocityX(-500);
	    // }
	    // else if(this._cursors.right.isDown) {
	    //     this._clippy.setVelocityX(500);
	    // }
	    // else {
	    //     this._clippy.setVelocityX(0);
	    // }
	    // if(this._cursors.up.isDown && this._clippy.body.touching.down) {
	    //     this._clippy.setVelocityY(-2000);
	    // }

	    // this._platforms.incX(this.direction);

	    // this._platforms.children.iterate(function (platform) {
	    //     platform.setVelocityX(1);
	    // });

	    // console.log(this._clippy.body.velocity.y);

	    // if(this._clippy.body.touching.down) {
	    // 	this._clippy.setVelocityX(0);
	    // }

	    this._platforms.children.iterate(function (platform) {
	        if(platform.y > EPT.world.height) {
	        	platform.y = 0;
	        	platform.disappear = false;
	        	platform.disappearing = false;
	        	platform.alpha = 1;
	        	platform.setFrame(0);
	        	console.log('new reappear');

				this._platforms.spawnCount++;

				if(this._bonus2 && this._platforms.spawnCount == 9) {
					console.log('spawn2!!!!!');
					this._bonus2.x = platform.x;
					this._bonus2.y = platform.y-40;
				}

				console.log(this._platforms.spawnCount);
				if(this._platforms.spawnCount > 10) {
					platform.moving = true;
					console.log(platform.moving);
				}
				// if(this._platforms.spawnCount > 10) {
					var randomD = Phaser.Math.Between(0, 5);
					if(randomD == 3) {
						platform.disappear = true;
						// platform.frame = 1;
						platform.setFrame(1);
						console.log('NEW DISSAPEAR!')
					}
				// }
	        }
	    }, this);

	    // if(!Phaser.Geom.Rectangle.Overlaps(this.physics.world.bounds, this._clippy.getBounds())) {
	    // 	alert('CLIPPY OUT OF BOUNDS');
	    // }

	    if(this._clippy.y-this._clippy.width > EPT.world.height) {
	    	alert('GAME OVER!');
	    	window.location.reload(true);
	    }

	    // if(this.myPointer.isDown) {
	    // 	console.log("DOWN1");
	    // }

	    if(this.input.activePointer.isDown) {
	    	console.log("STILL DOWN!");
			if(this.input.x < this._clippy.x-10) {
				// this._clippy.setVelocityX(-500); // this.input.x-this._clippy.x
				this._clippy.x -= 5;
			}
			else if(this.input.x > this._clippy.x+10) {
				// this._clippy.setVelocityX(500);
				this._clippy.x += 5;
			}
			// else {
			// 	// this._clippy.setVelocityX(0);
			// }
		}

	}
	click() {
		// this.input.x, this.input.y, this._clippy.x, this._clippy.y
		// console.log(this.input.x,this.input.y,this._clippy.x,this._clippy.y);

	    if(this._clippy.body.touching.down) {
	        this._clippy.setVelocityY(-2000);
		}
	        // var distance = Phaser.Math.Distance.BetweenPoints(this._clippy, this.input);
	        // console.log(distance);

		// if(this.input.x < this._clippy.x-100) {
		// 	// this._clippy.setVelocityX(-500); // this.input.x-this._clippy.x
		// 	this._clippy.x -= 5;
		// }
		// else if(this.input.x > this._clippy.x+100) {
		// 	// this._clippy.setVelocityX(500);
		// 	this._clippy.x += 5;
		// }
		// else {
		// 	// this._clippy.setVelocityX(0);
		// 	// this._clippy.x -= 5;
		// }

	}
	placeNewPlatform(platform) {
		this._platforms.spawnCount++;
		// this._platforms.create(platformCurrentX,this.platformCurrentY, 'platform').setScale(0.5).refreshBody();
		// platform.setOrigin(0.5,1).refreshBody();

		console.log(this._platforms.spawnCount);

		if(this._platforms.spawnCount > 10) {
			// move them
			platform.moving = true;
			console.log(platform.moving);
		}

		var randomOffsetX = Phaser.Math.Between(-100, 100);
		var randomDirX = (Phaser.Math.Between(0, 1)*2)-1;
		// console.log(randomOffsetX);
		this._platforms.currentX += (this._platforms.offsetX*randomDirX)+randomOffsetX;
		this._platforms.currentY -= this._platforms.offsetY;

		if(this._platforms.currentX < 0) {
			this._platforms.currentX += this._platforms.offsetX*2;
		}
		if(this._platforms.currentX > EPT.world.width-this._platforms.offsetX) {
			this._platforms.currentX -= this._platforms.offsetX*2;
		}

		platform.x = this._platforms.currentX;
		platform.y = this._platforms.currentY;

		platform.refreshBody();

		var randomD = Phaser.Math.Between(0, 5);
		if(randomD == 3) {
			platform.disappear = true;
			// platform.frame = 1;
			platform.setFrame(1);
			console.log('NEW DISSAPEAR!')
		}

		if(this._bonus1 && this._platforms.spawnCount == 4) {
			console.log('spawn1!!!!!');
			this._bonus1.x = platform.x;
			this._bonus1.y = platform.y-40;
		}
	}
	statePaused() {
        this.screenPausedGroup.toggleVisible();
	}
	stateGameover() {
		// this.currentTimer.paused =! this.currentTimer.paused;
		EPT.Storage.setHighscore('EPT-highscore',this._score);
		EPT.fadeOutIn(function(self){
			self.screenGameoverGroup.toggleVisible();			
			self.buttonPause.input.enabled = false;
			// self.buttonDummy.input.enabled = false;
			self.screenGameoverScore.setText(EPT.text['gameplay-score']+self._score);
			self.gameoverScoreTween();
		}, this);
		this.screenGameoverBack.x = -this.screenGameoverBack.width-20;
		this.tweens.add({targets: this.screenGameoverBack, x: 100, duration: 500, delay: 250, ease: 'Back'});
		this.screenGameoverRestart.x = EPT.world.width+this.screenGameoverRestart.width+20;
		this.tweens.add({targets: this.screenGameoverRestart, x: EPT.world.width-100, duration: 500, delay: 250, ease: 'Back'});
	}
    initUI() {
		this.buttonPause = new Button(EPT.world.width-20, 20, 'pause', this.managePause, this).setScale(0.5);
		this.buttonPause.setOrigin(1,0);

		var fontScore = { font: '48px '+EPT.text['FONT'], fill: '#1978ca' };
		var fontScoreWhite =  { font: '48px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 5 };
		this.textScore = this.add.text(15, 10, '00', fontScore);
		this.textScore.setOrigin(0,0);

		this.textScore.y = -this.textScore.height-10;
		this.tweens.add({targets: this.textScore, y: 10, duration: 500, delay: 100, ease: 'Back'});

		// this.textTime = this.add.text(30, EPT.world.height-30, EPT.text['gameplay-timeleft']+this._time, fontScore);
		// this.textTime.setOrigin(0,1);

		// this.textTime.y = EPT.world.height+this.textTime.height+30;
		// this.tweens.add({targets: this.textTime, y: EPT.world.height-30, duration: 500, ease: 'Back'});		

		this.buttonPause.y = -this.buttonPause.height-20;
        this.tweens.add({targets: this.buttonPause, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '48px '+EPT.text['FONT'], fill: '#000', stroke: '#ffde00', strokeThickness: 10 };

		this.screenPausedGroup = this.add.group();
        this.screenPausedBg = this.add.sprite(0, 0, 'overlay');
        this.screenPausedBg.setAlpha(0.95);
        this.screenPausedBg.setOrigin(0, 0);
		this.screenPausedText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-paused'], fontTitle);
		this.screenPausedText.setOrigin(0.5,0);
		this.screenPausedBack = new Button(100, EPT.world.height-100, 'button-mainmenu', this.stateBack, this);
		this.screenPausedBack.setOrigin(0,1);
		this.screenPausedContinue = new Button(EPT.world.width-100, EPT.world.height-100, 'button-continue', this.managePause, this);
		this.screenPausedContinue.setOrigin(1,1);
		this.screenPausedGroup.add(this.screenPausedBg);
		this.screenPausedGroup.add(this.screenPausedText);
		this.screenPausedGroup.add(this.screenPausedBack);
		this.screenPausedGroup.add(this.screenPausedContinue);
        this.screenPausedGroup.toggleVisible();

		this.screenGameoverGroup = this.add.group();
        this.screenGameoverBg = this.add.sprite(0, 0, 'overlay');
        this.screenGameoverBg.setAlpha(0.95);
        this.screenGameoverBg.setOrigin(0, 0);
		this.screenGameoverText = this.add.text(EPT.world.centerX, 100, EPT.text['gameplay-gameover'], fontTitle);
		this.screenGameoverText.setOrigin(0.5,0);
		this.screenGameoverBack = new Button(100, EPT.world.height-100, 'button-mainmenu', this.stateBack, this);
		this.screenGameoverBack.setOrigin(0,1);
		this.screenGameoverRestart = new Button(EPT.world.width-100, EPT.world.height-100, 'button-restart', this.stateRestart, this);
		this.screenGameoverRestart.setOrigin(1,1);
		this.screenGameoverScore = this.add.text(EPT.world.centerX, 300, EPT.text['gameplay-score']+this._score, fontScoreWhite);
		this.screenGameoverScore.setOrigin(0.5,0.5);
		this.screenGameoverGroup.add(this.screenGameoverBg);
		this.screenGameoverGroup.add(this.screenGameoverText);
		this.screenGameoverGroup.add(this.screenGameoverBack);
		this.screenGameoverGroup.add(this.screenGameoverRestart);
		this.screenGameoverGroup.add(this.screenGameoverScore);
		this.screenGameoverGroup.toggleVisible();
    }
    addPoints() {
		this._score += 10;
        this.textScore.setText(EPT.text['gameplay-score']+this._score);
        
        var randX = Phaser.Math.Between(200, EPT.world.width-200);
        var randY = Phaser.Math.Between(200, EPT.world.height-200);
		var pointsAdded = this.add.text(randX, randY, '+10', { font: '48px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 10 });
		pointsAdded.setOrigin(0.5, 0.5);
        this.tweens.add({targets: pointsAdded, alpha: 0, y: randY-50, duration: 1000, ease: 'Linear'});

        this.cameras.main.shake(100, 0.01, true);
    }
    collidePlatform(player, platform) {
    	// if(this._clippy.body.velocity.y > 0) {
    	// 	this.physics.add.collider(player, platform);
    	// }
    	if(player.body.touching.down && platform.body.touching.up) {
    		// this.physics.add.collider(player, platform);
    		console.log("COLLIDING!");
    		player.setVelocityY(0);
    	}
    }
    collectBonus(player, bonus) {
    	bonus.disableBody(true, true);
    	this._score += 10;
    	// scoreText.setText('Score: ' + score);
    	this.textScore.setText(this._score);
    }
	stateRestart() {
		EPT.Sfx.play('click');
        EPT.fadeOutScene('Game', this);
	}
	stateBack() {
		EPT.Sfx.play('click');
		EPT.fadeOutScene('MainMenu', this);
	}
	gameoverScoreTween() {
		this.screenGameoverScore.setText(EPT.text['gameplay-score']+'0');
		if(this._score) {
			this.pointsTween = this.tweens.addCounter({
				from: 0, to: this._score, duration: 2000, delay: 250,
				onUpdateScope: this, onCompleteScope: this,
				onUpdate: function(){
					this.screenGameoverScore.setText(EPT.text['gameplay-score']+Math.floor(this.pointsTween.getValue()));
				},
				onComplete: function(){
					var emitter = this.add.particles('particle').createEmitter({
						x: this.screenGameoverScore.x+30,
						y: this.screenGameoverScore.y,
						speed: { min: -600, max: 600 },
						angle: { min: 0, max: 360 },
						scale: { start: 0.5, end: 3 },
						blendMode: 'ADD',
						active: true,
						lifespan: 2000,
						gravityY: 1000,
						quantity: 250
					});
					emitter.explode();
				}
			});
		}
	}
};