sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.comprouting.controller.Home", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.getRoute("home")
				.attachPatternMatched(this._onPatternMatched)

			this.getOwnerComponent()
				.getRouter()
				.attachBypassed(this._onBypassed)
		},
		_onPatternMatched: function() {
			Log.info("yelcho.mydemo.comprouting.controller.Home", "_onPatternMatched")
		},
		_onBypassed: function(oEvent) {
			Log.info(
				"yelcho.mydemo.comprouting.controller.Home",
				`_onBypassed Hash="${oEvent.getParameter("hash")}"`
			)
		},
		onLoadComponent1: function() {
			Log.info(this.getView().getControllerName(), "onLoadComponent1")
			this.getOwnerComponent()
				.getRouter()
				.navTo("component1")
		},
		toReuseComp1: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("comp1")
		},
		toReuseComp2: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("comp2")
		}
	})
})
