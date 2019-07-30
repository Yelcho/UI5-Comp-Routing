sap.ui.define(["yelcho/reuse/BaseController"], function(Controller) {
	"use strict"
	return Controller.extend("yelcho.reuse.comp1.controller.View1", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("view1")
				.attachPatternMatched(this._onPatternMatched, this)
		}
	})
})
