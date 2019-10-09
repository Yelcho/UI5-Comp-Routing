sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/core/format/NumberFormat"
	],
	function(Controller, Log, NumberFormat) {
		"use strict"
		return Controller.extend("yelcho.app.products.controller.List", {
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")
			},
			priceFormatter: function(price) {
				return NumberFormat.getCurrencyInstance({
					currencyCode: false
				}).format(price, "$")
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
