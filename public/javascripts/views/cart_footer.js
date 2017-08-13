var CartFooterView = Backbone.View.extend({
	template: App.templates.cart_footer,
	tagName: 'section',
	events: {
		"click .empty_cart": "emptyCart",
		"click .checkout": "goToCheckout",
	},
	initialize: function() {
		this.render();
		this.listenTo(this.collection, "update change", this.render());
	},
	getCartTotal: function() {
		return this.collection.reduce(function(memo, val) { 
			return memo + (val.get('price') * val.get('quantity'));
		}, 0);
	},
	goToCheckout: function(event) {
		event.preventDefault();
		App.trigger("checkout");
	},
	emptyCart: function(event) {
		event.preventDefault()
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			App.trigger("emptyCart");
			App.trigger("showMenu");
		});
	},
	render: function(totalPrice) {
		this.$el.html(this.template({ total: this.getCartTotal() })); 
		$('#cart').append(this.$el);
	},
});
