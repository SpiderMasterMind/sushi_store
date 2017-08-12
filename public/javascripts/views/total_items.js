var TotalItemsView = Backbone.View.extend({
	template: App.templates.total_items,
	initialize: function() {
		this.render();
		this.listenTo(this.collection, "update change", this.render);
	},
	render: function() {
		this.$el.html(this.template( { quantity: this.getCartTotal() } ));
		return this;
	},
	getCartTotal: function() {
		if (!this.collection || this.collection.length === 0) {
			return "0";
		} else {
			return this.collection.reduce(function(memo, val) {
				return memo + +val.get('quantity');
			},0);
		}
	},
});
