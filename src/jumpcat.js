// Jumpcat sprite for Nadion template game
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
	// Jumpcat
	///////////////////////////////////////////////////////////////////
	var Jumpcat_states = [
		{
			'name' : 'idle',
			'initial' : true,
			'events' :
			{
				'jump' : 'jumping'
			}
		},
		{
			'name' : 'jumping',
			'events' :
			{
				'stop' : 'idle'
			}
		}
	];
	MyGame.Jumpcat = function( game, name, x, y, width, height, props )
	{
		Nadion.BaseSprite.call( this, game, 'bad-cat', name, x, y, width, height, props );
		//game.physics.enable(this, Phaser.Physics.ARCADE);
		// fields
		this.fsm = new Nadion.StateMachine( Jumpcat_states, this );
		this.jump_velocity = +(props['jump-velocity'] || 600);
//		this.jump_velocity = 200;
		this.time = this.game.time;
		this.idle_time = this.time.now;
		this.idle_period = +(props['idle-period'] || 3000);

		// sprite fields
		this.body.bounce.y = 0.0;
		this.body.collideWorldBounds = true;
//		this.body.gravity.y = 20;
		this.body.gravity.y = 1000;
		this.body.maxVelocity.y = 1000;

	};
	MyGame.Jumpcat.prototype = Object.create( Nadion.BaseSprite );
	Nadion.__extends( MyGame.Jumpcat, Nadion.BaseSprite );
	MyGame.Jumpcat.prototype.constructor = MyGame.Jumpcat;

	// prototype (methods)
	MyGame.Jumpcat.prototype.reset = function()
	{
		this.idle_time = this.time.time;
		this.x = this.initial_x;
		this.y = this.initial_y;
		this.body.velocity.x = 0;
		this.body.velocity.y = 0;
		this.fsm.reset();
	};

	// state machine event handlers:
	MyGame.Jumpcat.prototype.idle = function()
	{
		this.frame = 0;
		// reset idle timer
		this.idle_time = this.time.time;
	};
	MyGame.Jumpcat.prototype.jumping = function()
	{
		this.frame = 1;
		this.body.velocity.y = -this.jump_velocity;
		this.body.blocked.down = false;
		this.body.touching.down = false;
	};


	MyGame.Jumpcat.prototype.updateObject = function()
	{
		// collide with the tilemap layer
		var game_state = this.game.state.states[this.game.state.current];
		this.game.physics.arcade.collide( this, game_state.main_layer );

		// reset horizontal velocity
		this.body.velocity.x = 0;
		//console.log(game_state.groups[1].children[0].x);
		//this.game.physics.arcade.moveToXY(this, game_state.groups[1].children[0].x, game_state.groups[1].children[0].y , 60);

		var state = this.fsm.getState();
		switch( state )
		{
		case 'jumping':
			// can keep jumping or stop
			// if we landed (on something), stop
//			if( this.body.touching.down || this.body.blocked.down )
			if( this.body.touching.down || this.body.blocked.down )
				this.fsm.consumeEvent( 'stop' );
			break;
		case 'idle':
			// can jump or remain idle
			if( this.time.elapsedSince( this.idle_time ) > this.idle_period ){
				this.fsm.consumeEvent( 'jump' );
			}
			break;
		default:
			break;
		}
	};

})();
