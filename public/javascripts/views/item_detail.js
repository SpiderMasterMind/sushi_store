var ItemDetailView = Backbone.View.extend({
	template: App.templates.item_detail,
	initialize: function(options) {
		this.render();
		this.id = options.id;
	},
	render: function() {
		this.$el.html(this.template( this.collection.get(this.id).toJSON() ));
		return this;
	},
	events: {
		"click .close": "closeDetailView",
		"click #item_details .add_cart": "addItem",
	},
	addItem: function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		App.trigger("addItem", this.id);
	},
	closeDetailView: function(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
		$("#item_details").remove();
		App.router.navigate("menu", {trigger: true});
	},
});
