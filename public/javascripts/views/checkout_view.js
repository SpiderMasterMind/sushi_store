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
		return this;
	},
	events: {
		"click .cancel": "cancelOrder",
		"click .fa-plus": "incrementItem",
		"click .fa-minus": "decrementItem",
		"click .continue": "closeCheckoutView",
	},
	incrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var newQuantity = +(this.collection.get(id).get('quantity')) + 1;
		App.cartItems.get(id).set({ "quantity": String(newQuantity) });
		this.updateQuantitySpan(id, newQuantity);
		this.updateLinePrice(id, newQuantity);
		this.updateTotal();
	},
	decrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var newQuantity = +(this.collection.get(id).get('quantity')) - 1;
		App.cartItems.get(id).set({ "quantity": String(newQuantity) });
		if (newQuantity === 0) {
			this.$("tr[data-id='" + id + "']").remove();	
			this.collection.remove(id);
		} else {
			this.updateQuantitySpan(id, newQuantity);
			this.updateLinePrice(id, newQuantity);
		}
		this.updateTotal();
	},
	updateLinePrice: function(id, newQuantity) {
		var price = +newQuantity * Number(this.collection.get(id).get("price"));
		$("tr[data-id='" + id + "']").find("td").last().text("$" + price.toFixed(2));
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
		event.stopImmediatePropagation();
		event.preventDefault();
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			App.trigger("emptyCart");
			App.router.navigate("menu", {trigger: true});
		});
	},
	closeCheckoutView: function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		//$('#contents').remove();
		App.router.navigate("menu", {trigger: true});
		$('#cart').show();
	},
});
