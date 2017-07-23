var CheckoutView = Backbone.View.extend({
	template: App.templates.checkout,
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template( { cartItems: this.collection.toJSON() } ));
		//$('main').append(this.$el);
		$('#cart').after(this.$el);
	},
	events: {
	},
});
