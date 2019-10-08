sap.ui.define(["yelcho/reuse/BaseController"], function(Controller) {
	"use strict"
	return Controller.extend("yelcho.mydemo.categories.controller.App", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)
		}
	})
})
