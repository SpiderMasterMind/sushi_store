var CheckoutView = Backbone.View.extend({
	template: App.templates.checkout,
	initialize: function() {
		this.render();
		this.listenTo(this.collection, "update change", this.render);
	},
	render: function() {
		this.addLineTotalsToCart()
		this.$el.html(this.template({
			cartItems: this.collection.toJSON(),
			total: this.getNewTotal(),
		}));
		return this;
	},
	events: {
		"click .cancel": "cancelOrder",
		"click .fa-plus": "incrementItem",
		"click .fa-minus": "decrementItem",
		"click .continue": "closeCheckoutView",
	},
	getNewTotal: function() {
		return this.collection.reduce(function(memo, val) { 
			return memo + (val.get('price') * val.get('quantity'));
		}, 0);
	},
	addLineTotalsToCart: function() {
		this.collection.each(function(item) {
			var totalPrice = item.get("price") * Number(item.get("quantity"));
			item.set( {total: totalPrice} )
    });
	},
	incrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var newQuantity = +(this.collection.get(id).get('quantity')) + 1;
		this.collection.get(id).set({ "quantity": String(newQuantity) });
	},
	decrementItem: function(event) {
		event.preventDefault();
		var id = this.getItemId(event);
		var quantity = +(this.collection.get(id).get('quantity')) - 1;
		if (quantity === 0 || quantity === "0") {
			this.collection.remove(this.collection.get(id));
		} else {
			this.collection.get(id).set({ "quantity": String(quantity) });
		}
	},	
	getItemId: function(event) {
		return $(event.target).closest('tr').attr('data-id');
	},
	cancelOrder: function(event) {
		event.preventDefault();
		$("#cart").slideUp('500', function() {
			$("#cart").hide();
			App.trigger("emptyCart");
			App.trigger("showMenu");
		//	App.router.navigate("menu", {trigger: true});
		});
	},
	closeCheckoutView: function(event) {
		event.preventDefault();
		//App.router.navigate("menu", {trigger: true});
		App.trigger("showMenu");
		$('#cart').show();
	},
});
