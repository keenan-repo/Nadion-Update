(function ()
{
  "use strict";

  ///////////////////////////////////////////////////////////
  // Projectile attacks from the bird
  //////////////////////////////////////////////////////////

  var projectile_states = [
    {
      'name' : 'ready',
      'initial' : true,
      'events' :
      {
        'fire' : 'fired'
      }
    },
    {
      'name' : 'fired',
      'events' :
      {
        'collide' : 'hit'
      }
    }
  ];

  MyGame.Projectile = function(game, name, x, y, width, height, props){
    Nadion.BaseSprite.call(this, game, 'bullet', name, x, y, width, height, props);

    this.fsm = new Nadion.StateMachine(projectile_states, this);
    /*this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);*/
    console.log(this);
  };

  MyGame.Projectile.prototype = Object.create(Nadion.BaseSprite);
  Nadion.__extends(MyGame.Projectile, Nadion.BaseSprite);
  MyGame.Projectile.prototype.constructor = MyGame.Projectile;


  MyGame.Enemy.prototype.reset = function()
  {
    this.x = this.initial_x;
    this.y = this.initial_y;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    this.fsm.reset();
  };

  MyGame.Projectile.prototype.updateObject = function(){
    console.log('updating projectile');
    var game_state = this.game.state.states[this.game.state.current];

    var state = this.fsm.getState();
    switch (state) {
      case 'ready':

        break;
      case 'fired':

        break;
      default:
        break;

    }
  };

})();
