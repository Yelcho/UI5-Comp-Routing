sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/core/format/NumberFormat"
	],
	function(Controller, Log, NumberFormat) {
		"use strict"

		return Controller.extend("yelcho.reuse.BaseController", {
			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")
			},
			_onPatternMatched: function(oEvent) {
				Log.info(this.getView().getControllerName(), "_onPatternMatched")
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
