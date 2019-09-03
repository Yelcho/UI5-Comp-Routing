sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.userSettings.controller.App", {
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
		}
	})
})
