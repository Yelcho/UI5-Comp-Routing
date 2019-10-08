sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
		"sap/base/Log",
		"sap/ui/core/format/NumberFormat"
	],
	function(Controller, History, Log, NumberFormat) {
		"use strict"
		return Controller.extend("yelcho.reuse.products.controller.Detail", {
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
					.createKey("Products", { ProductID: id })

				this.getView().bindElement({
					path: "/" + sObjectPath,
					parameters: {
						expand: "Supplier,Category"
					},
					events: {
						change: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched change"
							)
							this.getView().setBusy(true)
						}.bind(this),
						dataRequested: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched dataRequested"
							)
							this.getView().setBusy(true)
						}.bind(this),
						dataReceived: function() {
							Log.info(
								this.getView().getControllerName(),
								"_onPatternMatched dataReceived"
							)
							this.getView().setBusy(false)
							if (this.getView().getBindingContext() === null)
								this.getOwnerComponent()
									.getRouter()
									.getTargets()
									.display("notFound")
							return
						}.bind(this)
					}
				})
			},
			priceFormatter: function(price) {
				var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance(
					{
						currencyCode: false
					}
				)

				return oCurrencyFormat.format(price, "$")
			},
			northwindImageFormatter: function(picture) {
				return picture ? "data:image/bmp;base64," + picture.substr(104) : null
			},
			onPressSupplier: function(oEvent) {
				Log.info(
					this.getView().getControllerName(),
					"onPressSupplier " +
						oEvent
							.getSource()
							.getBindingContext()
							.getObject().SupplierID
				)
				this.getOwnerComponent()
					.getRouter()
					.navTo("suppliers", {
						id: oEvent
							.getSource()
							.getBindingContext()
							.getObject().SupplierID
					})
			},
			onPressCategory: function(oEvent) {
				Log.info(
					this.getView().getControllerName(),
					"onPressCategory " +
						oEvent
							.getSource()
							.getBindingContext()
							.getObject().CategoryID
				)
				this.getOwnerComponent()
					.getRouter()
					.navTo("categories", {
						id: oEvent
							.getSource()
							.getBindingContext()
							.getObject().CategoryID
					})
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
