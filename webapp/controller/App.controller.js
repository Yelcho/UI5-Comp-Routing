sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/base/Log"
], function(
	Controller,
	Log
) {
	"use strict";
	return Controller.extend("yelcho.mydemo.comprouting.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit");

			this
				.getOwnerComponent()
				.getRouter()
				.attachRouteMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function() {
			Log.info(this.getView().getControllerName(), "_onRouteMatched");
		},
		onSideNavButtonPress: function() {
			var oToolPage = this.byId("toolPage");
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		onUserNamePress: function() {
			Log.info(this.getView().getControllerName(), "onUserNamePress");
		},
		onItemSelect: function(oEvent) {
			var sKey = oEvent.getParameter("item").getKey();
			Log.info(this.getView().getControllerName(), "onItemSelect Key=" + sKey);
			this.getOwnerComponent()
				.getRouter()
				.navTo(sKey);
		}
	});
});
