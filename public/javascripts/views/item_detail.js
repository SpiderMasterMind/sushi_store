var ItemDetailView = Backbone.View.extend({
	template: App.templates.item_detail,
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model));
	},
	events: {
		"click .close": "closeDetailView",
	},
	closeDetailView: function(event) {
		event.preventDefault();
		console.log('closeing');
		App.renderMenuItems();
		this.remove();
	},
});
