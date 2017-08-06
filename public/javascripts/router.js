var Router = Backbone.Router.extend({
	index: function() {
		App.renderMenuItems();
		App.renderCartView();
		App.updateCheckoutItems();
		App.router.navigate("menu", {trigger: true});
	},
	itemView: function(id) {
		App.renderItemDetailView(id);
	},
	checkoutView: function() {
		App.renderCheckout();
	},
	routes: {
		"menu": "index", 
    "checkout": "checkoutView",
		"menu/:id": "itemView",
		"": "index",
	},
});

Backbone.history.start({ pushState: true });
