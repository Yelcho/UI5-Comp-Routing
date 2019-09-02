sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.comprouting.controller.Dealers", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")
		},
		onPressDealer: function(oEvent) {
			const oDealer = oEvent
				.getSource()
				.getBindingContext()
				.getObject()
			this.getOwnerComponent()
				.getRouter()
				.navTo("dealerDetail", {
					dealerId: oDealer.Id
				})
		}
	})
})
