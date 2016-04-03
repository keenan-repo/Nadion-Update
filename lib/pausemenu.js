/**
 Copyright (c) 2016 Keenan Royce (keenan.royce@gmail.com)
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */


var PauseMenu = function(game) {
    this.game = game;
    this.game.load.spritesheet('button', 'assets/img/button_grey.png');
    this.drawPauseButton();
};
PauseMenu.prototype.constructor = PauseMenu;

PauseMenu.prototype.drawPauseButton = function(){
  var btn = this.game.add.button(this.game.width/2+15, this.game.height-75, 'button', actionOnClick, this);
};

PauseMenu.prototype.drawPauseButton = function(){
  /*this.text_test = this.game.add.text(100, 100, 'this is a test');
  this.text_test.inputEnabled = true;
  this.text_test.events.onInputDown.add(this.actionOnClick, this);
  console.log(this);*/
};

PauseMenu.prototype.actionOnClick = function(){
    //  this.logo.visible = false;
    //  this.menu.visible = false;
    //  this.controls_text.visible = false;
      //this.back_button = this.game.add.button(20, 300, 'button', create, this, 1, 0);
      this.back_text = this.game.add.text(50, 305, 'back', { fontSize: "16px", fill: "#FFFFFF", align: "center" });
      this.back_text.align.center;
      this.back_text.setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);

      this.buttons_array = {};
      this.keys = ['KEY_L_LEFT', 'KEY_L_UP', 'KEY_L_RIGHT', 'KEY_L_DOWN', 'KEY_R_LEFT', 'KEY_R_UP', 'KEY_R_RIGHT', 'KEY_R_DOWN', 'KEY_SHOOT'];
      this.key_names = {};
      this.key_descriptions = ["Left","Up","Right","Down","Dash Left", "Jump","Dash Right","Duck", "Shoot"];
      this.key_text = {};
      for (var i = 0; i < 4; i++){
        this.buttons_array[i] = this.game.add.button(20, i*40+5, 'button');
        this.buttons_array[i]._onOutFrame = 0;
        this.buttons_array[i]._onOverFrame = 1;
        this.buttons_array[i].name = this.keys[i];
        this.buttons_array[i].inputEnabled = true;
        this.buttons_array[i].events.onInputDown.add(this.setKey, this);
        this.key_names[i] = this.game.add.text(60, i*40+15, String.fromCharCode(MyGame[this.keys[i]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.key_names[i].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
        this.key_text[i] = this.game.add.text(130, 15+40*i, this.key_descriptions[i], { font: "16px Arial", fill: "#ffffff", align: "center" });

        this.buttons_array[i+4] = this.game.add.button(220, i*40+5, 'button');
        this.buttons_array[i+4]._onOutFrame = 0;
        this.buttons_array[i+4]._onOverFrame = 1;
        this.buttons_array[i+4].name = this.keys[i+4];
        this.buttons_array[i+4].inputEnabled = true;
        this.buttons_array[i+4].events.onInputDown.add(this.setKey, this);
        this.key_names[i+4] = this.game.add.text(260, i*40+15, String.fromCharCode(MyGame[this.keys[i+4]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
        this.key_names[i+4].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
        this.key_text[i+4] = this.game.add.text(330, 15+40*i, this.key_descriptions[i+4], { font: "16px Arial", fill: "#ffffff", align: "center" });
      }
      console.log(i);
      this.buttons_array[i+4] = this.game.add.button(20, i*40+5, 'button');
      this.buttons_array[i+4]._onOutFrame = 0;
      this.buttons_array[i+4]._onOverFrame = 1;
      this.buttons_array[i+4].name = this.keys[i+4];
      this.buttons_array[i+4].inputEnabled = true;
      this.buttons_array[i+4].events.onInputDown.add(this.setKey, this);
      this.key_names[i+4] = this.game.add.text(60, i*40+15, String.fromCharCode(MyGame[this.keys[i+4]]), { font: "16px Arial", fill: "#ffffff", align: "center" });
      this.key_names[i+4].setShadow(-1, 1, 'rgba(0,0,0,0.7)', 0);
      this.key_text[i+4] = this.game.add.text(130, 15+40*i, this.key_descriptions[i+4], { font: "16px Arial", fill: "#ffffff", align: "center" });
      console.log(this.buttons_array);
    };


    PauseMenu.prototype.setKey = function(item){
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

    PauseMenu.prototype.updateControls = function(object) {
        if (object.game.input.keyboard.event){
          object.set_control = false;
          MyGame[object.keyToUpdate] = object.game.input.keyboard.event.keyCode;
          object.key_names[object.keys.indexOf(object.keyToUpdate)].text = String.fromCharCode(MyGame[object.keyToUpdate]);
        }
    };
