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
			if (oRouter.oHashChanger.parent.hash) {
				const aHash = oRouter.oHashChanger.parent.hash.split("/")
				switch (aHash[0]) {
					case "categories":
						oRouter.navTo(
							"detail",
							{
								id: aHash[1]
							},
							true
						)
						break
					default:
				}
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
