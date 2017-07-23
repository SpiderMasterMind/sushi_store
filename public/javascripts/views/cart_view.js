var CartView = Backbone.View.extend({
	template: App.templates.cart_item,
	attributes: {
		"id": "cart"
	},
	initialize: function() {
		$('#cart').remove();
		this.render();
	},
	render: function() {
		this.$el.html(this.template({ menuItems: this.collection.toJSON() }));
		this.renderCartItemsView();
		this.renderCartFooter(this.getCartTotal());
	},
	renderCartItemsView: function() {
		if (this.collection.length === 0) {
			return;
		} else if (this.collection.length === 1 && this.allQuantitiesAreOne()) {
			$('main').prepend(this.$el);
			$("#cart").hide().slideDown('500');
		} else {
			$('main').prepend(this.$el);
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
