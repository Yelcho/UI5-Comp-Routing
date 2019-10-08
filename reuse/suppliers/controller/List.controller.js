sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.suppliers.controller.List", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function(oEvent) {
			Controller.prototype.onInit.apply(this, arguments)

			try {
				const aHash = this.getOwnerComponent()
					.getRouter()
					.oHashChanger.parent.hash.split("/")
				if (aHash.length > 1) {
					switch (aHash[0]) {
						case "suppliers":
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
			} catch {}
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
