//=============================================================================
// Isekai - Screen Status
// Isekai_ScreenStatus.js
//=============================================================================

var Imported = Imported || {};
Imported.Isekai_ScreenStatus = true;

var Isekai = Isekai || {};
Isekai.ScrStatus = Isekai.ScrStatus || {};
Isekai.ScrStatus.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Custom made for Isekai VN use
 * @author Another World
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Puts status panels on the map in the upper left and right corners of the
 * screen. Custom made for Isekai VN use.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Each plugin command begins with either of the following:
 *
 *   ScrStatus Left: action
 *   ScrStatus Right: action
 *   ScrStatus Both: action
 *
 * Replace 'action' with any of the following:
 *
 *   Refresh
 *   - Refreshes the window(s)
 *
 *   Open
 *   - Opens the window(s)
 *
 *   Close
 *   - Closes the window(s)
 *
 *   Show
 *   - Shows the window(s)
 *
 *   Hide
 *   - Hides the window(s)
 *
 *   Set Actor x
 *   - Changes the actor in the window(s) to 'x'. Replace 'x' with actor ID.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param General Parameter
 * @parent ---General---
 * @desc Description
 * @default 0
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Isekai.Parameters = PluginManager.parameters('Isekai_ScreenStatus');
Isekai.Param = Isekai.Param || {};

//Isekai.Param.Variables = String(Isekai.Parameters['Variables']);

//=============================================================================
// Window_ScreenStatus
//=============================================================================

function Window_ScreenStatus() {
  this.initialize.apply(this, arguments);
}

Window_ScreenStatus.prototype = Object.create(Window_Base.prototype);
Window_ScreenStatus.prototype.constructor = Window_ScreenStatus;

Window_ScreenStatus.prototype.initialize = function(left) {
  var scale = 1;
  var width = Graphics.boxWidth / 2;
  var height = this.fittingHeight(4);
  if (left) {
    var x = 0;
  } else {
    var x = Graphics.boxWidth - width * scale;
  }
  var y = 0;
  this._left = left;
  this._showExp = left;
  this._scale = scale;
  Window_Base.prototype.initialize.call(this, x, y, width, height);
  //this.opacity = 128;
  this.openness = 0;
  this.refresh();
  this.scale.x = scale;
  this.scale.y = scale;
};

Window_ScreenStatus.prototype.createContents = function() {
  this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());
  this.contents._smooth = true;
  this.resetFontSettings();
};

Window_ScreenStatus.prototype.setActor = function(actorId) {
  this._actorId = actorId;
  this.refresh();
};

Window_ScreenStatus.prototype.actor = function() {
  if (!this._actorId) return $gameActors.actor(1);
  return $gameActors.actor(this._actorId);
};

Window_ScreenStatus.prototype.showExp = function(value) {
  this._showExp = value;
  this.refresh();
};

Window_ScreenStatus.prototype.refresh = function() {
  this.contents.clear();
  if (!this.actor()) return;
  // var bitmap = ImageManager.loadFace(this.actor().faceName());
  // if (bitmap.width <= 0) return setTimeout(this.refresh.bind(this), 5);
  // this.drawFaceArea();
  this.drawDataArea();
};

// Window_ScreenStatus.prototype.drawFaceArea = function() {
//   var width = Window_Base._faceWidth;
//   var height = Window_Base._faceHeight;
//   var lh = this.lineHeight();
//   this.drawActorFace(this.actor(), 0, 0, width, height);
//   this.drawActorIcons(this.actor(), 8, lh * 3, width);
// };

Window_ScreenStatus.prototype.drawDataArea = function() {
  var x = Window_Base._faceWidth + Window_Base._iconWidth + 4;
  var y = Window_Base._faceWidth + Window_Base._iconHeight + 4;
  var width = this.contents.width - x;
  var lh = this.lineHeight();
  this.drawActorName(this.actor(), x, lh * 0, width);
  this.drawText("Karma: " + $gameVariables.value(7), 0, 0);
  // this.drawActorLevel(this.actor(), x, lh * 0, width);
  this.drawActorHp(this.actor(), x, lh * 1, width);
  // this.drawActorMp(this.actor(), x, lh * 2, width);
  // this.drawActorTp(this.actor(), x, lh * 3, width);
};

Window_Base.prototype.drawActorName = function(actor, x, y, width) {
  width = width || 168;
  this.changeTextColor(this.normalColor());
  this.drawText(actor.name(), x, y, width);
};

// Window_ScreenStatus.prototype.drawActorLevel = function(actor, x, y, width) {
//   this.drawText(actor.level, x, y, width, 'right');
//   width -= this.textWidth(actor.level);
//   this.changeTextColor(this.systemColor());
//   this.drawText(TextManager.levelA, x, y, width, 'right');
//   this.resetTextColor();
// };

Window_ScreenStatus.prototype.drawActorHp = function(actor, x, y, width) {
  width = width || 186;
  var color1 = this.hpGaugeColor1();
  var color2 = this.hpGaugeColor2();
  this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
  this.changeTextColor(this.systemColor());
  this.drawText(TextManager.hpA, x, y, 44);
  var text = Math.floor(actor.hpRate() * 100) + '%';
  this.resetTextColor();
  this.drawText(text, x, y, width, 'center');
};

// Window_ScreenStatus.prototype.drawActorMp = function(actor, x, y, width) {
//   width = width || 186;
//   var color1 = this.mpGaugeColor1();
//   var color2 = this.mpGaugeColor2();
//   this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
//   this.changeTextColor(this.systemColor());
//   this.drawText(TextManager.mpA, x, y, 44);
//   var text = Math.floor(actor.mpRate() * 100) + '%';
//   this.resetTextColor();
//   this.drawText(text, x, y, width, 'center');
// };

// Window_ScreenStatus.prototype.drawActorTp = function(actor, x, y, width) {
//   width = width || 96;
//   if (this._showExp) {
//     var rate = actor.tpRate();
//     var text = Math.floor(actor.tp) + '%';
//   } else {
//     var rate = 1;
//     var text = '???';
//   }
//   if (actor.tpRate() >= 1 && this._showExp) {
//     var color1 = this.textColor(14);
//     var color2 = this.textColor(6);
//   } else {
//     var color1 = this.tpGaugeColor1();
//     var color2 = this.tpGaugeColor2();
//   }
//   this.drawGauge(x, y, width, rate, color1, color2);
//   this.changeTextColor(this.systemColor());
//   this.drawText(TextManager.tpA, x, y, 44);
//   this.resetTextColor();
//   this.drawText(text, x, y, width, 'center');
// };

//=============================================================================
// Scene_Map
//=============================================================================

Isekai.ScrStatus.Scene_Map_createAllWindows = 
  Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  this.createScreenStatusWindows();
  Isekai.ScrStatus.Scene_Map_createAllWindows.call(this);
};

Scene_Map.prototype.createScreenStatusWindows = function() {
  this._statusWindow1 = new Window_ScreenStatus(true);
  this.addWindow(this._statusWindow1);
  this._statusWindow2 = new Window_ScreenStatus(false);
  this.addWindow(this._statusWindow2);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Isekai.ScrStatus.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Isekai.ScrStatus.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command !== 'ScrStatus') return;
  var str = this.argsToString(args);
  // Get window
  var win1 = SceneManager._scene._statusWindow1;
  var win2 = SceneManager._scene._statusWindow2;
  if (str.match(/LEFT:[ ](.*)/i)) {
    var win2 = undefined;
    var cmd = String(RegExp.$1);
  } else if (str.match(/RIGHT:[ ](.*)/i)) {
    var win1 = undefined;
    var cmd = String(RegExp.$1);
  } else if (str.match(/BOTH:[ ](.*)/i)) {
    var cmd = String(RegExp.$1);
  } else {
    return;
  }
  // Action
  if (cmd.match(/SET ACTOR[ ](\d+)/i)) {
    var actorId = parseInt(RegExp.$1);
    if (win1) win1.setActor(actorId);
    if (win2) win2.setActor(actorId);
  }
  if (cmd.match(/(?:REFRESH|UPDATE)/i)) {
    if (win1) win1.refresh();
    if (win2) win2.refresh();
  }
  if (cmd.match(/(?:SHOW|APPEAR)/i)) {
    if (win1) win1.show();
    if (win2) win2.show();
  } else if (cmd.match(/(?:HIDE|VANISH)/i)) {
    if (win1) win1.hide();
    if (win2) win2.hide();
  }
  if (cmd.match(/OPEN/i)) {
    if (win1) win1.open();
    if (win2) win2.open();
  } else if (cmd.match(/CLOSE/i)) {
    if (win1) win1.close();
    if (win2) win2.close();
  }
};

Game_Interpreter.prototype.argsToString = function(args) {
  var str = '';
  var length = args.length;
  for (var i = 0; i < length; ++i) {
    str += args[i] + ' ';
  }
  return str.trim();
};

//=============================================================================
// End of File
//=============================================================================