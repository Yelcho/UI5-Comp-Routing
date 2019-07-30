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
			Log.info(
				this.getView().getControllerName(),
				`onItemSelect Key=${oEvent.getParameter("item").getKey()}`
			)
			this.getOwnerComponent()
				.getRouter()
				.navTo(oEvent.getParameter("item").getKey())
		}
	})
})
