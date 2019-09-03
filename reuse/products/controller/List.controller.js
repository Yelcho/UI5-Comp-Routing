sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/core/format/NumberFormat"
	],
	function(Controller, Log, NumberFormat) {
		"use strict"
		return Controller.extend("yelcho.reuse.products.controller.List", {
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")

				this.getOwnerComponent()
					.getRouter()
					.getRoute("list")
					.attachPatternMatched(this._onPatternMatched, this)
			},
			_onPatternMatched: function() {
				Log.info(this.getView().getControllerName(), "_onPatternMatched")
			},
			priceFormatter: function(price) {
				var oCurrencyFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance(
					{
						currencyCode: false
					}
				)

				return oCurrencyFormat.format(price, "$")
			},
			onPressListItem: function(oEvent) {
				Log.info(this.getView().getControllerName(), "onPressListItem")
				this.getOwnerComponent()
					.getRouter()
					.navTo("detail", {
						id: oEvent
							.getSource()
							.getBindingContext()
							.getObject().ProductID
					})
			}
		})
	}
)
