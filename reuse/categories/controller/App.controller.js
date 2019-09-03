sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.categories.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")
		}
	})
})
