sap.ui.define([
	"yelcho/reuse/BaseController",
	"sap/base/Log"
], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.products.controller.Detail", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("detail")
				.attachPatternMatched(this._onMatched, this)
		},
		_onMatched: function(oEvent) {
			const args = oEvent.getParameter("arguments")

			this.getOwnerComponent()
				.getModel()
				.metadataLoaded()
				.then(this._bindData.bind(this, args.id))
		},
		_bindData: function(id) {
			Log.info(this.getView().getControllerName(), "_bindData")

			var sObjectPath = this.getOwnerComponent()
				.getModel()
				.createKey("Products", { ProductID: id })

			this.getView().bindElement({
				path: "/" + sObjectPath,
				parameters: {
					expand: "Supplier,Category"
				},
				events: {
					change: function() {
						Log.info(this.getView().getControllerName(), "_bindData change")
						this.getView().setBusy(false)
					}.bind(this),
					dataRequested: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataRequested"
						)
						this.getView().setBusy(true)
					}.bind(this),
					dataReceived: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataReceived"
						)
						this.getView().setBusy(false)
						if (this.getView().getBindingContext() === null)
							this.getOwnerComponent()
								.getRouter()
								.getTargets()
								.display("notFound")
						return
					}.bind(this)
				}
			})
		},
		onPressSupplier: function(oEvent) {
			Log.info(
				this.getView().getControllerName(),
				"onPressSupplier " +
					oEvent
						.getSource()
						.getBindingContext()
						.getObject().SupplierID
			)

			const oOwnerComponent = this.getOwnerComponent();
			const oModel = oOwnerComponent.getModel();
			const oBindingContext = oEvent.getSource().getBindingContext();
			const sSupplierID = oBindingContext.getProperty("SupplierID");

			oOwnerComponent.fireEvent("toSupplier", {
					supplierID: sSupplierID,
					supplierKey: encodeURIComponent("/" + oModel.createKey("Suppliers", {
						SupplierID: sSupplierID
					}))
				});
		},
		onPressCategory: function(oEvent) {
			Log.info(
				this.getView().getControllerName(),
				"onPressCategory " +
					oEvent
						.getSource()
						.getBindingContext()
						.getObject().CategoryID
			)

			const oOwnerComponent = this.getOwnerComponent();
			const oModel = oOwnerComponent.getModel();
			const oBindingContext = oEvent.getSource().getBindingContext();
			const sCategoryID = oBindingContext.getProperty("CategoryID");

			oOwnerComponent.fireEvent("toCategory", {
					categoryID: sCategoryID,
					categoryKey: encodeURIComponent("/" + oModel.createKey("Categories", {
						CategoryID: sCategoryID
					}))
				});
		}
	})
})
