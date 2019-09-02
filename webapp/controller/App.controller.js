sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.comprouting.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getView()
				.getModel()
				.metadataLoaded()
				.then(this._bindUserData.bind(this))
		},
		_bindUserData: function() {
			Log.info(this.getView().getControllerName(), "_bindUserData")
			var sObjectPath = this.getView()
				.getModel()
				.createKey("Users", { Id: "SY-UNAME" })

			this.getView().bindElement({
				path: "/" + sObjectPath,
				// parameters: {
				// 	expand: "Dealers"
				// },
				events: {
					change: function() {
						Log.info(this.getView().getControllerName(), "_bindUserData change")
					}.bind(this),
					dataRequested: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindUserData dataRequested"
						)
					}.bind(this),
					dataReceived: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindUserData dataReceived"
						)
					}.bind(this)
				}
			})
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
