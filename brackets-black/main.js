/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    "use strict";
	
	var AppInit = brackets.getModule("utils/AppInit"),
		DocumentManager   = brackets.getModule("document/DocumentManager"),
        ExtensionUtils    = brackets.getModule("utils/ExtensionUtils"),
		KeyBindingManager = brackets.getModule('command/KeyBindingManager');
	
	var name = "dark";
	var currentSyntax = "unknown";
	
	var syntaxClass = function () {
		
		$("#editor-holder .CodeMirror")
			.removeClass("cm-s-default")
			.addClass("cm-s-" + name);
		/*
		var $e = $("#editor-holder .CodeMirror:visible"),
			newSyntax = DocumentManager.getCurrentDocument().language._id,
			oldSyntax = $e.attr("data-syntax");
		
		if (oldSyntax !== newSyntax) {
			$e.removeClass(oldSyntax).addClass(newSyntax).attr("data-syntax", newSyntax);
		}
		*/
	};
	
	var setupThemeCSS = function () {
		ExtensionUtils.loadStyleSheet(module, name + ".css");
	};
	
	var unbindKeys = function () { // Problems with ó/Ó (Shift+)Alt+O Polish keyboard
		KeyBindingManager.removeBinding("Alt-O");
		KeyBindingManager.removeBinding("Ctrl-Alt-O"); // don't know why
		KeyBindingManager.removeBinding("Shift-Alt-O");
		
		// ś
		KeyBindingManager.removeBinding("Alt-S");
		KeyBindingManager.removeBinding("Shift-Alt-S");
		KeyBindingManager.removeBinding("Ctrl-Alt-S");
	};
	
    AppInit.appReady(function () {
		console.clear();
		setupThemeCSS();
		unbindKeys();
		syntaxClass();
		var events = ['currentDocumentChange',
					 'fileNameChange'
					 ];
		
		var key;
		for (key in events) {
			if (events[key] !== 0) {
				$(DocumentManager).on(events[key], syntaxClass);
			}
		}
    });
});
