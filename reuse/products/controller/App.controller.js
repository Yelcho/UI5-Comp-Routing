sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.products.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")
		}
	})
})
