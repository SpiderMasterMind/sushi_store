var CartFooterView = Backbone.View.extend({
	template: App.templates.cart_footer,
	tagName: 'section',
	events: {
		"click.empty_cart": "emptyCart"
	},
	initialize: function(options) {
		this.options = options;
		this.render();
	},
	emptyCart: function() {
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			App.cartItems.reset();
			App.cartItems.trigger('update');
		});
	},
	render: function() {
		this.$el.html(this.template({ total: this.options.total })); 
		$('#cart').append(this.$el);
		//		el is an existing DOM element, not needed when creating from templates, tagName is used when we add a new one and overrites the default DIV
	},
});
