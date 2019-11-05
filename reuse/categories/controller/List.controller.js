sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.categories.controller.List", {
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
