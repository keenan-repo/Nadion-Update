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

MyGame.keyboardMap = [
						  "", // [0]
						  "", // [1]
						  "", // [2]
						  "CANCEL", // [3]
						  "", // [4]
						  "", // [5]
						  "HELP", // [6]
						  "", // [7]
						  "BACK_SPACE", // [8]
						  "TAB", // [9]
						  "", // [10]
						  "", // [11]
						  "CLEAR", // [12]
						  "ENTER", // [13]
						  "ENTER_SPECIAL", // [14]
						  "", // [15]
						  "SHIFT", // [16]
						  "CONTROL", // [17]
						  "ALT", // [18]
						  "PAUSE", // [19]
						  "CAPS_LOCK", // [20]
						  "KANA", // [21]
						  "EISU", // [22]
						  "JUNJA", // [23]
						  "FINAL", // [24]
						  "HANJA", // [25]
						  "", // [26]
						  "ESCAPE", // [27]
						  "CONVERT", // [28]
						  "NONCONVERT", // [29]
						  "ACCEPT", // [30]
						  "MODECHANGE", // [31]
						  "SPACE", // [32]
						  "PAGE_UP", // [33]
						  "PAGE_DOWN", // [34]
						  "END", // [35]
						  "HOME", // [36]
						  "LEFT", // [37]
						  "UP", // [38]
						  "RIGHT", // [39]
						  "DOWN", // [40]
						  "SELECT", // [41]
						  "PRINT", // [42]
						  "EXECUTE", // [43]
						  "PRINTSCREEN", // [44]
						  "INSERT", // [45]
						  "DELETE", // [46]
						  "", // [47]
						  "0", // [48]
						  "1", // [49]
						  "2", // [50]
						  "3", // [51]
						  "4", // [52]
						  "5", // [53]
						  "6", // [54]
						  "7", // [55]
						  "8", // [56]
						  "9", // [57]
						  "COLON", // [58]
						  "SEMICOLON", // [59]
						  "LESS_THAN", // [60]
						  "EQUALS", // [61]
						  "GREATER_THAN", // [62]
						  "QUESTION_MARK", // [63]
						  "AT", // [64]
						  "A", // [65]
						  "B", // [66]
						  "C", // [67]
						  "D", // [68]
						  "E", // [69]
						  "F", // [70]
						  "G", // [71]
						  "H", // [72]
						  "I", // [73]
						  "J", // [74]
						  "K", // [75]
						  "L", // [76]
						  "M", // [77]
						  "N", // [78]
						  "O", // [79]
						  "P", // [80]
						  "Q", // [81]
						  "R", // [82]
						  "S", // [83]
						  "T", // [84]
						  "U", // [85]
						  "V", // [86]
						  "W", // [87]
						  "X", // [88]
						  "Y", // [89]
						  "Z", // [90]
						  "OS_KEY", // [91] Windows Key (Windows) or Command Key (Mac)
						  "", // [92]
						  "CONTEXT_MENU", // [93]
						  "", // [94]
						  "SLEEP", // [95]
						  "NUMPAD 0", // [96]
						  "NUMPAD 1", // [97]
						  "NUMPAD 2", // [98]
						  "NUMPAD 3", // [99]
						  "NUMPAD 4", // [100]
						  "NUMPAD 5", // [101]
						  "NUMPAD 6", // [102]
						  "NUMPAD 7", // [103]
						  "NUMPAD 8", // [104]
						  "NUMPAD 9", // [105]
						  "MULTIPLY", // [106]
						  "ADD", // [107]
						  "SEPARATOR", // [108]
						  "SUBTRACT", // [109]
						  "DECIMAL", // [110]
						  "DIVIDE", // [111]
						  "F1", // [112]
						  "F2", // [113]
						  "F3", // [114]
						  "F4", // [115]
						  "F5", // [116]
						  "F6", // [117]
						  "F7", // [118]
						  "F8", // [119]
						  "F9", // [120]
						  "F10", // [121]
						  "F11", // [122]
						  "F12", // [123]
						  "F13", // [124]
						  "F14", // [125]
						  "F15", // [126]
						  "F16", // [127]
						  "F17", // [128]
						  "F18", // [129]
						  "F19", // [130]
						  "F20", // [131]
						  "F21", // [132]
						  "F22", // [133]
						  "F23", // [134]
						  "F24", // [135]
						  "", // [136]
						  "", // [137]
						  "", // [138]
						  "", // [139]
						  "", // [140]
						  "", // [141]
						  "", // [142]
						  "", // [143]
						  "NUM_LOCK", // [144]
						  "SCROLL_LOCK", // [145]
						  "WIN_OEM_FJ_JISHO", // [146]
						  "WIN_OEM_FJ_MASSHOU", // [147]
						  "WIN_OEM_FJ_TOUROKU", // [148]
						  "WIN_OEM_FJ_LOYA", // [149]
						  "WIN_OEM_FJ_ROYA", // [150]
						  "", // [151]
						  "", // [152]
						  "", // [153]
						  "", // [154]
						  "", // [155]
						  "", // [156]
						  "", // [157]
						  "", // [158]
						  "", // [159]
						  "CIRCUMFLEX", // [160]
						  "EXCLAMATION", // [161]
						  "DOUBLE_QUOTE", // [162]
						  "HASH", // [163]
						  "DOLLAR", // [164]
						  "PERCENT", // [165]
						  "AMPERSAND", // [166]
						  "UNDERSCORE", // [167]
						  "OPEN_PAREN", // [168]
						  "CLOSE_PAREN", // [169]
						  "ASTERISK", // [170]
						  "PLUS", // [171]
						  "PIPE", // [172]
						  "HYPHEN_MINUS", // [173]
						  "OPEN_CURLY_BRACKET", // [174]
						  "CLOSE_CURLY_BRACKET", // [175]
						  "TILDE", // [176]
						  "", // [177]
						  "", // [178]
						  "", // [179]
						  "", // [180]
						  "VOLUME_MUTE", // [181]
						  "VOLUME_DOWN", // [182]
						  "VOLUME_UP", // [183]
						  "", // [184]
						  "", // [185]
						  "SEMICOLON", // [186]
						  "EQUALS", // [187]
						  "COMMA", // [188]
						  "MINUS", // [189]
						  "PERIOD", // [190]
						  "SLASH", // [191]
						  "BACK_QUOTE", // [192]
						  "", // [193]
						  "", // [194]
						  "", // [195]
						  "", // [196]
						  "", // [197]
						  "", // [198]
						  "", // [199]
						  "", // [200]
						  "", // [201]
						  "", // [202]
						  "", // [203]
						  "", // [204]
						  "", // [205]
						  "", // [206]
						  "", // [207]
						  "", // [208]
						  "", // [209]
						  "", // [210]
						  "", // [211]
						  "", // [212]
						  "", // [213]
						  "", // [214]
						  "", // [215]
						  "", // [216]
						  "", // [217]
						  "", // [218]
						  "OPEN_BRACKET", // [219]
						  "BACK_SLASH", // [220]
						  "CLOSE_BRACKET", // [221]
						  "QUOTE", // [222]
						  "", // [223]
						  "META", // [224]
						  "ALTGR", // [225]
						  "", // [226]
						  "WIN_ICO_HELP", // [227]
						  "WIN_ICO_00", // [228]
						  "", // [229]
						  "WIN_ICO_CLEAR", // [230]
						  "", // [231]
						  "", // [232]
						  "WIN_OEM_RESET", // [233]
						  "WIN_OEM_JUMP", // [234]
						  "WIN_OEM_PA1", // [235]
						  "WIN_OEM_PA2", // [236]
						  "WIN_OEM_PA3", // [237]
						  "WIN_OEM_WSCTRL", // [238]
						  "WIN_OEM_CUSEL", // [239]
						  "WIN_OEM_ATTN", // [240]
						  "WIN_OEM_FINISH", // [241]
						  "WIN_OEM_COPY", // [242]
						  "WIN_OEM_AUTO", // [243]
						  "WIN_OEM_ENLW", // [244]
						  "WIN_OEM_BACKTAB", // [245]
						  "ATTN", // [246]
						  "CRSEL", // [247]
						  "EXSEL", // [248]
						  "EREOF", // [249]
						  "PLAY", // [250]
						  "ZOOM", // [251]
						  "", // [252]
						  "PA1", // [253]
						  "WIN_OEM_CLEAR", // [254]
						  "" // [255]
						];

MyGame.Init = (function() {

	function preload() {
		// load the "preload" sprit
		this.game.load.image( 'preload', 'assets/img/loading.png' );
		this.game.load.spritesheet('button', 'assets/img/button_grey.png', 102, 30);


		// load the assets we need for the splash/menu state
    this.game.load.image( 'logo', 'assets/img/splash.png' );
		this.game.load.audio( 'logo-fx', ['assets/snd/phaser.mp3', 'assets/snd/phaser.ogg'] );
		this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
		this.music_on = false;

	}

	function create()
	{
		this.music = this.game.add.audio( 'logo-fx' );

		if (!this.music_on) {
			this.music.play( '', 0, 0.1 );
			this.music_on = true
		}
		// (WebGL doesn't have a context and can't do this)
		if( this.game.context )
			Phaser.Canvas.setSmoothingEnabled( this.game.context, false );

		// we'll redraw the entire screen every time, no need to clear
			this.game.stage.clear = false;
			//this.game.stage.disableVisibilityChange = true;

			if( this.game.device.desktop )

				// don't scale below actual size
			  {
					this.game.scale.scaleMode = 2;
					this.game.scale.minWidth = Nadion.VIEW_WIDTH;
			    this.game.scale.minHeight = Nadion.VIEW_HEIGHT;
				// scale up to 1.5x maximum
			    this.game.scale.maxWidth = Nadion.VIEW_WIDTH * 1.5;
			    this.game.scale.maxHeight = Nadion.VIEW_HEIGHT * 1.5;
			    this.game.scale.forceLandscape = true;
			    this.game.scale.pageAlignHorizontally = true;
				}

				this.game.input.gamepad.start();

			 // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
			 	this.pad1 = this.game.input.gamepad.pad1;

			 	//this.game.input.onDown.add(dump, this);


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
				this.music.stop('logo-fx');
				new_state = MyGame["Level_" + ln];
				this.game.state.add( 'level-' + ln, new_state, true );
			}
			else
			{
				var saved_state = Nadion.loadState( MyGame.save_file );
				console.log(saved_state);
				if( saved_state )
				{
					// start the appropriate level
					this.music.stop('logo-fx');
					new_state = MyGame["Level_" + saved_state.level];
					this.game.state.add( 'level-' + saved_state.level, new_state, true );
					return;
				}
			}
		}

		// setup touch input (in order to start game on mobile)
		/*this.game.input.addPointer();
		this.set_control = false;*/

		// TODO: wait for our sound(s) to be loaded
	//	while( !this.cache.isSoundDecoded( 'logo-fx' ) ) {}

		// fade in the logo

    this.logo = this.game.add.sprite( 0, 0, 'logo' );
		this.logo.alpha = 0;
		this.tween = this.game.add.tween( this.logo )
			.to ({ alpha : 1 }, 100, Phaser.Easing.Sinusoidal.In )
			.start();
		this.tween.onComplete.addOnce( onReady, this );


		this.new_game = this.game.add.button(this.game.width/2+200, this.game.height-75, 'button', newGame, this, 1, 0);
		this.new_game.anchor.set(0.5);
		this.new_game_text = this.game.add.bitmapText(this.game.width/2+200, this.game.height-73, 'carrier_command', 'New Game', 9)
		this.new_game_text.anchor.set(0.5);

		this.load_game = this.game.add.button(this.game.width/2, this.game.height-75, 'button', loadGame, this, 1, 0);
		this.load_game.anchor.set(0.5);
		this.load_game_text = this.game.add.bitmapText(this.game.width/2, this.game.height-73, 'carrier_command', 'Continue', 8)
		this.load_game_text.anchor.set(0.5);

		this.menu = this.game.add.button(this.game.width/2-200, this.game.height-75, 'button', openOptions, this, 1, 0);
		this.menu.anchor.set(0.5);
		this.controls_text = this.game.add.bitmapText(this.game.width/2-200, this.game.height-73, 'carrier_command', 'controls', 9)
		this.controls_text.anchor.set(0.5);

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
		if (this.set_control){
			updateControls(this);
		}

		// Pad "connected or not" indicator
	/*	if (this.game.input.gamepad.supported && this.game.input.gamepad.active && this.pad1.connected)
		{
			this.load_game_text.visible = true;
		}
		else
		{
			this.load_game_text.visible = false;
		}*/
	//	console.log(this.game.input);
		// wait until we're ready...
		//while( !this.ready ) return;

		// start game on keypress or touch

		/*if( this.game.input.keyboard.isDown( Phaser.Keyboard.ENTER ))
		{
			this.music.stop('logo-fx');

			var saved_state = Nadion.loadState( MyGame.save_file );
			console.log(saved_state);
			if( saved_state )
			{
				// start the appropriate level
				// I'm not sure how this works but I can write my own
				/*var new_state = MyGame["Level_" + saved_state.level];
				this.game.state.add( 'level-' + saved_state.level, new_state, true );
				console.log(saved_state.level);
				console.log(saved_state.level);
				var new_state = MyGame["Level_" + saved_state.level];
				this.game.state.add( 'level-' + saved_state.level, new_state, true );
				console.log('we loaded');
			}
			else
			{
				var l = new MyGame.Level_1;
				this.game.state.add( 'level-1', l, true );
			}
		}*/

		/*if (this.pad1.justPressed(Phaser.Gamepad.XBOX360_A) || this.game.input.keyboard.isDown( Phaser.Keyboard.ENTER) ) {
			localStorage.clear();
			this.music.stop('logo-fx');
			var l = new MyGame.Level_1;
			this.game.state.add( 'level-1', l, true );
		}*/
		this.game.input.keyboard.reset();
	}

	function loadGame(){
		var saved_state = Nadion.loadState( MyGame.save_file );
		//var l = new MyGame.Init2;
		this.game.state.add( 'level-select', MyGame.Levelselect, true );		/*if( saved_state )
		{
			this.music.stop('logo-fx');
			var new_state = MyGame["Level_" + saved_state.level];
			this.game.state.add( 'level-' + saved_state.level, new_state, true );
		} else {
			window.alert('No saved game! Time to start a new one..');
		}*/
	}

	function newGame() {

		if (confirm("Are you sure you want to start a new game?")) {
			localStorage.clear();
			this.music.stop('logo-fx');
			var l = new MyGame.Level_1;
			this.game.state.add( 'level-1', l, true );
		}

	}

	function openOptions(){
		this.logo.visible = false;
		this.menu.visible = false;
		this.controls_text.visible = false;
		this.back_button = this.game.add.button(this.game.width/2-200, this.game.height-75, 'button', create, this, 1, 0);
		this.back_button.anchor.set(0.5);
		this.back_text = this.game.add.bitmapText(this.game.width/2-200, this.game.height-73, 'carrier_command', 'BACK', 9);
		this.back_text.anchor.set(0.5);

		this.buttons_array = {};
		this.keys = ['KEY_L_LEFT', 'KEY_L_UP', 'KEY_L_RIGHT', 'KEY_L_DOWN', 'KEY_R_LEFT', 'KEY_R_UP', 'KEY_R_RIGHT', 'KEY_R_DOWN', 'KEY_SHOOT'];
		this.key_names = {};
		this.key_descriptions = ["Left","Up","Right","Down","Dash Left", "Jump","Dash Right","Duck (Doesn't do anything)", "Shoot (This is disabled during the demo!)"];
		this.key_text = {};
		this.save_text = this.game.add.bitmapText(20, 220, 'carrier_command' , 'Press the M key during gameplay to save the game!', 10);
		for (var i = 0; i < 4; i++){
			//left hand side of the controls menu
			this.buttons_array[i] = this.game.add.button(20, i*40+5, 'button');
			this.buttons_array[i]._onOutFrame = 0;
			this.buttons_array[i]._onOverFrame = 1;
			this.buttons_array[i].name = this.keys[i];
			this.buttons_array[i].inputEnabled = true;
			this.buttons_array[i].events.onInputDown.add(setKey, this);
			this.key_names[i] = this.game.add.bitmapText(30, i*40+15, 'carrier_command', MyGame.keyboardMap[MyGame[this.keys[i]]], 10);
			//this.key_names[i].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
			this.key_text[i] = this.game.add.bitmapText(130, 15+40*i, 'carrier_command', this.key_descriptions[i], 10);

			//right hand side
			this.buttons_array[i+4] = this.game.add.button(220, i*40+5, 'button');
			this.buttons_array[i+4]._onOutFrame = 0;
			this.buttons_array[i+4]._onOverFrame = 1;
			this.buttons_array[i+4].name = this.keys[i+4];
			this.buttons_array[i+4].inputEnabled = true;
			this.buttons_array[i+4].events.onInputDown.add(setKey, this);
			this.key_names[i+4] = this.game.add.bitmapText(230, i*40+15, 'carrier_command', MyGame.keyboardMap[MyGame[this.keys[i+4]]], 10);
			this.key_text[i+4] = this.game.add.bitmapText(330, 15+40*i, 'carrier_command', this.key_descriptions[i+4], 10);
		}
		//last bottom left control button shoot
		this.buttons_array[i+4] = this.game.add.button(20, i*40+5, 'button');
		this.buttons_array[i+4]._onOutFrame = 0;
		this.buttons_array[i+4]._onOverFrame = 1;
		this.buttons_array[i+4].name = this.keys[i+4];
		this.buttons_array[i+4].inputEnabled = true;
		this.buttons_array[i+4].events.onInputDown.add(setKey, this);
		this.key_names[i+4] = this.game.add.bitmapText(30, i*40+15, 'carrier_command', MyGame.keyboardMap[MyGame[this.keys[i+4]]], 9);
		this.key_text[i+4] = this.game.add.bitmapText(130, 15+40*i, 'carrier_command', this.key_descriptions[i+4], 10);
		//console.log(this.buttons_array);
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
				console.log(object.game.input.keyboard);
				object.set_control = false;
				MyGame[object.keyToUpdate] = object.game.input.keyboard.event.keyCode;
				object.key_names[object.keys.indexOf(object.keyToUpdate)].text = MyGame.keyboardMap[MyGame[object.keyToUpdate]];
			}
	};

	// return public API for this module
	return {
		preload : preload,
		create : create,
		update : update
	};



})();
