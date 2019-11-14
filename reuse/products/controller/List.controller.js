sap.ui.define([
	"yelcho/reuse/BaseController",
	"sap/m/ColumnListItem",
	"sap/m/Text",
	"sap/base/Log",
	"sap/ui/core/Component"
], function(
	Controller,
	ColumnListItem,
	Text,
	Log,
	Component
) {
	"use strict"
	return Controller.extend("yelcho.reuse.products.controller.List", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onMatched, this)
		},
		_onMatched: function(oEvent) {
			const oArgs = oEvent.getParameter("arguments");
			const sPath = decodeURIComponent(oArgs.basepath || "") + "/Products";
			const oTable = this.getView().byId("table");
			const that = this;

			// check whether the list view is used in embedded mode
			this.bEmbedded = !!oArgs.basepath;

			oTable.bindItems({
				path: sPath,
				parameters: {
					expand: "Supplier"
				},
				template: new ColumnListItem({
					type: "Navigation",
					press: that.onPressListItem.bind(that),
					cells: [
						new Text({ text: "{ProductID}" }),
						new Text({ text: "{ProductName}" }),
						new Text({ text: "{Supplier/CompanyName}" }),
						new Text({ text: {
							path: "UnitPrice",
							formatter: that.priceFormatter
						} })
					]
				})
			});
		},
		onPressListItem: function(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem")

			const oOwnerComponent = this.getOwnerComponent();
			const sProductID = oEvent.getSource().getBindingContext().getProperty("ProductID");

			if (this.bEmbedded) {
				// in embedded mode
				// get the parent component of the owner component
				// and fire the "toProduct" event to go to the detail page of the product
				Component.getOwnerComponentFor(oOwnerComponent).fireEvent("toProduct", {
					productID: sProductID
				});
			} else {
				oOwnerComponent
					.getRouter()
					.navTo("detail", {
						id: sProductID
					})
			}
		}
	})
})
