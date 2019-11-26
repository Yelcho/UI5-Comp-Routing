sap.ui.define(["yelcho/reuse/BaseController"], function(BaseController) {
	"use strict";

	return BaseController.extend("yelcho.mydemo.suppliers.controller.App", {
		onInit: function() {
			BaseController.prototype.onInit.apply(this, arguments);
		}
	});
});
