sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
	"use strict"
	return UIComponent.extend("yelcho.reuse.BaseComponent", {
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)
		},
		getMainRouter: function() {
			let oElement = this.oContainer.getParent()
			while (oElement && !this._mainRouter) {
				try {
					if (
						oElement.getMetadata().getName() === this.oComponentData.parentName
					) {
						this._mainRouter = oElement.getRouter()
					}
				} catch {}
				oElement = oElement.getParent()
			}
			return this._mainRouter
		}
	})
})
