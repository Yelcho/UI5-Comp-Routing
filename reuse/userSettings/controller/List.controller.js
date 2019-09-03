sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.userSettings.controller.List", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")
		},
		onPressSetting: function(oEvent) {
			const oSetting = oEvent
				.getSource()
				.getBindingContext()
				.getObject()
			this.getOwnerComponent()
				.getRouter()
				.navTo("detail", {
					name: oSetting.Name
				})
		}
	})
})
