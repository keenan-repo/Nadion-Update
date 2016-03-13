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

		// load the assets we need for the splash/menu state
    this.game.load.image( 'logo', 'assets/img/nadion.png' );
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
			  {  this.game.scale.minWidth = Nadion.VIEW_WIDTH*2;
			    this.game.scale.minHeight = Nadion.VIEW_HEIGHT*2;
				// scale up to 1.5x maximum
			    this.game.scale.maxWidth = Nadion.VIEW_WIDTH * 3;
			    this.game.scale.maxHeight = Nadion.VIEW_HEIGHT * 3;
			    this.game.scale.forceLandscape = true;
			    this.game.scale.pageAlignHorizontally = true;
				}
				/*	this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;*/



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

		// TODO: wait for our sound(s) to be loaded
	//	while( !this.cache.isSoundDecoded( 'logo-fx' ) ) {}

		// fade in the logo
    this.logo = this.game.add.sprite( 0, 0, 'logo' );
		this.logo.alpha = 0;
		this.tween = this.game.add.tween( this.logo )
			.to ({ alpha : 1 }, 3000, Phaser.Easing.Sinusoidal.In )
			.start();
		this.tween.onComplete.addOnce( onReady, this );

		// play the start-screen music
		this.music = this.game.add.audio( 'logo-fx' );
		this.music.play( '', 0, 0.5 );

		this.game.stage.backgroundColor = '#000000';

		this.ready = false;
	}

	function onReady()
	{
		// aaaaand we're ready to start
		this.ready = true;
	}

	function update()
	{


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
	}

	// return public API for this module
	return {
		preload : preload,
		create : create,
		update : update
	};
})();
