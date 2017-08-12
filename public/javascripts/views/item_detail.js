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
		"click #item_details .add_cart": "processAddItem",
		"click .nav.prev": "renderPrevItem",
		"click .nav.next": "renderNextItem",
	},
	renderPrevItem: function(event) {
		event.preventDefault();
		this.id = Number(this.id) - 1;
		this.render();
	},
	renderNextItem: function(event) {
		event.preventDefault();
		this.id = Number(this.id) + 1;
		this.render();
	},
	processAddItem: function(event) {
		event.preventDefault();
		
		if (this.itemExists()) {
			this.incrementQuantity();
		} else {
			this.addNewItemToCollection();
		}
	},
	 itemExists: function() {
		return !!App.cartItems.get(this.id);
	},
	addNewItemToCollection: function() {
		App.cartItems.add(this.collection.get(this.id).clone());
	},
	incrementQuantity: function() {
		var newQuantity = Number(App.cartItems.get(this.id).toJSON().quantity) + 1;
		App.cartItems.get(this.id).set({ quantity: newQuantity.toString() }); 
	},
	closeDetailView: function(event) {
		event.preventDefault();
		$("#item_details").remove();
		App.trigger("showMenu");
	},
	
});
