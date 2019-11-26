sap.ui.define(["yelcho/reuse/BaseComponent"], function(BaseComponent) {
	"use strict";

	return BaseComponent.extend("yelcho.reuse.categories.Component", {
		metadata: {
			manifest: "json"
		},
		eventMappings: {
			productsComponent: [{
				name: "toProduct",
				forward: "toProduct"
			}]
		}
	});
});
