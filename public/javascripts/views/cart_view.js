var CartView = Backbone.View.extend({
	$cart: $("#cart"),
	template: App.templates.cart_item,
	attributes: {
		"id": "cart"
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({ menuItems: this.collection.toJSON() }));
		this.renderCartItemsView();
		this.renderCartFooter(this.getCartTotal());
	},
	renderCartItemsView: function() {
			$("#cart").remove();
			App.$main.prepend(this.$el);
			if (this.collection.length === 1 && this.allQuantitiesAreOne()) {
				$("#cart").hide().slideDown('500');
			}
	},
	renderCartFooter: function(cartTotal) {
		new CartFooterView({ total: cartTotal });
	},
	allQuantitiesAreOne: function() {
		return this.collection.every(function(model) {
			return +model.get('quantity') === 1
		}, this);
	},
	getCartTotal: function() {
		return this.collection.reduce(function(memo, val) { 
			return memo + (val.get('price') * val.get('quantity'));
		}, 0);
	},

});
