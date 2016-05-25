(function()
{
	MyGame.Levelselect = function(){};

	MyGame.Levelselect.prototype.preload =  function(){
			this.game.load.image( 'preload', 'assets/img/loading.png' );


			this.game.load.spritesheet( 'lvl-button', 'assets/img/lvlbutton.png', 80, 80 );
			this.game.load.spritesheet('button', 'assets/img/button_grey.png', 102, 30);
			this.game.load.spritesheet('bird', 	'assets/img/b_kirbstyle.png', 32, 32)
			// load the assets we need for the splash/menu state
	    this.game.load.image( 'level-select', 'assets/img/levelselect.png' );
			this.game.load.image( 'lock', 'assets/img/lock.png' );

			this.game.load.audio( 'logo-fx', ['assets/snd/phaser.mp3', 'assets/snd/phaser.ogg'] );
			this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

		};
	MyGame.Levelselect.prototype.create = function(){
		var game_state = this.game.state.states['default'];
		console.log(game_state);

		this.logo = this.game.add.sprite( 0, 0, 'level-select' );
		this.lvlbuttons = {};
		this.lvltext = {};
		this.locks = {};
		for (var i = 0; i < 5; i++) {
				this.lvlbuttons[i] = this.game.add.button(80+180*i,150, 'lvl-button');
				this.lvlbuttons[i]._onOutFrame = 0;
				this.lvlbuttons[i]._onOverFrame = 1;
				this.lvlbuttons[i].name = i;
				this.lvlbuttons[i].inputEnabled = true;
				this.lvlbuttons[i].events.onInputDown.add(loadLevel, this);
				this.lvltext[i] = this.game.add.bitmapText(80+180*i+40,190, 'carrier_command', '' + i + '', 15);
				this.lvltext[i].anchor.set(0.5);
				this.locks[i] = this.game.add.sprite(120+180*i,185, 'lock')
				this.locks[i].anchor.set(0.5);
		}

		for (i = 5; i < 9; i++) {
				this.lvlbuttons[i] = this.game.add.button(80+180*(i-5),300, 'lvl-button');
				this.lvlbuttons[i]._onOutFrame = 0;
				this.lvlbuttons[i]._onOverFrame = 1;
				this.lvlbuttons[i].name = i;
				this.lvlbuttons[i].inputEnabled = true;
				this.lvlbuttons[i].events.onInputDown.add(loadLevel, this);
				this.lvltext[i] = this.game.add.bitmapText(80+180*(i-5)+40,340, 'carrier_command', '' + i + '', 15);
				this.lvltext[i].anchor.set(0.5);
				this.locks[i] = this.game.add.sprite(120+180*(i-5),335, 'lock')
				this.locks[i].anchor.set(0.5);
		}

		this.main_menu_button = this.game.add.button(this.game.camera.x + this.game.camera.width, this.game.camera.y + this.game.camera.height, 'button', this.toMenu, this, 1, 0);
		this.main_menu_button.anchor.set(1);
		this.main_menu_button.fixedToCamera = true;
		this.main_menu_button_text = this.game.add.bitmapText(this.game.camera.x + this.game.camera.width-30, this.game.camera.y + this.game.camera.height-10, 'carrier_command', 'menu', 9);
		this.main_menu_button_text.anchor.set(1);
		this.main_menu_button_text.fixedToCamera = true;

		this.saved_state = Nadion.loadState( MyGame.save_file );

		function loadLevel(item){
			item.name ++

			var saved_state = Nadion.loadState( MyGame.save_file );
			if( item.name <= saved_state.level )
			{
				var new_state = MyGame["Level_" + item.name];
				game_state.music.stop('logo-fx');
				this.game.state.add( 'level-' + item.name, new_state, true );
				console.log('we loaded');
			}
		};


		var saved_state = Nadion.loadState( MyGame.save_file );
		if( saved_state )
		{
			var level_number =  saved_state.level;
		} else {
			window.alert('No saved game! Time to start a new one..');
		}

		for (var i = 0; i < level_number; i++) {
			this.locks[i].visible = false
		}

		this.bird = this.game.add.sprite(120, 180, 'bird');
		this.bird.anchor.set(0.5);
		this.bird.animations.add( 'right', [1, 2], 3, true );
		this.bird.x = 120+180*(this.saved_state.level-1);

		};

	MyGame.Levelselect.prototype.update = function(){
		this.bird.animations.play('right');
		};

		MyGame.Levelselect.prototype.toMenu = function() {
			this.game.state.start( 'default', true, true );
		};

})();
