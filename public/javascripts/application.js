var App = {
	templates: JST,
	init: function() {
		this.initCart();
		this.bindEvents();	
		this.renderMenuItems();
		this.renderCartView();
		this.updateCheckoutItems();
		this.router = new Router();
	},
	bindEvents: function() {
		_.extend(this, Backbone.Events);
		this.on("showItem", this.renderItemDetailView.bind(this));
		this.on("addItem", this.processAddItem.bind(this));
		this.on("emptyCart", this.emptyCart.bind(this));
		this.on("checkout", this.renderCheckout.bind(this));
		$(document).on('click', "a[href^='/']", this.navigateToMenu.bind(this));
		$(document).on('click', "article > header", this.navigateToItemDetail.bind(this));
		$(document).on('click', ".nav", this.navigateOnItemSidescroll.bind(this));
		$(window).on("unload", this.setLocalStorage.bind(this));
	},
	setLocalStorage: function() {
		localStorage.setItem("sushi", JSON.stringify(this.cartItems.toJSON()));
	},
	navigateToMenu: function(event) {
		event.preventDefault();
  	var href = $(event.currentTarget).attr('href').replace(/^\//, '');
  	this.router.navigate(href, { trigger: true });
	},
	navigateToItemDetail: function(event) {
		event.preventDefault();
		var path = "menu/" + $(event.currentTarget).closest("li").attr("data-id")
		this.router.navigate(path, { trigger: true });
	},
	navigateOnItemSidescroll: function(event) {
		event.preventDefault();
		var currentId = +(window.location.href.match(/[0-9]+$/)[0]); 
		var path = "menu/" + this.getNewId($(event.currentTarget), currentId).toString();
		$('#item_details > div').fadeOut();
		this.router.navigate(path, { trigger: true });
		$('#item_details > div').hide().fadeIn();
		
	},
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
	emptyCart: function() {
		this.cartItems.reset();
		this.updateCheckoutItems();
		$('#checkout').remove();
		$('#content').remove();
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
	getNewId: function(button, id) {
		var arr = this.returnArrayOfIds();
		if (button.hasClass("next")) {
			if (arr[arr.length - 1] === id) {
				return arr[0]
			} else {
				return id + 1; 
			}
		} else {
			if (arr[0] === id) {
				return arr[arr.length - 1];
			} else {
				return id - 1;
			}
		}
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
