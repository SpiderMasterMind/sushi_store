// checkout viewing problem
// setup local storage
// animate transitions
// min and max ids on transition
// navigate router URLs
// setup express POST request
var App = {
	templates: JST,
	init: function() {
		this.bindEvents();	
		this.renderMenuItems();
		this.initCart();
		this.renderTotalItemsView();
		this.router = new Router();
	},
	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.on("showMenu", this.renderMenuItems.bind(this));
		this.on("showItem", this.renderItemDetailView.bind(this));
		this.on("emptyCart", this.emptyCart.bind(this));
		this.on("checkout", this.renderCheckout.bind(this));
	},
//	setLocalStorage: function() {
	//	localStorage.setItem("sushi", JSON.stringify(this.cartItems.toJSON()));
	//},
	renderCheckout: function() {
		$('#cart').hide();
		if (this.checkout) { this.checkout.undelegateEvents(); }
		this.checkout =	new CheckoutView({
			collection: this.cartItems,
			el: '#contents',
			total: this.total,
		});
	},
	renderMenuItems: function() {
		if (this.menuView) { this.menuView.undelegateEvents(); }
		this.menuView = new MenuItemView({
			collection: this.menuItems,
			el: "#contents",
		});
	},
	renderItemDetailView: function(id) {
		if (this.itemView) { this.itemView.undelegateEvents(); }
		this.itemView = new ItemDetailView({
			collection: this.menuItems,
			el: '#contents',
			id: id,
		})
	},
	renderTotalItemsView: function() {
		this.totalView = new TotalItemsView({
			collection: this.cartItems,
			el: '.cart'
		})
	},
	emptyCart: function() {
		this.cartItems.reset();
		$('#checkout').remove();
		$('#content').remove();
	},
	initCart: function() {
		this.cartItems = new CartItems(JSON.parse(localStorage.getItem("sushi")));
		this.renderCartView();
	},
	renderCartView: function() {
		this.cartView = new CartView({ collection: this.cartItems });
	},
	returnArrayOfIds: function() {
		return this.menuItems.toJSON().map(function(model) { return model.id } );
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
