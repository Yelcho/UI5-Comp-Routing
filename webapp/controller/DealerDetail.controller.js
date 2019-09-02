sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend(
		"yelcho.mydemo.comprouting.controller.DealerDetail",
		{
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")

				this.getOwnerComponent()
					.getRouter()
					.getRoute("dealerDetail")
					.attachPatternMatched(this._onPatternMatched, this)
			},
			_onPatternMatched: function(oEvent) {
				Log.info(this.getView().getControllerName(), "_onPatternMatched")
				const args = oEvent.getParameter("arguments")

				var sObjectPath = this.getView()
					.getModel()
					.createKey("Dealers", { Id: args.dealerId })

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
				this.getOwnerComponent()
					.getRouter()
					.navTo("dealers")
			}
		}
	)
})
