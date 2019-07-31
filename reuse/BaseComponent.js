sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
	"use strict"
	return UIComponent.extend("yelcho.reuse.BaseComponent", {
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)
		},
		getMainComponent: function() {
			/*
			Name of main component is defined in componentData of componentUsages
			in main component manifest. For example ...

			"componentUsages": {
				"myreuse": {
					"name": "reuse.component1",
					"componentData": {
						"parentComponentName": "mydemo.Component"
					}
				}

			*/
			let oElement = this.oContainer
			while (oElement && !this._mainComponent) {
				try {
					oElement = oElement.getParent()
					if (
						oElement.getMetadata().getName() ===
						this.oComponentData.parentComponentName
					) {
						this._mainComponent = oElement
					}
				} catch {}
			}
			return this._mainComponent ? this._mainComponent : this
		},
		getMainRouter: function() {
			return this.getMainComponent().getRouter()
		}
	})
})
