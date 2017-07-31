var router = new (Backbone.Router.extend({
	index: function() {
	//	Backbone.history.stop();
		//App.init();
		//App.renderMenuItems.bind(this);
		//App.renderCartView.bind(this);
		if ($('#content')) {
			$('#content').remove();
		}
		if (App.checkout) {
			App.checkout.undelegateEvents();		
		}
		
		App.renderMenuItems();
		App.renderCartView();
		App.updateCheckoutItems();
		router.navigate("menu");
	},
	initialize: function() {
		this.route(/^\/?$/, "index");
	},
	routes: {
		"menu": "index", 
    "checkout": "checkoutView",
	//	"menu/:id": "itemView",
	},
	//itemView: function(id) {
	//	console.log(id);
	//	App.renderItemDetailView(id);
	//},
	checkoutView: function() {
		App.renderCheckout.bind(App)
	},
}))();

Backbone.history.start({ pushState: true });

$(document).on('click', "a[href^='/']", function(event) {
  event.preventDefault();
  var href = $(event.currentTarget).attr('href').replace(/^\//, '');
  router.navigate(href, { trigger: true });
});

// first point: check trigger: true effect
//$(document).on('click', "article > header", function(event) {
//	event.preventDefault();
//	var path = "menu/" + $(event.currentTarget).closest("li").attr("data-id")
//	router.navigate(path, { trigger: true });
//});

//$(document).on('click', ".next .prev", function(event) {
//	event.preventDefault();
//	var id = $(event.currentTarget).closest("li").attr("data-id");
//	debugger;
//	var path = "menu/" + $(event.currentTarget).closest("li").attr("data-id")
//	router.navigate(path, { trigger: true });
//});
