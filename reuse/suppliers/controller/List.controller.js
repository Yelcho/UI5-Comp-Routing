sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.suppliers.controller.List", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")
			const oRouter = this.getOwnerComponent().getRouter()

			if (oRouter.oHashChanger.parent.hash) {
				oRouter.navTo(
					"detail",
					{
						id: oRouter.oHashChanger.parent.hash.split("/")[1]
					},
					true
				)
			}
		},
		onPressListItem: function(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem")
			this.getOwnerComponent()
				.getRouter()
				.navTo("detail", {
					id: oEvent
						.getSource()
						.getBindingContext()
						.getObject().SupplierID
				})
		}
	})
})
