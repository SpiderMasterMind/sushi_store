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
    "checkout": "checkoutView" 
	},
	checkoutView: function() {
		App.renderCheckout.bind(App)
	},
}))();

Backbone.history.start({ pushState: true });

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
	console.log($(e.currentTarget).attr('href'));
  var href = $(e.currentTarget).attr('href').replace(/^\//, '');
  router.navigate(href, { trigger: true });
});
