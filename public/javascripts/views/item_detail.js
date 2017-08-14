var ItemDetailView = Backbone.View.extend({
	template: App.templates.item_detail,
	initialize: function(options) {
		this.render();
		this.id = Number(options.id);
		this.lastId = this.getLastId();
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
	getLastId: function() {
		return this.collection.max(function(model) { return model.get("id") } ).get("id");	
	},
	renderPrevItem: function(event) {
		event.preventDefault();
		if (this.id === 1) {
			this.id = this.lastId;
		} else {	
			this.id = this.id - 1;
		}
		
		this.render();
		this.updateUrl();
	},
	renderNextItem: function(event) {
		event.preventDefault();
		if (this.id === this.lastId) {
			this.id = 1;
		} else {
			this.id = this.id + 1;
		}

		this.render();
		this.updateUrl();
	},
	updateUrl: function() {
		App.router.navigate("menu/" + this.id, { trigger: true } );
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
		App.router.navigate("menu", { trigger: true } );
	},
	
});
