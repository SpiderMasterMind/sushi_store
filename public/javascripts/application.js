// The el of menu items and item detail must be thought out, so events occur
// Look at next/prev id methods, in case there is a 'gap' in id numbers
// helper method item vs items
var App = {
	templates: JST,
	$menu: $("#items"),
	$main: $("main"),
	$cart: $("#cart"),
	$count: $("span.count"),
	init: function() {
		this.renderMenuItems();
		this.initCart();
		this.renderCartView();
		this.bindEvents();
		this.updateCheckoutItems();
	},
	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.on("showItem", this.renderItemDetailView.bind(this));
		this.on("showMenu", this.renderMenuItems.bind(this));
		this.on("addItem", this.processAddItem.bind(this));
		this.on("emptyCart", this.emptyCart.bind(this));
		this.on("checkout", this.renderCheckout.bind(this));
	},
	renderCheckout: function() {
		this.$menu.remove();
		new CheckoutView({
			collection: this.cartItems,
			el: '#content',
		});
	},
	emptyCart: function() {
		this.cartItems.reset();
		this.updateCheckoutItems();
		$('#checkout').remove();
		this.renderMenuItems();
	},
	processAddItem: function(id) {
		console.log(id);
		if (this.itemExists(id)) {
			this.incrementItem(id);
		} else {
			this.addNewItemToCollection(id);
		}
		this.renderCartView();
		this.updateCheckoutItems();
	},
	itemExists(id) {
		return !!this.cartItems.get(id);
	},
	addNewItemToCollection: function(id) {
		this.cartItems.add(this.menuItems.get(id).clone());
	},
	incrementItem: function(id) {
		var itemToAdd = this.cartItems.get(id);
		var quantity = +itemToAdd.get('quantity');
		newQuantity = quantity += 1;
		itemToAdd.set({ quantity: newQuantity.toString() }); 
	},

	renderMenuItems: function() {
		// this.menuItems is passed in from layout.pug
		this.menuView = new MenuItemView({ 
			collection: this.menuItems,
		});
	},
	initCart: function() {
		this.cartItems = new CartItems();
	},
	renderCartView: function() {
		this.cartView = new CartView({ collection: this.cartItems });
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
	renderItemDetailView: function(id) {
		new ItemDetailView({
			collection: this.menuItems,
			id: id,
			el: '#content',
		})
	},
}

Handlebars.registerHelper("format_price", function(price) {
	return (+price).toFixed(2);
});
