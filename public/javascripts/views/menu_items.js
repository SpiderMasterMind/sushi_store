 var MenuItemView = Backbone.View.extend({
	template: App.templates.menu_items,
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({ menuItems: this.collection.toJSON() }));
		return this;
	},
	events: {
		"click article > header": "processShowItem",
		"click #items .add_cart": "processAddItem"
	},
	processShowItem: function(event) {
		event.preventDefault();
		var id = +$(event.target).closest('li').attr('data-id')
		App.trigger("showItem", id);
	},
	processAddItem: function(event) {
		event.preventDefault();
		var id = +$(event.target).closest('li').attr('data-id');
		if (this.itemExists(id)) {
			this.incrementQuantity(id);
		} else {
			this.addNewItemToCollection(id);
		}
	},
	 itemExists: function(id) {
		return !!App.cartItems.get(id);
	},
	addNewItemToCollection: function(id) {
		App.cartItems.add(this.collection.get(id).clone());
	},
	incrementQuantity: function(id) {
		var newQuantity = Number(App.cartItems.get(id).toJSON().quantity) + 1;
		App.cartItems.get(id).set({ quantity: newQuantity.toString() }); 
	},
});
