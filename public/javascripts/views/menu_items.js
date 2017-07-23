 var MenuItemView = Backbone.View.extend({
	template: App.templates.menu_items,
	id: 'content',
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({ menuItems: this.collection.toJSON() }));
		$('main').append(this.$el);
	},
	events: {
		"click article > header": "processShowItem",
		"click #items .add_cart": "processAddItem"
	},
	processShowItem: function() {
		var id = +$(event.target).closest('li').attr('data-id')
		App.trigger("showItem", id);
	},
	processAddItem: function(event) {
		event.preventDefault();
		var id = +$(event.target).closest('li').attr('data-id');
		App.trigger("addItem", id);
	},
});
