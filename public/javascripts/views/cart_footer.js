var CartFooterView = Backbone.View.extend({
	template: App.templates.cart_footer,
	tagName: 'section',
	events: {
		"click .empty_cart": "emptyCart",
		"click .checkout": "goToCheckout",
	},
	initialize: function(options) {
		this.options = options;
		this.render();
	},
	goToCheckout: function(event) {
		event.preventDefault();
		App.trigger("checkout");
	},
	emptyCart: function() {
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			App.trigger("emptyCart");
		});
	},
	render: function() {
		this.$el.html(this.template({ total: this.options.total })); 
		$('#cart').append(this.$el);
	},
});
