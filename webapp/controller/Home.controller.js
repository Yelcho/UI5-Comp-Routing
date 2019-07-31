sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.mydemo.comprouting.controller.Home", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.getRoute("home")
				.attachPatternMatched(this._onPatternMatched, this)

			this.getOwnerComponent()
				.getRouter()
				.attachRouteMatched(this._onRouteMatched, this)

			this.getOwnerComponent()
				.getRouter()
				.attachBypassed(this._onBypassed)
		},
		_onRouteMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onRouteMatched")
		},
		_onPatternMatched: function() {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")
			var sObjectId = "100000010"
			this.getView()
				.getModel()
				.metadataLoaded()
				.then(
					function() {
						Log.info(this.getView().getControllerName(), "metadataLoaded")
						var sObjectPath = this.getView()
							.getModel()
							.createKey("Customers", {
								CustomerId: sObjectId
							})

						this.getView().bindElement({
							path: sObjectPath,
							// parameters: {
							// 	expand: "SalesOrders"
							// },
							events: {
								change: function() {
									Log.info(this.getView().getControllerName(), "change")
								}.bind(this),
								dataRequested: function() {
									Log.info(this.getView().getControllerName(), "dataRequested")
								}.bind(this),
								dataReceived: function() {
									Log.info(this.getView().getControllerName(), "dataReceived")
								}.bind(this)
							}
						})
					}.bind(this)
				)
		},
		_onBypassed: function(oEvent) {
			Log.info(
				"yelcho.mydemo.comprouting.controller.Home",
				`_onBypassed Hash="${oEvent.getParameter("hash")}"`
			)
		},
		onLoadComponent1: function() {
			Log.info(this.getView().getControllerName(), "onLoadComponent1")
			this.getOwnerComponent()
				.getRouter()
				.navTo("component1")
		},
		toReuseComp1: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("comp1")
		},
		toReuseComp2: function() {
			Log.info(this.getView().getControllerName(), `toReuseComp1`)
			this.getOwnerComponent()
				.getRouter()
				.navTo("comp2")
		}
	})
})
