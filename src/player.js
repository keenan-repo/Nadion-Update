// player sprite for Nadion template game
// (extends 'Phaser.Sprite')
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


(function()
{

	"use strict";

	///////////////////////////////////////////////////////////////////
	// PLAYER
	///////////////////////////////////////////////////////////////////
	var player_states = [
		{
			'name' : 'idle',
			'initial' : true,
			'events' :
			{
				'left' : 'walking',
				'right' : 'walking',
				'jump' : 'jumping',
				'hit' : 'stunned',
				'dash' : 'dashing',
				'attack' : 'attacking'
			}
		},
		{
			'name' : 'walking',
			'events' :
			{
				'stop' : 'idle',
				'jump' : 'jumping',
				'fall' : 'falling',
				'hit' : 'stunned',
				'dash' : 'dashing',
				'attack' : 'attacking'
			}
		},
		{
			'name' : 'jumping',
			'events' :
			{
				'land' : 'recovering',
				'hit' : 'stunned',
				'fall' : 'falling',
				'dash' : 'dashing',
				'attack' : 'attacking',
				'jump' : 'jumping'
			}
		},
		{
			'name' : 'recovering',
			'events' :
			{
				'recover' : 'idle'
			}
		},
		{
			'name' : 'falling',
			'events' :
			{
				'land' : 'idle',
				'hit' : 'stunned',
				'dash' : 'dashing',
				'attack' : 'attacking'//,
				//'jump' : 'jumping'
			}
		},
		{
			'name' : 'stunned',
			'events' :
			{
				'recover' : 'idle',
				'hit' : 'stunned'
			}
		},
	  {
			'name' : 'attacking',
			'events' :
			{
				'bite' : 'attacking',
				'finish' : 'idle',
				'left' : 'walking',
				'right' : 'walking'
			}
		},
		{
			'name' : 'dashing',
			'events' :
			{
				'right' : 'idle',
				'left' : 'idle',
				'land' : 'idle',
				'fall' : 'falling'
			}
		}
	];




	MyGame.Player = function ( game, name, x, y, width, height, props ) {
		Nadion.BaseSprite.call( this, game, 'chick', name, x, y, width, height, props );
		// fields
		var game_state = this.game.state.states[this.game.state.current];
		this.facing = Phaser.RIGHT;
		this.stunned_timer = 0;
		this.stunned_timeout = 500;
		this.attack_timer = 0;
		this.attack_timeout = 500;
		this.time = game.time;
		this.fsm = new Nadion.StateMachine( player_states, this );
		this.jump_increment = 600;
		this.walk_velocity = 200;
		this.dash_speed = 600;
		this.recovery_timer = 0;
		this.recovery_timeout = 150;
		this.dash_timer = 0;
		this.dash_timeout = 1500;
		// yes, this is the player sprite!
		// (if you don't set this on some sprite the game won't be able
		// start)
		this.is_player_sprite = true;
		this.nextFire = 0;
		this.fireRate = 100;

		this.jump_time_out = 200;

		// Phaser.Sprite settings
		this.body.collideWorldBounds = true;
		this.body.width = 16;
		this.body.gravity.y = 2000;
		this.body.maxVelocity.y = this.jump_increment;
		this.animations.add( 'jump-left', [3], 1, true );
		this.animations.add( 'jump-right', [3], 1, true );
		this.animations.add( 'left', [0, 1, 2], 3, true );
		this.animations.add( 'right', [0, 1, 2], 3, true );
		this.animations.add( 'bite', [3, 2, 3, 2], 0.1, true);
		game.add.existing( this );

		this.birdpauseMenu = new PauseMenu(this.game);

		this.birdHealthBar = new HealthBar(this.game, {x:60, y: 470});
		this.birdHealthBar.setFixedToCamera(true);
		this.health = 100;
		this.canDoubleJump = true;
		console.log(this);
	};

	MyGame.Player.prototype = Object.create( Nadion.BaseSprite );
	Nadion.__extends( MyGame.Player, Nadion.BaseSprite );
	MyGame.Player.prototype.constructor = MyGame.Player;
	var	bullets;
	var bullet;


	// prototype (methods)
	MyGame.Player.prototype.reset = function() {
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.facing = Phaser.RIGHT;
		this.stunned_timer = 0;
		this.attack_timer = 0;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.birdHealthBar.setPercent(100);
		this.health = 100;
		this.fsm.reset();
	};

	// state machine event handlers:
	MyGame.Player.prototype.idle = function() {
		this.animations.stop();
		this.frame = 0;
		if( this.facing == Phaser.LEFT ) {
			this.scale.x = -1;
		} else {
			this.scale.x = 1;
		}
	};

	MyGame.Player.prototype.walking = function() {
		if( this.facing == Phaser.LEFT ) {
			this.goLeft();
		} else {
			this.goRight();
		}
	};
	MyGame.Player.prototype.jumping = function() {
		this.jump();
	};
	MyGame.Player.prototype.falling = function() {
	};
	MyGame.Player.prototype.recovering = function() {
		this.recovery_timer = this.time.time;
		this.fsm.consumeEvent( 'recover' );
	};

	MyGame.Player.prototype.stunned = function() {
		// start timer
		this.stunned_timer = this.time.time;
		// TODO: frames/animation for stunned state
		this.frame = 3;
		if( this.facing == Phaser.LEFT ){
			this.scale.x = -1;
		} else {
			this.scale.x = 1;
		}
	};

	MyGame.Player.prototype.attacking = function() {
	};

	MyGame.Player.prototype.shoot = function(buttons) {
		//this.L = L;
		var fireRate = 1000;
		var nextFire = 0;
		var l = [true, false, false, false, false, false, false, false];
		var l_up = [true, true, false, false, false, false, false, false];
		var up = [false, true, false, false, false, false, false, false];
		var r_up = [false, true, true, false, false, false, false, false];
		var r = [false, false, true, false, false, false, false, false];
		var r_d = [false, false, true, true, false, false, false, false];
		var d = [false, false, false, true, false, false, false, false];
		var l_d = [true, false, false, true, false, false, false, false];
		var f = [false, false, false, false, false, false, false, false]
		this.attack_timer = this.time.time;
		bullets = this.game.add.group();
		if (buttons.every(function(element, index) {
			return element === f[index];
			})) {
			} else{
			bullets.enableBody = true;
			bullets.physicsBodyType = Phaser.Physics.ARCADE;
			bullets.createMultiple(50, 'bullet');
			bullets.setAll('checkWorldBounds', true);
			bullets.setAll('outOfBoundsKill', true);
			bullet = bullets.getFirstDead();
			bullet.reset(this.x + 4 , this.y + 4);
			bullet.anchor.set(0.5);


			if (buttons.every(function(element, index) {
				return element === l[index];
				})){
					bullet.body.velocity.x = -400;
					bullet.body.velocity.y = 0;
			} else if (buttons.every(function(element, index) {
				return element === l_up[index];
				})){
					bullet.angle = 45;
					bullet.body.velocity.x = -300;
					bullet.body.velocity.y = -200;
			 }else if (buttons.every(function(element, index) {
				return element === up[index];
				})){
					bullet.angle = 90;
					bullet.body.velocity.x = 0;
					bullet.body.velocity.y = -400;
			} else if (buttons.every(function(element, index) {
				return element === r_up[index];
				})){
					bullet.angle = 135;
					bullet.body.velocity.x = 300;
					bullet.body.velocity.y = -200;
			} else if (buttons.every(function(element, index) {
				return element === r[index];
				})){
					bullet.angle = 180;
					bullet.body.velocity.x = 400;
					bullet.body.velocity.y = 0;
			} else if (buttons.every(function(element, index) {
				return element === r_d[index];
				})){
					bullet.angle = -135;
					bullet.body.velocity.x = 300;
					bullet.body.velocity.y = 200;
			} else if (buttons.every(function(element, index) {
				return element === d[index];
				})){
					bullet.angle = -90;
					bullet.body.velocity.x = 0;
					bullet.body.velocity.y = 400;
			} else if (buttons.every(function(element, index) {
				return element === l_d[index];
				})){
					bullet.angle = -45;
					bullet.body.velocity.x = -300;
					bullet.body.velocity.y = 200;
			} else {
				bullet.kill();
			}
		}
	};

	MyGame.Player.prototype.dashing = function(){
		this.dash_timer = this.time.time;
		if( this.facing == Phaser.LEFT ) {
			this.dashLeft();
		} else {
			this.dashRight();
		}
	};

	MyGame.Player.prototype.quickMove = function(buttons){
		var l =    [true, false, false, false, true, false, false, false];
		var l_up = [true, true, false, false, true, false, false, false];
		var up =   [false, true, false, false, false, false, false, false];
		var r_up = [false, true, true, false, false, true, true, false];
		var r =    [false, false, true, false, false, false, true, false];
		var r_d =  [false, false, true, true, false, false, true, false];
		var d =    [false, false, false, true, false, false, false, true];
		var l_d =  [true, false, false, true, true, false, false, false];
		var f =    [false, false, false, false, false, false, false, false]

		console.log('quick move');

		if (this.body.velocity.x > 0){
			if (this.body.velocity.x - 15*Math.floor(this.dash_speed/this.body.velocity.x) > 0) {
				this.body.velocity.x = this.body.velocity.x - 15*Math.floor(this.dash_speed/this.body.velocity.x);
			} else {
				this.body.velocity.x = 0;
			}

		}

	};


	MyGame.Player.prototype.spriteCollisionCallback = function(p , s ) {
		// we were hit by an Jumpcat!
		if( s instanceof MyGame.Jumpcat ){
			this.hit();
			//s.kill();
		}
	};

	MyGame.Player.prototype.bulletCollisionCallback = function(p, s) {
		if(s instanceof MyGame.Jumpcat){
			p.kill();
			s.kill();
		}
	};

	MyGame.Player.prototype.canJump = function() {
		return this.time.elapsedSince( this.recovery_timer ) > this.recovery_timeout;
	};
	MyGame.Player.prototype.canAttack = function() {
		return this.time.elapsedSince(this.attack_timer) > this.attack_timeout;
	};

	MyGame.Player.prototype.canDash = function() {
		return this.time.elapsedSince(this.dash_timer) > this.dash_timeout;
	};


	MyGame.Player.prototype.hit = function() {
		// can't be hit while already stunned
		if( this.fsm.getState() != 'stunned' ) {
			this.fsm.consumeEvent( 'hit' );
			this.health = this.health - 25;
			this.birdHealthBar.setPercent(this.health);
			if (this.health == 0) {
				this.reset();
			}
		}
		// a real game would do something more interesting here, but we'll just
		// enter the 'stunned' state and bounce back a bit

		if( this.body.touching.right ) {
			this.body.velocity.x = -150;
			this.body.touching.right = false;
		} else if( this.body.touching.left ) {
			this.body.velocity.x = 150;
			this.body.touching.left = false;
		}

		if( this.body.touching.down ) {
			this.body.velocity.y = -150;
			this.body.touching.down = false;
		} else if( this.body.touching.up ) {
			this.body.velocity.y = 150;
			this.body.touching.up = false;
		}
	};


	// move in air (jump/fall) right
	MyGame.Player.prototype.airborneRight = function() {
		this.goRight();
		this.frame = 3;
	};

	// move in air (jump/fall) left
	MyGame.Player.prototype.airborneLeft = function()	{
		this.goLeft();
		this.frame = 3;
	};
	// move right
	MyGame.Player.prototype.goRight = function() {
		this.scale.x = 1;
		this.facing = Phaser.RIGHT;
		this.animations.play( 'right' );
		this.body.velocity.x = this.walk_velocity;
	};

	// move left
	MyGame.Player.prototype.goLeft = function()	{
		// flip on x axis
		this.scale.x = -1;
		this.facing = Phaser.LEFT;
		this.animations.play( 'left' );
		this.body.velocity.x = -this.walk_velocity;
	};

	MyGame.Player.prototype.dashRight = function() {
		this.scale.x = 1;
		this.facing = Phaser.RIGHT;
		if (this.body.velocity.x > 0){
			if (380*Math.tan(this.body.velocity.x/600) > 0) {
					this.body.velocity.x = 380*Math.tan(this.body.velocity.x/600);
			} else {
				this.body.velocity.x = 0;
			}
		}
	};

	// move left
	MyGame.Player.prototype.dashLeft = function()	{
		// flip on x axis
		this.scale.x = -1;
		this.facing = Phaser.LEFT;
		if (this.body.velocity.x < 0){
			/*if (this.body.velocity.x + Math.floor(20*this.dash_speed/this.body.velocity.x) < 0) {
				this.body.velocity.x = this.body.velocity.x - Math.floor(20*this.dash_speed/this.body.velocity.x);*/
			if (380*Math.tan(this.body.velocity.x/600) < 0) {
					this.body.velocity.x = 380*Math.tan(this.body.velocity.x/600);
			} else {
				this.body.velocity.x = 0;
			}
		}
	};

	MyGame.Player.prototype.jump = function() {
		this.body.velocity.y -= this.jump_increment;
		this.body.blocked.down = false;
		this.body.touching.down = false;
		// what direction are we facing
		if( this.facing == Phaser.LEFT ) {
		// flip on x axis
			this.scale.x = -1;
			this.animations.play( 'jump-left' );
		} else {
			this.scale.x = 1;
			this.animations.play( 'jump-right' );
		}
	};



	MyGame.Player.prototype.updateObject = function() {
		var game_state = this.game.state.states[this.game.state.current];
		//this.birdHealthBar.bringToTop();
		// collide player with tilemap layers that are marked 'solid'
		for( var i = 0; i < game_state.layers.length; i++ ) {
			var lyr = game_state.layers[i];
			if( lyr.solid )
				this.game.physics.arcade.collide( this, lyr );
		}
		// collide with sprites that are 'solid'
		for( i = 0; i < game_state.groups.length; i++ ) {
			this.game.physics.arcade.collide( this, game_state.groups[i], this.spriteCollisionCallback, null, this );
		}

		//collide with bullets
		for( var i = 0; i < game_state.groups.length; i++ ){
		 this.game.physics.arcade.overlap(bullets, game_state.groups[i], this.bulletCollisionCallback, null, this);
		}

		// handle input
		//LEFT hand controls - movement
		var L_left = this.game.input.keyboard.isDown( MyGame.KEY_L_LEFT ) || false;
		var up = this.game.input.keyboard.isDown(MyGame.KEY_L_UP) || false;
		var L_right = this.game.input.keyboard.isDown( MyGame.KEY_L_RIGHT ) || false ;
		var down = this.game.input.keyboard.isDown(MyGame.KEY_L_DOWN) || false;

		//RIGHT hand controls - attack types
		var R_left = this.game.input.keyboard.downDuration( MyGame.KEY_R_LEFT, 10 ) || false;
		var jump =this.game.input.keyboard.downDuration(MyGame.KEY_R_UP, 50) || false;
		var R_right = this.game.input.keyboard.downDuration( MyGame.KEY_R_RIGHT, 50 ) || false;
		var duck = this.game.input.keyboard.isDown(MyGame.KEY_R_DOWN) || false;

		var shoot = this.game.input.keyboard.isDown(MyGame.KEY_SHOOT) || false;
		var buttons = [L_left, up, L_right, down, R_left, jump, R_right, duck]
		var state = this.fsm.getState();

		var key_event = this.game.input.keyboard.event;

		//console.log('STATE: ' + state);
		switch( state )
		{
			case 'idle':
				// reset horizontal velocity
				this.body.velocity.x = 0;
				if (this.body.blocked.down) {
					//console.log('setting doublejump true from idle');
					this.canDoubleJump = true;
				} else {
					this.canDoubleJump = false;
				}

				// can walk or jump
				if( jump && this.canJump() ){
					this.doubleJumpTimer = this.time.time;
					this.fsm.consumeEvent( 'jump' );
				} else if( L_left ) {
					this.facing = Phaser.LEFT;
					this.fsm.consumeEvent( 'left' );
				} else if( L_right ) {
					this.facing = Phaser.RIGHT;
					this.fsm.consumeEvent( 'right' );
				}

			  if (shoot && this.canAttack()) {
					this.shoot(buttons);
					this.fsm.consumeEvent('attack');
					//this.attacking(L_left, L_right, up, buttons);
				} else if (buttons[6] && this.canDash()) {
						console.log('dash from idle');
						this.dash_timer = this.time.time;
						this.body.velocity.x = this.dash_speed;
						this.fsm.consumeEvent('dash');
				} else if (buttons[4] && this.canDash()){
						this.dash_timer = this.time.time;
						this.body.velocity.x = -this.dash_speed;
						this.fsm.consumeEvent('dash');
				}
				break;
			case 'stunned':
				// can't do anything except wait to recover
				if( this.time.elapsedSince( this.stunned_timer ) > this.stunned_timeout )
					this.fsm.consumeEvent( 'recover' );
				break;


			case 'attacking':
				//if( this.time.elapsedSince( this.attack_timer ) > this.attack_timeout ){
					this.fsm.consumeEvent( 'finish' );
			//	}

				break;
		case 'walking':
			// reset horizontal velocity
			this.canDoubleJump = true;
			this.body.velocity.x = 0;
			// can jump, fall, keep walking or stop

			// not touching ground ?
			//else if( !this.body.touching.down && !this.body.blocked.down )
			//	this.fsm.consumeEvent( 'fall' );
			if (shoot && this.time.elapsedSince( this.attack_timer ) > this.attack_timeout) {
				this.fsm.consumeEvent('attack');
				this.shoot(buttons);
			} else if( buttons[0] ) {
					this.goLeft();
			} else if( buttons[2] ) {
					this.goRight();
			}	else {
				this.fsm.consumeEvent( 'stop' );
			}

			 if (buttons[6] && this.canDash()) {
					console.log('in walking');
					this.dash_timer = this.time.time;
					this.body.velocity.x = this.dash_speed;
					this.fsm.consumeEvent('dash');
			} else if (buttons[4] && this.canDash()){
					this.dash_timer = this.time.time;
					this.body.velocity.x = -this.dash_speed;
					this.fsm.consumeEvent('dash');
			} else if ( jump && this.canJump() ){
					this.doubleJumpTimer = this.time.time;
					this.fsm.consumeEvent( 'jump' );
			}
			break;

		case 'jumping':


		case 'falling':
			// reset horizontal velocity

				this.body.velocity.x = 0;
				// land?
				if( this.body.touching.down || this.body.blocked.down ) {
					this.fsm.consumeEvent( 'land' );
				}
				// can move side to side
				if( L_left )
					this.airborneLeft();
				else if( L_right )
					this.airborneRight();
					if (this.time.elapsedSince(this.doubleJumpTimer) < this.jump_time_out)
						jump = false


					if( jump && this.canDoubleJump ){
						console.log('doube jumping');
						this.fsm.consumeEvent( 'jump' );
						this.canDoubleJump = false;
					} else if (buttons[6] && this.canDash()) {
							console.log('dash from idle');
							this.dash_timer = this.time.time;
							this.body.velocity.x = this.dash_speed;
							this.fsm.consumeEvent('dash');
					} else if (buttons[4] && this.canDash()){
							this.dash_timer = this.time.time;
							this.body.velocity.x = -this.dash_speed;
							this.fsm.consumeEvent('dash');
					}


			break;

			case 'dashing':
			this.body.velocity.y = 0;
				if (this.time.elapsedSince(this.dash_timer) > 500) {
					this.fsm.consumeEvent('right');
					console.log('done dashing');
				}
				if (this.body.velocity.x > 0){
					this.dashRight();
				} else if (this.body.velocity.x < 0) {
					this.dashLeft();
				} else {

				}

			break;


		default:
			break;
		}
	};
})();


/*if (buttons.every(function(element, index) {
	return element === f[index];
	})) {
	} else {
		if (buttons.every(function(element, index) {
			return element === l[index];
			})){
				this.body.velocity.x = -400;
				this.body.velocity.y = 0;
		} else if (buttons.every(function(element, index) {
			return element === l_up[index];
			})){
				this.body.velocity.x = -300;
				this.body.velocity.y = -200;
		 }else if (buttons.every(function(element, index) {
			return element === up[index];
			})){
				this.body.velocity.x = 0;
				this.body.velocity.y = -400;
		} else if (buttons.every(function(element, index) {
			return element === r_up[index];
			})){
				this.body.velocity.x = 300;
				this.body.velocity.y = -200;
		} else if (buttons.every(function(element, index) {
			return element === r[index];
			})){
				this.body.velocity.x = 400;
				this.body.velocity.y = 0;
		} else if (buttons.every(function(element, index) {
			return element === r_d[index];
			})){
				this.body.velocity.x = -300;
				this.body.velocity.y = 200;
		} else if (buttons.every(function(element, index) {
			return element === d[index];
			})){
				this.body.velocity.x = 0;
				this.body.velocity.y = 400;
		} else if (buttons.every(function(element, index) {
			return element === l_d[index];
			})){
				this.body.velocity.x = -300;
				this.body.velocity.y = 200;
		} else {
				this.body.velocity.x = 0;
				this.body.velocity.y = 0;
		}
	}*/
