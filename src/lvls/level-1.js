// game State (level) object for Nadion template
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

(function()
{
	MyGame.Level_1 = function ()
	{
		// call the super-class constructor
		Nadion.Level.call( this );

		this.tile_width = 16;
		this.tile_height = 16;

		//this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');


		// tilemap
		this.tilemap = 'assets/maps/level-11.json';

		// tileset
		this.tileset_url = 'assets/img/Jungle_terrain.png';

		this.font_png = 'assets/fonts/carrier_command.png';
		this.font_xml = 'assets/fonts/carrier_command.xml';


		// spritesheets
		this.spritesheets =
		[
			{
				name: 'chick',
				url: 'assets/img/b_kirbstyle.png',
				width: 32,
				height:30
			},
			{
				name: 'big-cat',
				url: 'assets/img/biggie_cat.png',
				width: 64,
				height:64
			},
			{
				name: 'bad-cat',
				url: 'assets/img/baddie_cat_1.png',
				width: 16,
				height:16
			},
			{
				name: 'bullet',
				url: 'assets/img/bullet.png',
				width: 21,
				height: 17
			},
			{
				name: 'owl',
				url: 'assets/img/owl.png',
				width: 42,
				height: 55
			}
		];
		// images
		this.images =
		[
			{
				name: 'background',
				url: 'assets/img/background2.png',
				width: 1024,
				height: 512
			},
			{
				name: 'paused',
				url: 'assets/img/paused.png',
				width: 320,
				height: 240
			},
			{
				name: 'rain',
				url: 'assets/img/rain.png',
				width: 16,
				height: 64
			},
			{
				name: 'dirt',
				url: 'assets/img/dirt.png',
				width: 5,
				height: 5
			}
		];
		this.paused_image_key = 'paused';

		// sound fx
		// (sans extension, must exist as both mp3 & ogg
		// extension will be added in code)
		this.sounds =
		[
			{
				name: 'main-music-loop',
				url: 'assets/snd/level1',
				volume: 0.2
			}
		];
		// background music/soundtrack
		var bg_music_idx = Nadion.findNamedItemInArray( this.sounds, 'main-music-loop' );
		if( bg_music_idx !== undefined )
			this.background_music = this.sounds[bg_music_idx];



		// background color
		this.background_color = '#000000';

		// set the game_namespace, which is where the Tiled object creation
		// code will look for your object types (it will fall-back to Nadion
		// and then the global namespace)
		this.game_namespace = MyGame;

		// if you set the loading font style to a bitmap font,
		// the percentage loaded will display along with the 'loading' png
		//this.loading_text_style = { font: "carrier_command", align: "center" };
	};
	MyGame.Level_1.prototype = Object.create( Nadion.Level );
	Nadion.__extends( MyGame.Level_1, Nadion.Level );
	MyGame.Level_1.prototype.constructor = MyGame.Level_1;


})();
