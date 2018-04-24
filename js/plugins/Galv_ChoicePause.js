//-----------------------------------------------------------------------------
//  Galv's Choice Pause
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_ChoicePause.js
//-----------------------------------------------------------------------------
//  2017-01-27 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_ChoicePause = true;

var Galv = Galv || {};              // Galv's main object
Galv.CPAUSE = Galv.CPAUSE || {};          // Galv's stuff


//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Prevent the player from accidentally selecting a choice by adding a pause
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Pause Time
 * @desc Amount of frames pause before the player can select a choice
 * @default 20
 *
 * @help
 *   Galv's Choice Pause
 * ----------------------------------------------------------------------------
 * This plugin adds a few frames of pause where the player cannot select a
 * choice after the choice window opens. This is to reduce the chance that the
 * player will accidentally select a choice with the window popping up too
 * quickly and them not noticing.
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {
	
Galv.CPAUSE.time = Number(PluginManager.parameters('Galv_ChoicePause')['Pause Time']);

Galv.CPAUSE.Window_ChoiceList_open = Window_ChoiceList.prototype.open;
Window_ChoiceList.prototype.open = function() {
	this._pauseTime = Graphics.frameCount + Galv.CPAUSE.time;
	Galv.CPAUSE.Window_ChoiceList_open.call(this);
};

Galv.CPAUSE.Window_ChoiceList_isOkTriggered = Window_ChoiceList.prototype.isOkTriggered;
Window_ChoiceList.prototype.isOkTriggered = function() {
	return Galv.CPAUSE.Window_ChoiceList_isOkTriggered.call(this) && Graphics.frameCount > this._pauseTime;
};

})();