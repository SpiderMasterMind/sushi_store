var CheckoutView = Backbone.View.extend({
	template: App.templates.checkout,
	initialize: function(options) {
		this.total = options.total;
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
			cartItems: this.collection.toJSON(),
			total: this.total,
		}));
		$('#content').append(this.$el);

		return this;
	},
	events: {
		"click .cancel": "cancelOrder",
		"click .fa-plus": "incrementItem",
		"click .fa-minus": "decrementItem",
	},
	incrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var newQuantity = +(this.collection.get(id).get('quantity')) + 1;

		this.collection.get(id).set({ "quantity": String(newQuantity) });
		this.updateQuantitySpan(id, newQuantity);
		this.updateTotal();
	},
	decrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var newQuantity = +(this.collection.get(id).get('quantity')) - 1;
		this.collection.get(id).set({ "quantity": String(newQuantity) });
		if (newQuantity === 0) {
			this.$("tr[data-id='" + id + "']").remove();	
		} else {
			this.updateQuantitySpan(id, newQuantity);
		}
		this.updateTotal();
	},
	updateTotal: function() {
		this.$('.total').text("$" + App.cartView.getCartTotal().toFixed(2));
	},
	updateQuantitySpan: function(id, quantity) {
		this.$("tr[data-id='" + id + "'] p").text(quantity);
	},		
	getItemId: function(event) {
		return $(event.target).closest('tr').attr('data-id');
	},
	cancelOrder: function(event) {
		event.preventDefault();
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			$('#content').remove();
			App.trigger("emptyCart");
		});
	},
});
