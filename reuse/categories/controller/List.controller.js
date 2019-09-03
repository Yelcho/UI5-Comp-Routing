sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.categories.controller.List", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function() {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")
			const oRouter = this.getOwnerComponent().getRouter()
			if (
				oRouter.oHashChanger.parent.hash &&
				oRouter.oHashChanger.parent.hash.search("/") >= 0
			) {
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
						.getObject().CategoryID
				})
		}
	})
})
