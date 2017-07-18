var App = {
	templates: JST,
	$menu: $("#items"),
	$main: $("main"),
	$cart: $("#cart"),
	$count: $("span.count"),
	init: function() {
		this.renderMenuItems();
		this.initCart();
		this.bindEvents();
		this.updateCheckoutItems();
	},
	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.listenTo(this.cartItems, "update change", this.renderCartView.bind(this));
	},
	renderMenuItems: function() {
		//debugger;
		// this.menuItems is passed in from layout.pug
		this.menuView = new MenuItemView({ 
			collection: this.menuItems,
			el: $("main"),
		});
//		this.menuItems.each(this.renderMenuItemView);
	},
	renderMenuItemView: function(menuItem) {
		new MenuItemView({ model: menuItem });	
	},
	initCart: function() {
		this.cartItems = new CartItems();
	},
	renderCartView: function() {
		if (this.cartItems.length === 0) {
			this.cartView.remove();
		} else {
			this.cartView = new CartView({ collection: this.cartItems });
		}
		this.updateCheckoutItems();
	},
	updateCheckoutItems: function() {
		this.$count.text(this.getTotalItems());
	},
	getTotalItems: function() {
		if (!this.cartItems || this.cartItems.length === 0) {
			return "0";
		} else {
			return this.cartItems.reduce(function(memo, val) {
				return memo + +val.get('quantity');
			},0);
		}
	},
}

Handlebars.registerHelper("format_price", function(price) {
	return (+price).toFixed(2);
});
