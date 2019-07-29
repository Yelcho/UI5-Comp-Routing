sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.comp1.controller.Detail", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.getRoute("detail")
				.attachPatternMatched(this._onPatternMatched)

			this.getOwnerComponent()
				.getRouter()
				.attachBypassed(this._onBypassed)
		},
		_onPatternMatched: function(oEvent) {
			Log.info("yelcho.reuse.comp1.controller.Detail", "_onPatternMatched")
		},
		_onBypassed: function(oEvent) {
			Log.info(
				"yelcho.reuse.comp1.controller.Detail",
				`_onBypassed Hash="${oEvent.getParameter("hash")}"`
			)
		},
		toHome: function() {
			Log.info(this.getView().getControllerName(), `toHome`)

			this.getOwnerComponent()
				.getMainRouter()
				.navTo("home")
		},
		toView1: function() {
			Log.info(this.getView().getControllerName(), `toView1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("view1")
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
		},
		onNotImplemented: function(oEvent) {
			Log.info(this.getView().getControllerName(), "onNotImplemented")
		}
	})
})
