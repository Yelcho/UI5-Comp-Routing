sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel"],
	function(UIComponent, JSONModel) {
		"use strict"
		return UIComponent.extend("yelcho.reuse.comp2.Component", {
			metadata: {
				manifest: "json"
			},
			init: function() {
				// call the init function of the parent
				UIComponent.prototype.init.apply(this, arguments)

				// create the views based on the url/hash
				this.getRouter().initialize()

				// set data model
				var oData = {
					recipient: {
						name: "Graham Robbo Comp 2"
					}
				}
				var oModel = new JSONModel(oData)
				this.setModel(oModel)
			},
			getMainRouter: function() {
				let component = this.oContainer.getParent()
				while (component && !this._mainRouter) {
					try {
						if (
							component.getMetadata().getName() ===
							this.oComponentData.parentName
						) {
							this._mainRouter = component.getRouter()
						}
					} catch {}
					component = component.getParent()
				}
				return this._mainRouter
			}
		})
	}
)
