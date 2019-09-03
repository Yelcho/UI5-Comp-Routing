sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History", "sap/base/Log"],
	function(Controller, History, Log) {
		"use strict"
		return Controller.extend("yelcho.reuse.categories.controller.Detail", {
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")

				this.getOwnerComponent()
					.getRouter()
					.getRoute("detail")
					.attachPatternMatched(this._onPatternMatched, this)
			},
			_onPatternMatched: function(oEvent) {
				Log.info(this.getView().getControllerName(), "_onPatternMatched")
				const args = oEvent.getParameter("arguments")

				this.getOwnerComponent()
					.getModel()
					.metadataLoaded()
					.then(this._bindData.bind(this, args.id))
			},
			_bindData: function(id) {
				Log.info(this.getView().getControllerName(), "_bindData")

				var sObjectPath = this.getOwnerComponent()
					.getModel()
					.createKey("Categories", { CategoryID: id })

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
							if (this.getView().getBindingContext() === null)
								this.getOwnerComponent()
									.getRouter()
									.navTo("notfound", false)
						}.bind(this)
					}
				})
			},
			northwindImageFormatter: function(picture) {
				return picture ? "data:image/bmp;base64," + picture.substr(104) : null
			},
			onNavButtonPress: function(oEvent) {
				var oHistory = History.getInstance()
				var sPreviousHash = oHistory.getPreviousHash()
				if (sPreviousHash !== undefined) window.history.go(-1)
				else
					this.getOwnerComponent()
						.getRouter()
						.navTo("list", true)
			}
		})
	}
)