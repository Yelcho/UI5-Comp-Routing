sap.ui.define(["yelcho/reuse/BaseController"], function(Controller) {
	"use strict"
	return Controller.extend("yelcho.mydemo.products.controller.App", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)
		}
	})
})
