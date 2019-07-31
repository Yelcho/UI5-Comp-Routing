sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.comprouting.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")
		},
		onSideNavButtonPress: function() {
			var toolPage = this.byId("toolPage")
			toolPage.setSideExpanded(!toolPage.getSideExpanded())
		},
		onUserNamePress: function() {
			Log.info(this.getView().getControllerName(), "onUserNamePress")
		},
		onItemSelect: function(oEvent) {
			const key = oEvent.getParameter("item").getKey()
			Log.info(this.getView().getControllerName(), `onItemSelect Key=${key}`)
			this.getOwnerComponent()
				.getRouter()
				.navTo(key)
		}
	})
})
