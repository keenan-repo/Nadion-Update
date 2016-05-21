// Shootingcat sprite for Nadion template game
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
	// Shootingcat
	///////////////////////////////////////////////////////////////////
	var Shootingcat_states = [
		{
			'name' : 'walkright',
			'initial' : true,
			'events' :
			{
				'shoot' : 'shooting'
			}
		},
		{
			'name' : 'walkleft',
			'events' :
			{
				'shoot' : 'shooting'
			}
		},
		{
			'name' : 'shooting',
			'events' :
			{
				'turnleft' : 'walkleft',
				'turnright' : 'walkright'
			}
		}
	];
	MyGame.Shootingcat = function( game, name, x, y, width, height, props )
	{
		Nadion.BaseSprite.call( this, game, 'bad-cat', name, x, y, width, height, props );
		//game.physics.enable(this, Phaser.Physics.ARCADE);
		// fields
		this.fsm = new Nadion.StateMachine( Shootingcat_states, this );
//		this.jump_velocity = 200;
		this.time = this.game.time;
		this.walk_time = this.time.now;
		this.idle_period = +(props['idle-period'] || 3000);
		this.turn_time = 2000;
		this.shoot_interval = 800;

		this.fireRate = 800;
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
		this.animations.add( 'walk-right', [2, 3], 3, true );
		this.animations.add( 'walk-left', [0, 1], 3, true );


	};
	MyGame.Shootingcat.prototype = Object.create( Nadion.BaseSprite );
	Nadion.__extends( MyGame.Shootingcat, Nadion.BaseSprite );
	MyGame.Shootingcat.prototype.constructor = MyGame.Shootingcat;


	var bullet;

	// prototype (methods)
	MyGame.Shootingcat.prototype.reset = function()
	{
		this.walk_time = this.time.time;
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.fsm.reset();
	};

	// state machine event handlers:
	MyGame.Shootingcat.prototype.walkright = function()
	{
		this.facing = Phaser.RIGHT;
		this.animations.play( 'walk-right' );
		this.walk_time = this.time.time;
	};
	MyGame.Shootingcat.prototype.walkleft = function()
	{
		this.facing = Phaser.LEFT;
		this.animations.play( 'walk-left' );
		this.walk_time = this.time.time;
	};
	MyGame.Shootingcat.prototype.shooting = function() {
		this.shoot_time = this.time.time;
		this.shoot();
	}

	MyGame.Shootingcat.prototype.shoot = function() {
		this.attack_timer = this.time.time;

		if (this.bullets.countLiving() > 3) {
			//console.log('kill');
			this.bullets.getTop().kill();
		}

		if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
		{
			this.nextFire = this.game.time.now + this.fireRate;
			var bullet = this.bullets.getFirstDead();
			bullet.sendToBack();
			bullet.anchor.set(0.5);
			bullet.reset(this.x + 4 , this.y + 4);

				if (this.facing == Phaser.LEFT) {
					bullet.body.velocity.x = -400;
					bullet.body.velocity.y = 0;
				} else {
					bullet.angle = 180;
					bullet.body.velocity.x = 400;
					bullet.body.velocity.y = 0;
				}

			}
	};

	MyGame.Shootingcat.prototype.bulletCollisionCallback = function(p, s) {
		if(s instanceof MyGame.Jumpcat){
			p.kill();
			s.kill();
			this.player_score = this.player_score + 10
		} else if (s instanceof MyGame.Walkingcat){
			p.kill();
			s.kill();
			this.player_score = this.player_score + 10
		} else if (s instanceof MyGame.Player){
			s.hit(75);
			p.kill();
		}
	};


	MyGame.Shootingcat.prototype.updateObject = function()
	{
		// collide with the tilemap layer
		var game_state = this.game.state.states[this.game.state.current];
		this.game.physics.arcade.collide( this, game_state.main_layer );

		// reset horizontal velocity
		this.body.velocity.x = 0;
		//console.log(game_state.groups[1].children[0].x);
		//this.game.physics.arcade.moveToXY(this, game_state.groups[1].children[0].x, game_state.groups[1].children[0].y , 60);

		for( var i = 0; i < game_state.groups.length; i++ ){
		 this.game.physics.arcade.overlap(this.bullets, game_state.groups[i], this.bulletCollisionCallback, null, this);
		}

		//checks to kill any bullets off the screen
		this.bullets.forEachAlive(function(bullet){
			if (bullet.x < this.game.camera.x || bullet.x > this.game.camera.x + this.game.camera.width || bullet.y < this.game.camera.y || bullet.y > this.game.camera.y+this.game.camera.height ) {
				bullet.kill();
			}
		}, this);

		var state = this.fsm.getState();
		switch( state )
		{
		case 'walkright':
			this.nextFire = 0;
			this.facing == Phaser.RIGHT;
			this.body.velocity.x = 50;
			if( this.time.elapsedSince( this.walk_time ) > this.turn_time ){
				this.shoot();
				this.fsm.consumeEvent( 'shoot' );
			}
			break;
		case 'walkleft':
			this.nextFire = 0;
			this.body.velocity.x = -50;
			this.facing == Phaser.LEFT;
			if( this.time.elapsedSince( this.walk_time ) > this.turn_time ){
				this.shoot();
				this.fsm.consumeEvent( 'shoot' );
			}
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
		default:
			break;
		}
	};

})();
