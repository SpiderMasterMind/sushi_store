// cart footer should re render itself
// add new view for total items
// animate scrolling
// checkout item numbers should have their own view and be the same, this gets rid of $('span.count')
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
	//	this.on("addItem", this.processAddItem.bind(this));
		this.on("emptyCart", this.emptyCart.bind(this));
		this.on("checkout", this.renderCheckout.bind(this));
		//$(document).on('click', "a[href^='/']", this.navigateToMenu.bind(this));
		//$(document).on('click', "article > header", this.navigateToItemDetail.bind(this));
		//$(document).on('click', ".nav", this.navigateOnItemSidescroll.bind(this));
		//$(window).on("unload", this.setLocalStorage.bind(this));
	},
//	setLocalStorage: function() {
	//	localStorage.setItem("sushi", JSON.stringify(this.cartItems.toJSON()));
	//},
//	navigateToMenu: function(event) {
//		event.preventDefault();
//  	var href = $(event.currentTarget).attr('href').replace(/^\//, '');
//  	this.router.navigate(href, { : true });
//	},
//	navigateToItemDetail: function(event) {
//		event.preventDefault();
//		var path = "menu/" + $(event.currentTarget).closest("li").attr("data-id")
//		this.router.navigate(path, { trigger: true });
//	},
//	navigateOnItemSidescroll: function(event) {
//		event.preventDefault();
//		var currentId = +(window.location.href.match(/[0-9]+$/)[0]); 
//		var path = "menu/" + this.getNewId($(event.currentTarget), currentId).toString();
//		$('#item_details > div').fadeOut();
//		this.router.navigate(path, { trigger: true });
//		$('#item_details > div').hide().fadeIn();
	//		Menu Item buttons: Add to cart, item detail view
	//		Make these events in the menu details view trigger:
	//				Add to cart: change in collection, cart view listens to collection and re renders
	//				Item Detail: App swaps view
		
//	},
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
//	updateCheckoutItems: function() {
//		var itemCount = this.getTotalItems();
//		$("span.count").text(itemCount + this.getItemsString(itemCount));
//	},
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
