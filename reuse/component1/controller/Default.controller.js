sap.ui.define(["yelcho/reuse/BaseController"], function(Controller) {
	"use strict"
	return Controller.extend("yelcho.reuse.component1.controller.Default", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("default")
				.attachPatternMatched(this._onPatternMatched, this)
		}
	})
})
