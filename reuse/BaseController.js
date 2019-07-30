sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"

	return Controller.extend("yelcho.dp.BaseController", {
		onInit: function() {
			//Controller.prototype.onInit.apply(this, arguments)
			Log.info(this.getView().getControllerName(), "Initialising controller")
		},
		_onPatternMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")
		},
		toDefault: function() {
			Log.info(this.getView().getControllerName(), `toDefault`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("default")
		},
		toView1: function() {
			Log.info(this.getView().getControllerName(), `toView1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("view1")
		},
		toHome: function() {
			Log.info(this.getView().getControllerName(), `toHome`)
			this.getOwnerComponent()
				.getMainRouter()
				.navTo("default")
		},
		toReuseComp1: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getMainRouter()
				.navTo("comp1")
		},
		toReuseComp2: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getMainRouter()
				.navTo("comp2")
		}
	})
})
