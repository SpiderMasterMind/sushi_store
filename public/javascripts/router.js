var Router = Backbone.Router.extend({
	index: function() {
		App.renderMenuItems();
		App.renderCartView();
		App.updateCheckoutItems();
		App.router.navigate("menu", {trigger: true});
	},
	itemView: function(id) {
		App.renderItemDetailView(id);
	},
	checkoutView: function() {
		App.renderCheckout.bind(App);
		
	},
	routes: {
		"menu": "index", 
    "checkout": "checkoutView",
		"menu/:id": "itemView",
		"": "index",
	},
});
// solved by instantiating the router after App.init

Backbone.history.start({ pushState: true });



// navigates slash or lack thereof
$(document).on('click', "a[href^='/']", function(event) {
	console.log("nav1");
 event.preventDefault();
  var href = $(event.currentTarget).attr('href').replace(/^\//, '');
  App.router.navigate(href, { trigger: true });
});

// navigates click to add id to item
$(document).on('click', "article > header", function(event) {
	console.log("nav2");
	event.preventDefault();
	var path = "menu/" + $(event.currentTarget).closest("li").attr("data-id")
	App.router.navigate(path, { trigger: true });
});

//navigates increment/decrement item
$(document).on('click', ".nav", function(event) {
	console.log("nav3");
	event.preventDefault();
	var id = +(window.location.href.match(/[0-9]+$/)[0]) + clickedItemIndex($(event.currentTarget));
	var path = "menu/" + id.toString();
	App.router.navigate(path, { trigger: true });
});

// make this cycle round
// move these functions to the main app object?
function clickedItemIndex(button) {
	if (button.hasClass("next")) {
		return 1;
	} else if (button.hasClass("prev")) {
		return -1;
	}
}
