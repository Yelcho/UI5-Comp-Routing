sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/base/Log", "sap/ui/model/json/JSONModel"],
	function(Controller, Log, JSONModel) {
		"use strict"
		return Controller.extend("yelcho.mydemo.comprouting.controller.App", {
			model: new JSONModel(),
			data: {
				navigation: [
					{
						title: "Home",
						icon: "sap-icon://home",
						key: "home"
					},
					{
						title: "Root Item",
						icon: "sap-icon://building",
						expanded: true,
						key: "root1",
						items: [
							{
								title: "Nav to Reuse Component 1",
								key: "comp1"
							},
							{
								title: "Nav to Reuse Component 2",
								key: "comp2"
							}
						]
					}
				]
			},

			onInit: function() {
				Log.info(this.getView().getControllerName(), "onInit")

				this.model.setData(this.data)
				this.getView().setModel(this.model, "appModel")
			},
			onSideNavButtonPress: function() {
				Log.info(this.getView().getControllerName(), "onSideNavButtonPress")
				var toolPage = this.byId("toolPage")
				var sideExpanded = toolPage.getSideExpanded()

				this._setToggleButtonTooltip(sideExpanded)

				toolPage.setSideExpanded(!toolPage.getSideExpanded())
			},
			_setToggleButtonTooltip: function(bLarge) {
				Log.info(this.getView().getControllerName(), "_setToggleButtonTooltip")
				var toggleButton = this.byId("sideNavigationToggleButton")
				if (bLarge) {
					toggleButton.setTooltip("Large Size Navigation")
				} else {
					toggleButton.setTooltip("Small Size Navigation")
				}
			},
			onItemSelect: function(oEvent) {
				Log.info(
					this.getView().getControllerName(),
					`onItemSelect Key=${oEvent.getParameter("item").getKey()}`
				)
				this.getOwnerComponent()
					.getRouter()
					.navTo(oEvent.getParameter("item").getKey())
			}
		})
	}
)
