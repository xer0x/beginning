(function () {
  'use strict';

  var tmygt = window.tmygt || (window.tmygt = {});

  tmygt.Preloader = function () {
    this.loaderEmpty = null;
	this.loaderFull = null;
    this.ready = false;
  };

  tmygt.Preloader.prototype = {

    preload: function () {
	  //this.load.image('preload_empty', 'assets/preload_empty.png');
	  this.loaderEmpty = this.add.sprite(this.game.width/2, this.game.height/2, 'loaderEmpty');
	  this.loaderEmpty.cropEnabled = true;
	  this.loaderEmpty.crop = new Phaser.Rectangle(0, 0, this.loaderEmpty.width, this.loaderEmpty.height);
	  this.loaderEmpty.anchor.setTo(0.5, 0.5);
	  this.loaderFull = this.add.sprite(this.game.width/2, this.game.height/2, 'loaderFull');
	  this.loaderFull.cropEnabled = true;
	  this.loaderFull.crop = new Phaser.Rectangle(0, 0, 0, this.loaderFull.height);
	  this.loaderFull.anchor.setTo(0.5, 0.5);
	  this.load.onFileComplete.add(this.fileLoaded, this);
	  
      //this.asset = this.add.sprite(320, 240, 'preloader');
      //this.asset.anchor.setTo(0.5, 0.5);

      //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      //this.load.setPreloadSprite(this.asset);
      //this.load.image('player', 'assets/sprites/blue_happy_64.png');
      this.load.spritesheet('player', 'assets/sprites/tile_sprites.png', 120, 110, 14);
      this.load.image('playerShadow', 'assets/sprites/tile_shadow.png');
      this.load.image('splash', 'assets/splash.jpg');
      this.load.image('coin', 'assets/sprites/coin.png');
      // this.load.audio('happy1', 'assets/audio/mwgt_vo_gen_01.webm');
      this.load.audio('cheer1', 'assets/audio/mwgt_vo_groupcheer_01.webm');
      this.load.audio('cheer2', 'assets/audio/mwgt_vo_groupcheer_02.webm');
      this.load.audio('cheer3', 'assets/audio/mwgt_vo_groupcheer_03.webm');
      this.load.audio('welcome1', 'assets/audio/mwgt_vo_groupcheer_01.webm');
      this.load.audio('surprise1', 'assets/audio/mwgt_vo_gen_19.webm');
      this.load.audio('move1', 'assets/audio/move.mp3');
      this.load.audio('happy1', 'assets/audio/mario_coin.wav');
      this.load.audio('startGame1', 'assets/audio/mwgt_vo_gen_12.webm');
      this.load.audio('walk1', 'assets/audio/mwgt_vo_gen_08.webm');
      this.load.audio('walk2', 'assets/audio/mwgt_vo_gen_04.webm');
      this.load.audio('walk3', 'assets/audio/mwgt_vo_gen_15.webm');
      this.load.audio('walk4', 'assets/audio/mwgt_vo_gen_02.webm');
      this.load.audio('walk5', 'assets/audio/mwgt_vo_gen_12.webm');
      this.load.audio('walk6', 'assets/audio/mwgt_vo_gen_13.webm');
      this.load.audio('walk7', 'assets/audio/mwgt_vo_gen_10.webm');

      this.load.audio('musicLoop_long', 'assets/audio/music/The More We Get Together_Long_Loop_001_[M].webm');
      //this.load.audio('musicLoop_short', 'assets/audio/music/The More We Get Together_Short_Loop_001_[M].webm');
      this.load.audio('musicIntense', 'assets/audio/music/The More We Get Together_Ending_001_[M].webm');

/*
      this.load.audio('happy2', 'assets/audio/mwgt_vo_gen_02.webm');
      this.load.audio('happy3', 'assets/audio/mwgt_vo_gen_03.webm');
      this.load.audio('happy4', 'assets/audio/mwgt_vo_gen_04.webm');
      this.load.audio('happy5', 'assets/audio/mwgt_vo_gen_05.webm');
      this.load.audio('happy6', 'assets/audio/mwgt_vo_gen_06.webm');
      this.load.audio('happy7', 'assets/audio/mwgt_vo_gen_07.webm');
      this.load.audio('happy8', 'assets/audio/mwgt_vo_gen_08.webm');
      this.load.audio('happy9', 'assets/audio/mwgt_vo_gen_09.webm');
      this.load.audio('happy10', 'assets/audio/mwgt_vo_gen_10.webm');
      this.load.audio('happy11', 'assets/audio/mwgt_vo_gen_11.webm');
      this.load.audio('happy13', 'assets/audio/mwgt_vo_gen_13.webm');
      this.load.audio('happy14', 'assets/audio/mwgt_vo_gen_14.webm');
      this.load.audio('happy15', 'assets/audio/mwgt_vo_gen_15.webm');
*/
    },

    create: function () {
      //this.asset.cropEnabled = false;
	  this.game.state.start('menu');
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

	
	fileLoaded: function(progress) {
		this.loaderEmpty.crop.left = (585 / 100) * progress;
		this.loaderFull.crop.width = (585 / 100) * progress;
		//if(progress == 100) this.ready = true;
	}
  };

}(this));
