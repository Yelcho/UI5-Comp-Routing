sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/base/Log"],
	function(Controller, History, Log) {
		"use strict"
		return Controller.extend("yelcho.reuse.userSettings.controller.Detail", {
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")

				this.getOwnerComponent()
					.getModel()
					.metadataLoaded()
					.then(this._setupRouter.bind(this))
			},
			_setupRouter: function() {
				Log.info(this.getView().getControllerName(), "_setupRouter")
				this.getOwnerComponent()
					.getRouter()
					.getRoute("detail")
					.attachPatternMatched(this._onPatternMatched, this)
			},
			_onPatternMatched: function(oEvent) {
				Log.info(this.getView().getControllerName(), "_onPatternMatched")
				const args = oEvent.getParameter("arguments")

				var sObjectPath = this.getOwnerComponent()
					.getModel()
					.createKey("UserSettings", { UserId: "SY-UNAME", Name: args.name })

				this.getView().bindElement({
					path: "/" + sObjectPath,
					events: {
						change: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched change"
							)
						}.bind(this),
						dataRequested: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched dataRequested"
							)
						}.bind(this),
						dataReceived: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched dataReceived"
							)
						}.bind(this)
					}
				})
			},
			onNavButtonPress: function(oEvent) {
				var oHistory = History.getInstance()
				var sPreviousHash = oHistory.getPreviousHash()
				if (sPreviousHash !== undefined) window.history.go(-1)
				else
					this.getOwnerComponent()
						.getRouter()
						.navTo("default", true)
			}
		})
	}
)
