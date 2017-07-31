// select animation
// routing
// refactoring >:-()
var App = {
	templates: JST,
	init: function() {
		//this.renderMenuItems();
		this.initCart();
		//this.renderCartView();
		this.bindEvents();
		//this.updateCheckoutItems();
	},
	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.on("showItem", this.renderItemDetailView.bind(this));
		this.on("showMenu", this.renderMenuItems.bind(this));
		this.on("addItem", this.processAddItem.bind(this));
		this.on("emptyCart", this.emptyCart.bind(this));
		this.on("showCart", this.renderCartView.bind(this));
		this.on("checkout", this.renderCheckout.bind(this));
		window.addEventListener("unload", function() {
      localStorage.setItem("sushi", JSON.stringify(this.cartItems.toJSON()));
    }.bind(this));	
		//$(window).scroll(function() {
		//	if ($(window).scrollTop() >= 125) {
		//		$('#cart').addClass('fix-cart');
		//	} else {
		//		$('#cart').removeClass("fix-cart");
		//	}
		//});
	},
	renderCheckout: function() {
		$('#cart').hide();
		this.checkout =	new CheckoutView({
			collection: this.cartItems,
			el: '#content',
			total: this.total,
		});
	},
	emptyCart: function() {
		this.cartItems.reset();
		this.updateCheckoutItems();
		$('#checkout').remove();
		$('#content').remove();
		this.renderMenuItems();
	},
	processAddItem: function(id) {
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
		var newQuantity = (+itemToAdd.get('quantity')) + 1;
		itemToAdd.set({ quantity: newQuantity.toString() }); 
	},

	renderMenuItems: function() {
		this.menuView = new MenuItemView({ 
			collection: this.menuItems,
		});
		
	},
	initCart: function() {
		this.cartItems = new CartItems(JSON.parse(localStorage.getItem("sushi")));
	},
	renderCartView: function() {
		this.cartView = new CartView({ collection: this.cartItems });
	},
	updateCheckoutItems: function() {
		var itemCount = this.getTotalItems();
		$("span.count").text(itemCount + this.getItemsString(itemCount));
	},
	getItemsString: function(items) {
		if (items === 1) {
			return " item"
		} else {
			return " items"
		}
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

Handlebars.registerHelper("item_helper", function(item) {
	if (item === "1") {
		return "item"
	} else {
		return "items"
	}
});
