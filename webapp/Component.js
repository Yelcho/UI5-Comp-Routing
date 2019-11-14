sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/base/util/deepClone"
], function(UIComponent, JSONModel, deepClone) {
		"use strict"

		// define the events which are fired from the reuse components
		// this component registers handler to those events and navigates
		//  to the other reuse components
		const mEventMappings = {
			suppliersComponent: [{
				name: "toProduct",
				route: "products",
				targetInfo: {
					products: {
						route: "detail",
						parameters: {
							id: "productID"
						}
					}
				}
			}],
			productsComponent: [{
				name: "toSupplier",
				route: "suppliers",
				targetInfo: {
					suppliers: {
						route: "detail",
						parameters: {
							id: "supplierID"
						},
						componentTargetInfo: {
							products: {
								route: "list",
								parameters: {
									basepath: "supplierKey"
								}
							}
						}
					}
				}
			}, {
				name: "toCategory",
				route: "categories",
				targetInfo: {
					categories: {
						route: "detail",
						parameters: {
							id: "categoryID"
						},
						componentTargetInfo: {
							products: {
								route: "list",
								parameters: {
									basepath: "categoryKey"
								}
							}
						}
					}
				}
			}],
			categoriesComponent: [{
				name: "toProduct",
				route: "products",
				targetInfo: {
					products: {
						route: "detail",
						parameters: {
							id: "productID"
						}
					}
				}
			}]
		}

		return UIComponent.extend("yelcho.mydemo.comprouting.Component", {
			metadata: {
				manifest: "json"
			},
			init: function() {
				// call the init function of the parent
				UIComponent.prototype.init.apply(this, arguments)

				const oRouter = this.getRouter();
				oRouter.getViews().attachCreated(this._onComponentCreated, this);

				// create the views based on the url/hash
				oRouter.initialize()

				// set data model
				var oData = {
					recipient: {
						name: "Graham Robbo"
					}
				}
				var oModel = new JSONModel(oData)
				this.setModel(oModel, "jsonModel")
			},
			_onComponentCreated: function(oEvent) {
				const sType = oEvent.getParameter("type")
				const oObject = oEvent.getParameter("object")
				const oOptions = oEvent.getParameter("options")
				const that = this

				function processComponentTargetInfo(oTargetInfo, oEvent) {
					Object.values(oTargetInfo).forEach(function(oInfo) {
						if (oInfo.parameters) {
							Object.keys(oInfo.parameters).forEach(function(sName) {
								let sParamName = oInfo.parameters[sName];
								let sEventValue = oEvent.getParameter(sParamName);

								// expand the parameter mapping with the parameter value from
								// the event
								oInfo.parameters[sName] = sEventValue;
							})
						}

						if (oInfo.componentTargetInfo) {
							processComponentTargetInfo(oInfo.componentTargetInfo, oEvent);
						}
					});
				}

				if (sType === "Component") {
					let aEvents = mEventMappings[oOptions.usage]
					if (Array.isArray(aEvents)) {
						aEvents.forEach(function(oEventMapping) {
							oObject.attachEvent(oEventMapping.name, function(oEvent) {
								let oTargetInfo = deepClone(oEventMapping.targetInfo);
								processComponentTargetInfo(oTargetInfo, oEvent);

								that
									.getRouter()
									.navTo(oEventMapping.route, {}, oTargetInfo)
								that.setSelectedMenuItem(oEventMapping.route);
							})
						});
					}
				}
			},
			setSelectedMenuItem: function(sKey) {
				const oRootView = this.getRootControl();

				if (oRootView) {
					oRootView.byId("navigationList").setSelectedKey(sKey);
				}
			}
		})
	}
)
