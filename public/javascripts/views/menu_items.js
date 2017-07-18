var MenuItemView = Backbone.View.extend({
	template: App.templates.menu_items,
	id: "content",	
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template({ menuItems: this.collection.toJSON() }));
		App.$main.append(this.$el);
	},
	events: {
		"click header": "processShowItem",
		"click .add_cart": "processAddItem"
	},
	processShowItem: function() {
		var id = +$(event.target).closest('li').attr('data-id');
		// overwrite the #content div to show item view
		new ItemDetailView({
			el: $('#content'),
			model: this.collection.get(id).toJSON(),
		})
	},
	processAddItem: function(event) {
		event.preventDefault();
		var id = +$(event.target).closest('li').attr('data-id');
		if (this.itemExists(id)) {
			this.incrementItem(id);
		} else {
			this.addNewItemToCollection(id);
		}
	},
	itemExists(id) {
		return !!App.cartItems.get(id);
	},
	addNewItemToCollection: function(id) {
		App.cartItems.add(App.menuItems.get(id).clone());
	},
	incrementItem: function(id) {
		var itemToAdd = App.cartItems.get(id);
		var quantity = +itemToAdd.get('quantity');
		newQuantity = quantity += 1;
		itemToAdd.set({ quantity: newQuantity.toString() }); 
	},


});
