sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.products.controller.List", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function() {
			Controller.prototype.onInit.apply(this, arguments)

			const oRouter = this.getOwnerComponent().getRouter()
			if (oRouter.oHashChanger.parent.hash) {
				const aHash = oRouter.oHashChanger.parent.hash.split("/")
				switch (aHash[0]) {
					case "products":
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
						.getObject().ProductID
				})
		}
	})
})
