sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/core/format/NumberFormat"
	],
	function(Controller, Log, NumberFormat) {
		"use strict"
		return Controller.extend("yelcho.app.products.controller.Detail", {
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
							Log.info(this.getView().getControllerName(), "_bindData change")
							this.getView().setBusy(false)
						}.bind(this),
						dataRequested: function() {
							Log.info(
								this.getView().getControllerName(),
								"_bindData dataRequested"
							)
							this.getView().setBusy(true)
						}.bind(this),
						dataReceived: function() {
							Log.info(
								this.getView().getControllerName(),
								"_bindData dataReceived"
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
				return NumberFormat.getCurrencyInstance({
					currencyCode: false
				}).format(price, "$")
			},
			northwindImageFormatter: function(picture) {
				return picture ? "data:image/bmp;base64," + picture.substr(104) : null
			}
		})
	}
)
