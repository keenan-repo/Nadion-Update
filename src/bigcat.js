// Bigcat sprite for Nadion template game
// (entities extend 'Phaser.Sprite')
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
	// Bigcat
	///////////////////////////////////////////////////////////////////
	var Bigcat_states = [
		{
			'name' : 'walkright',
			'initial' : true,
			'events' :
			{
				'turn' : 'walkleft',
				'shoot' : 'shooting',
				'hit' : 'stunned'
			}
		},
		{
			'name' : 'walkleft',
			'events' :
			{
				'turn' : 'walkright',
				'shoot' : 'shooting',
				'hit' : 'stunned'
			}
		},
		{
			'name' : 'stunned',
			'events' :
			{
				'recover' : 'recovering',
				'dashLeft' : 'dashing',
				'dashRight' : 'dashing'
			}
		},
		{
			'name' : 'recovering',
			'events' :
			{
				'recoverright' : 'walkright',
				'recoverleft' : 'walkleft'
			}
		},
		{
			'name' : 'shooting',
			'events' :
			{
				'turnleft' : 'walkleft',
				'turnright' : 'walkright',
				'hit' : 'stunned'
			}
		},
		{
			'name' : 'dashing',
			'events' :
			{
				'recover' : 'walkleft'
			}
		}
	];
	MyGame.Bigcat = function( game, name, x, y, width, height, props )
	{
		Nadion.BaseSprite.call( this, game, 'big-cat', name, x, y, width, height, props );
		// fields
		this.fsm = new Nadion.StateMachine( Bigcat_states, this );
		this.time = this.game.time;
		this.walk_time = this.time.now;
		this.idle_period = +(props['idle-period'] || 3000);
		this.turn_time = 2000;
		this.health = 100;
		this.stunned_timer = 0;
		this.stunned_timeout = 500;
		this.recovery_timer = 0;
		this.recovery_timeout = 150;
		this.attack_angle = 0;
		this.dash_time = 0
		this.dash_timeout = 100000;

		this.turn_time = 2000;
		this.shoot_interval = 800;

		this.fireRate = 100;
		this.nextFire = 0;

		this.bullets = this.game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(6, 'bullet');
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.setAll('outOfBoundsKill', true);

		// sprite fields
		this.body.bounce.y = 0.0;
		this.body.collideWorldBounds = true;
		//		this.body.gravity.y = 20;
		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;
		this.animations.add( 'walk-right', [2, 3], 5, true );
		this.animations.add( 'walk-left', [0, 1], 5, true );
		this.animations.add('shoot-left', [0], 3, true);
		this.animations.add('shoot-right', [3], 3, true);



	};
	MyGame.Bigcat.prototype = Object.create( Nadion.BaseSprite );
	Nadion.__extends( MyGame.Bigcat, Nadion.BaseSprite );
	MyGame.Bigcat.prototype.constructor = MyGame.Bigcat;

	// prototype (methods)
	MyGame.Bigcat.prototype.reset = function()
	{
		this.walk_time = this.time.time;
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.fsm.reset();
	};

	// state machine event handlers:
	MyGame.Bigcat.prototype.walkright = function()
	{
		this.animations.play( 'walk-right' );
		this.walk_time = this.time.time;
	};
	MyGame.Bigcat.prototype.walkleft = function()
	{
		this.animations.play( 'walk-left' );
		this.walk_time = this.time.time;
	};

	MyGame.Bigcat.prototype.hit = function(player_x, player_y)
	{
		if( this.fsm.getState() != 'stunned' ) {
			this.fsm.consumeEvent( 'hit' );
			this.tint = 0xff0000;
			console.log(this.fsm.getState());
			if (this.x > player_x) {
				//console.log('going left');
				this.fsm.consumeEvent('dashLeft');

			} else if (this.x < player_x) {
					this.fsm.consumeEvent('dashRight');
			}

			this.health = this.health - 20;
			if (this.health <= 0) {
				this.kill();
			}
		}
	};

	MyGame.Bigcat.prototype.shoot = function() {
		this.attack_timer = this.time.time;
		this.attack_angle = this.attack_angle - 5;

		if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
		{
			this.nextFire = this.game.time.now + this.fireRate;
			var bullet = this.bullets.getFirstDead();
			bullet.anchor.set(0.5);
			bullet.reset(this.x + 4 , this.y + 4);

				if (this.facing == Phaser.LEFT) {
					this.animations.play( 'shoot-left' );
					bullet.body.velocity.x = -400;
					bullet.body.velocity.y = this.attack_angle;

				} else {
					this.animations.play( 'shoot-right' );
					bullet.body.velocity.x = 400;
					bullet.body.velocity.y = 0;
					bullet.body.velocity.y = this.attack_angle;
				}

			}
	};

	MyGame.Bigcat.prototype.stunned = function() {
		// start timer
		this.stunned_timer = this.time.time;
		this.tint = 0xffffff;
	};

	MyGame.Bigcat.prototype.recovering = function() {
		this.recovery_timer = this.time.time;
					this.tint = 0xffffff;
					if( this.facing == Phaser.LEFT ){
						this.fsm.consumeEvent( 'recoverleft' );
					} else {
						this.fsm.consumeEvent( 'recoverright' );
					}
	};

	MyGame.Bigcat.prototype.shooting = function() {
		this.attack_angle = 20;
		this.shoot_time = this.time.time;
		this.shoot();
	};

	MyGame.Bigcat.prototype.dashing = function(){

	};

	MyGame.Bigcat.prototype.dashRight = function() {
		console.log('dashRight');
		this.dash_time = this.time.time;
		this.body.velocity.x = 500;
	};

	MyGame.Bigcat.prototype.dashLeft = function() {
		console.log('dashLeft');
		this.dash_time = this.time.time;
		this.body.velocity.x = -500;
	};

	MyGame.Bigcat.prototype.spriteCollisionCallback = function(p , s ) {
		// we were hit by an Jumpcat!

	};

	MyGame.Bigcat.prototype.bulletCollisionCallback = function(p, s) {
		if (s instanceof MyGame.Player){
			s.hit(25);
			p.kill();
		}
	};


	MyGame.Bigcat.prototype.updateObject = function()
	{
		// collide with the tilemap layer
		var game_state = this.game.state.states[this.game.state.current];
		this.game.physics.arcade.collide( this, game_state.main_layer );

		// reset horizontal velocity
		this.body.velocity.x = 0;

		// collide with sprites that are 'solid'
		for( i = 0; i < game_state.groups.length; i++ ) {
			this.game.physics.arcade.collide( this, game_state.groups[i], this.spriteCollisionCallback, null, this );
		}

		// collide player's bullets with sprites/enemies
		for( var i = 0; i < game_state.groups.length; i++ ){
		 this.game.physics.arcade.overlap(this.bullets, game_state.groups[i], this.bulletCollisionCallback, null, this);
		}



		this.bullets.forEachAlive(function(bullet){
			if (bullet.x < this.game.camera.x || bullet.x > this.game.camera.x + this.game.camera.width || bullet.y < this.game.camera.y || bullet.y > this.game.camera.y+this.game.camera.height ) {
				bullet.kill();
			}
		}, this);
		var state = this.fsm.getState();
	//	console.log(state);

		switch( state )
		{
		case 'walkright':
			this.facing == Phaser.RIGHT;
			this.body.velocity.x = 50;
			if( this.time.elapsedSince( this.walk_time ) > this.turn_time ){
				this.fsm.consumeEvent( 'shoot' );
			}
			break;
		case 'walkleft':
			// can jump or remain idle
			this.body.velocity.x = -50;
			this.facing == Phaser.LEFT;

			if( this.time.elapsedSince( this.walk_time ) > this.turn_time ){
				this.fsm.consumeEvent( 'shoot' );
			}
			break;
		case 'stunned':
			// can't do anything except wait to recover
			if( this.time.elapsedSince( this.stunned_timer ) > this.stunned_timeout )
				this.fsm.consumeEvent( 'recover' );
			break;

			case 'shooting':
				if (this.time.elapsedSince(this.shoot_time) > this.shoot_interval*3){
					if (this.facing == Phaser.LEFT) {
						this.facing = Phaser.RIGHT;
						this.fsm.consumeEvent('turnright');
					} else {
						this.facing = Phaser.LEFT;
						this.fsm.consumeEvent('turnleft');
					}
				} else if (this.time.elapsedSince(this.shoot_time) > this.shoot_interval) {
						this.shoot();
				}
			break;
		case 'dashing' :
		console.log(this.dash_time);

			if (this.time.elapsedSince(this.dash_time) > this.dash_timeout) {
				console.log('timeout');
				this.fsm.consumeEvent('recover');
			}
			break;
		default:
			break;
		}
	};

})();
