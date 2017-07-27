var router = new (Backbone.Router.extend({
	//index: function() {
	//	Backbone.history.stop();
	//	App.init();

	//},
	//initialize: function() {
	//	this.route(/^\/?$/, "index");
	//},
	routes: {
		'menu': App.renderMenuItems.bind(App),
    '/checkout': App.renderCheckout.bind(App)
	},
}))();

Backbone.history.start({ pushState: true });

$(document).on('click', "a[href^='/']", function(e) {
  e.preventDefault();
  var href = $(e.currentTarget).attr('href').replace(/^\//, '');
  router.navigate(href, { trigger: true });
});
