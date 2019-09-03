sap.ui.define(["yelcho/reuse/BaseComponent"], function(UIComponent) {
	"use strict"
	return UIComponent.extend("yelcho.reuse.suppliers.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)
			this.getRouter().initialize()
		}
	})
})
