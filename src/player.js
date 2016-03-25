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
				'attack' : 'attacking'
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
				'attack' : 'attacking'
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
		this.attack_timeout = 600;
		this.time = game.time;
		this.fsm = new Nadion.StateMachine( player_states, this );
		this.jump_increment = 500;
//		this.jump_increment = 250;
		this.walk_velocity = 200;
		this.recovery_timer = 0;
		this.recovery_timeout = 150;
		// yes, this is the player sprite!
		// (if you don't set this on some sprite the game won't be able
		// start)
		this.is_player_sprite = true;
		this.nextFire = 0;
		this.fireRate = 100;

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
	};

	MyGame.Player.prototype = Object.create( Nadion.BaseSprite );
	Nadion.__extends( MyGame.Player, Nadion.BaseSprite );
	MyGame.Player.prototype.constructor = MyGame.Player;
	var	bullets;
	var bullet;
	//bullets = MyGame.Player.game.add.group();


	// prototype (methods)
	MyGame.Player.prototype.reset = function() {
		console.log('reseting');
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.facing = Phaser.RIGHT;
		this.stunned_timer = 0;
		this.attack_timer = 0;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
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
			this.walkLeft();
		} else {
			this.walkRight();
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
		this.bite();
	};

//this should be called dash or something
	MyGame.Player.prototype.bite = function()	{
		/*var mouseX = this.game.input.activePointer.x;
		var mouseY = this.game.input.activePointer.y;
		var birdX = this.x - this.game.camera.x;
		var birdY = this.y - this.game.camera.y;
		var distance = Math.sqrt(Math.pow((mouseX-birdX), 2) + Math.pow((mouseY-birdY), 2));
		var dX = (mouseX - birdX);
		var dY = (mouseY - birdY);
		var angle = -1 * Math.atan2(dY, dX)*180/3.14159265;*/
		var fireRate = 1000;
		var nextFire = 0;
		bullets = this.game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(50, 'bullet');
	///	bullets.setAll('checkWorldBounds', true);
	//	bullets.setAll('outOfBoundsKill', true);

		if (this.time.now > nextFire && bullets.countDead() > 0){
			nextFire = this.time.now + fireRate;

			bullet = bullets.getFirstDead();

			bullet.reset(this.x - 8, this.y - 8);

			this.game.physics.arcade.moveToPointer(bullet, 300);
			console.log(bullet);
		}
	};

	MyGame.Player.prototype.attack = function()	{
	};

	MyGame.Player.prototype.spriteCollisionCallback = function(p , s ) {
		// we were hit by an enemy!
		if( s instanceof MyGame.Enemy )
			this.hit();
	};

	MyGame.Player.prototype.bulletCollisionCallback = function(p, s) {
		if(s instanceof MyGame.Enemy)
			bullet.kill();
	};

	MyGame.Player.prototype.canJump = function() {
		return this.time.elapsedSince( this.recovery_timer ) > this.recovery_timeout;
	};
	MyGame.Player.prototype.canAttack = function() {
		return this.time.elapsedSince(this.attack_timer) > this.attack_timeout;
	};


	MyGame.Player.prototype.hit = function() {
		// can't be hit while already stunned
		if( this.fsm.getState() != 'stunned' ) {
			this.fsm.consumeEvent( 'hit' );
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

	// start walking right
	MyGame.Player.prototype.walkRight = function() {
		this.body.velocity.x = this.walk_velocity;
		this.scale.x = 1;
		this.animations.play( 'right' );
	};

	// start walking left
	MyGame.Player.prototype.walkLeft = function() {
		this.body.velocity.x = -this.walk_velocity;
		// flip on x axis
		this.scale.x = -1;
		this.animations.play( 'left' );
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
		this.body.velocity.x = this.walk_velocity;
	};

	// move left
	MyGame.Player.prototype.goLeft = function()	{
		// flip on x axis
		this.scale.x = -1;
		this.facing = Phaser.LEFT;
		this.body.velocity.x = -this.walk_velocity;
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
		console.log(bullets);
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

		for( var i = 0; i < game_state.layers.length; i++ ) {
			var lyr = game_state.layers[i];
			if( lyr.solid )
				this.game.physics.arcade.collide( bullets, lyr );
		}

		for( var i = 0; i < game_state.groups.length; i++ ) {
			this.game.physics.arcade.overlap( bullets, game_state.groups[i], this.bulletCollisionCallback, null, this);
		}

		// handle input
		var left = this.game.input.keyboard.isDown( MyGame.KEY_L ) ||
			game_state.controls.buttonPressed[0]();
		var right = this.game.input.keyboard.isDown( MyGame.KEY_R ) ||
			game_state.controls.buttonPressed[1]();
		var jump = this.game.input.keyboard.isDown( MyGame.KEY_JUMP ) ||
			game_state.controls.buttonPressed[4]();
		var attack = this.game.input.activePointer.isDown ;


		var state = this.fsm.getState();


		switch( state )
		{
			case 'idle':
				// reset horizontal velocity
				this.body.velocity.x = 0;

				// can walk or jump
				if( jump && this.canJump() )
					this.fsm.consumeEvent( 'jump' );
				else if( left ) {
					this.facing = Phaser.LEFT;
					this.fsm.consumeEvent( 'left' );
				} else if( right ) {
					this.facing = Phaser.RIGHT;
					this.fsm.consumeEvent( 'right' );
				}

			  if (attack) {
					this.fsm.consumeEvent('attack');
				}
				break;
			case 'stunned':
				// can't do anything except wait to recover
				if( this.time.elapsedSince( this.stunned_timer ) > this.stunned_timeout )
					this.fsm.consumeEvent( 'recover' );

				break;
			case 'attacking':
				if( this.time.elapsedSince( this.attack_timer ) > this.attack_timeout ){
					this.fsm.consumeEvent( 'finish' );
				}

				break;
		case 'walking':
			// reset horizontal velocity
			console.log(this.time.elapsedSince( this.attack_timer ));
			this.body.velocity.x = 0;

			// can jump, fall, keep walking or stop
			if( jump && this.canJump() )
				this.fsm.consumeEvent( 'jump' );
			// not touching ground ?
			//else if( !this.body.touching.down && !this.body.blocked.down )
			//	this.fsm.consumeEvent( 'fall' );
			if (this.game.input.activePointer.isDown && this.canJump()) {
				this.fsm.consumeEvent('attack');
				console.log("i'm a bird chirp");
			}
			else if( left )
				this.goLeft();
			else if( right )
				this.goRight();
			else{
				// stop
				this.fsm.consumeEvent( 'stop' );
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
			if( left )
				this.airborneLeft();
			else if( right )
				this.airborneRight();

			/*if (this.game.input.activePointer.isDown && this.canAttack() && this.time.elapsedSince( this.attack_timer ) > 3000) {
					this.fsm.consumeEvent('attack');
			}*/
			break;

		default:
			break;
		}
	};
})();
