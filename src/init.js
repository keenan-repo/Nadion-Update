// init State for Nadion template
//
// Copyright 2013 Joshua C. Shepard
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


"use strict";

MyGame.Init = (function() {

	function preload() {
		// load the "preload" sprit
		this.game.load.image( 'preload', 'assets/img/loading.png' );
		this.game.load.spritesheet('button', 'assets/img/button_grey.png', 102, 30);


		// load the assets we need for the splash/menu state
    this.game.load.image( 'logo', 'assets/img/splash.png' );
		this.game.load.audio( 'logo-fx', ['assets/snd/phaser.mp3', 'assets/snd/phaser.ogg'] );
	}

	function create()
	{
		// (WebGL doesn't have a context and can't do this)
		if( this.game.context )
			Phaser.Canvas.setSmoothingEnabled( this.game.context, false );

		// we'll redraw the entire screen every time, no need to clear
			this.game.stage.clear = false;

			if( this.game.device.desktop )

				// don't scale below actual size
			  {
					this.game.scale.SHOW_ALL
					this.game.scale.minWidth = Nadion.VIEW_WIDTH;
			    this.game.scale.minHeight = Nadion.VIEW_HEIGHT;
				// scale up to 1.5x maximum
			    this.game.scale.maxWidth = Nadion.VIEW_WIDTH * 1.5;
			    this.game.scale.maxHeight = Nadion.VIEW_HEIGHT * 1.5;
			    this.game.scale.forceLandscape = true;
			    this.game.scale.pageAlignHorizontally = true;
				}


		// in "developer mode" ?
		var lvl = this.game.net.getQueryString( 'dev' );
		var new_state;
		if( typeof( lvl ) == 'string' )
		{
			this.game.developer_mode = true;
			// try to convert to a number
			var ln = +lvl;
			if( !isNaN( ln ) )
			{
				// start this level
				new_state = MyGame["Level_" + ln];
				this.game.state.add( 'level-' + ln, new_state, true );
			}
			else
			{
				var saved_state = Nadion.loadState( MyGame.save_file );
				if( saved_state )
				{
					// start the appropriate level
					new_state = MyGame["Level_" + saved_state.level];
					this.game.state.add( 'level-' + saved_state.level, new_state, true );
					return;
				}
			}
		}

		// setup touch input (in order to start game on mobile)
		this.game.input.addPointer();
		this.set_control = false;

		// TODO: wait for our sound(s) to be loaded
	//	while( !this.cache.isSoundDecoded( 'logo-fx' ) ) {}

		// fade in the logo

    this.logo = this.game.add.sprite( 0, 0, 'logo' );
		this.logo.alpha = 0;
		this.tween = this.game.add.tween( this.logo )
			.to ({ alpha : 1 }, 100, Phaser.Easing.Sinusoidal.In )
			.start();
		this.tween.onComplete.addOnce( onReady, this );
		this.menu = this.game.add.button(this.game.width/2+15, this.game.height-75, 'button', actionOnClick, this, 1, 0);
		this.menu.anchor.set(0.5);
		this.controls_text = this.game.add.text(this.game.width/2+15, this.game.height-73, 'controls', { fontSize: "16px", fill: "#FFFFFF", align: "center" })
		this.controls_text.anchor.set(0.5);
		this.controls_text.setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
		//this.menu.scale = 0.5;
		//this.menu.bringToTop();


		//var button = this.game.add.button(this.game.world.centerX - 200, 400, 'button', actionOnClick, this, 2, 1, 0);
		// play the start-screen music
		this.music = this.game.add.audio( 'logo-fx' );
		this.music.play( '', 0, 0.5 );

		this.game.stage.backgroundColor = '#000000';

		this.ready = false;
		console.log(this);
	}

	function onReady()
	{
		// aaaaand we're ready to start
		this.ready = true;
	}

	function update()
	{
		if (this.set_control){
			updateControls(this);
		}
		// wait until we're ready...
		while( !this.ready ) return;

		// start game on keypress or touch
		if( this.game.input.keyboard.isDown( Phaser.Keyboard.ENTER ) || this.game.input.keyboard.isDown( Phaser.Keyboard.SPACEBAR ))
		{
			var saved_state = Nadion.loadState( MyGame.save_file );
			if( saved_state )
			{
				// start the appropriate level
				var new_state = MyGame["Level_" + saved_state.level];
				this.game.state.add( 'level-' + saved_state.level, new_state, true );
			}
			else
			{
				var l = new MyGame.Level_1;
				this.game.state.add( 'level-1', l, true );
			}
		}
		this.game.input.keyboard.reset();
	}

	function actionOnClick(){
		this.logo.visible = false;
		this.menu.visible = false;
		this.controls_text.visible = false;
		this.back_button = this.game.add.button(20, 300, 'button', create, this, 1, 0);
		this.back_text = this.game.add.text(50, 305, 'back', { fontSize: "16px", fill: "#FFFFFF", align: "center" });
		this.back_text.align.center;
		this.back_text.setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);

		this.buttons_array = {};
		this.keys = ['KEY_L_LEFT', 'KEY_L_UP', 'KEY_L_RIGHT', 'KEY_L_DOWN', 'KEY_R_LEFT', 'KEY_R_UP', 'KEY_R_RIGHT', 'KEY_R_DOWN', 'KEY_SHOOT'];
		this.key_names = {};
		this.key_descriptions = ["Left","Up","Right","Down","Dash Left", "Jump","Dash Right","Duck", "Shoot"];
		this.key_text = {};
		for (var i = 0; i < 4; i++){
			this.buttons_array[i] = this.game.add.button(20, i*40+5, 'button');
			this.buttons_array[i]._onOutFrame = 0;
			this.buttons_array[i]._onOverFrame = 1;
			this.buttons_array[i].name = this.keys[i];
			this.buttons_array[i].inputEnabled = true;
			this.buttons_array[i].events.onInputDown.add(setKey, this);
			this.key_names[i] = this.game.add.text(60, i*40+15, String.fromCharCode(MyGame[this.keys[i]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
			this.key_names[i].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
			this.key_text[i] = this.game.add.text(130, 15+40*i, this.key_descriptions[i], { font: "16px Arial", fill: "#ffffff", align: "center" });

			this.buttons_array[i+4] = this.game.add.button(220, i*40+5, 'button');
			this.buttons_array[i+4]._onOutFrame = 0;
			this.buttons_array[i+4]._onOverFrame = 1;
			this.buttons_array[i+4].name = this.keys[i+4];
			this.buttons_array[i+4].inputEnabled = true;
			this.buttons_array[i+4].events.onInputDown.add(setKey, this);
			this.key_names[i+4] = this.game.add.text(260, i*40+15, String.fromCharCode(MyGame[this.keys[i+4]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
			this.key_names[i+4].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
			this.key_text[i+4] = this.game.add.text(330, 15+40*i, this.key_descriptions[i+4], { font: "16px Arial", fill: "#ffffff", align: "center" });
		}
		console.log(i);
		this.buttons_array[i+4] = this.game.add.button(20, i*40+5, 'button');
		this.buttons_array[i+4]._onOutFrame = 0;
		this.buttons_array[i+4]._onOverFrame = 1;
		this.buttons_array[i+4].name = this.keys[i+4];
		this.buttons_array[i+4].inputEnabled = true;
		this.buttons_array[i+4].events.onInputDown.add(setKey, this);
		this.key_names[i+4] = this.game.add.text(60, i*40+15, String.fromCharCode(MyGame[this.keys[i+4]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
		this.key_names[i+4].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
		this.key_text[i+4] = this.game.add.text(130, 15+40*i, this.key_descriptions[i+4], { font: "16px Arial", fill: "#ffffff", align: "center" });
		console.log(this.buttons_array);
	};

	function setKey(item){
		this.set_control = true;
		if (item.name == 'KEY_L_LEFT') {
				this.keyToUpdate = 'KEY_L_LEFT';
		} else if (item.name == 'KEY_L_UP') {
				this.keyToUpdate = 'KEY_L_UP';
		} else if (item.name == 'KEY_L_RIGHT' ) {
				this.keyToUpdate = 'KEY_L_RIGHT';
		} else if (item.name == 'KEY_L_DOWN' ) {
				this.keyToUpdate = 'KEY_L_DOWN';
		} else if (item.name == 'KEY_R_LEFT') {
				this.keyToUpdate = 'KEY_R_LEFT';
		} else if (item.name == 'KEY_R_UP') {
					this.keyToUpdate = 'KEY_R_UP';
		} else if (item.name == 'KEY_R_RIGHT' ) {
				this.keyToUpdate = 'KEY_R_RIGHT';
		} else if (item.name == 'KEY_R_DOWN' ) {
				this.keyToUpdate = 'KEY_R_DOWN';
		} else if (item.name == 'KEY_SHOOT' ) {
				this.keyToUpdate = 'KEY_SHOOT';
			}
	};

	function updateControls(object) {
			if (object.game.input.keyboard.event){
				object.set_control = false;
				MyGame[object.keyToUpdate] = object.game.input.keyboard.event.keyCode;
				object.key_names[object.keys.indexOf(object.keyToUpdate)].text = String.fromCharCode(MyGame[object.keyToUpdate]);
			}
	};
	// return public API for this module
	return {
		preload : preload,
		create : create,
		update : update
	};
})();
