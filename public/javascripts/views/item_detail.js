var ItemDetailView = Backbone.View.extend({
	template: App.templates.item_detail,
	initialize: function(options) {
		this.render();
		this.id = options.id;
	},
	render: function() {
		this.$el.html(this.template( this.collection.get(this.id).toJSON() ));
		$('#items').after(this.$el);
	},
	events: {
		"click .close": "closeDetailView",
		"click .nav.next": "goToNext",
		"click .nav.prev": "goToPrev",
		"click #item_details .add_cart": "addItem",
	},
	addItem: function(event) {
		event.preventDefault();
		console.log('from detail view', this.id); 
		App.trigger("addItem", this.id);
	},
	closeDetailView: function(event) {
		event.preventDefault();
		this.remove();
		App.trigger("showMenu");
	},
	goToNext: function(event) {
		event.preventDefault();
		if (!this.collection.get(+this.id + 1)) {
			this.id = 1;
		} else {
			this.id = +this.id + 1;
		}
		$('#item_details > div').animate({ width: '0' }, 1000);
		this.replaceViewContent();
	},
	goToPrev: function(event) {
		event.preventDefault();
		if (!this.collection.get(+this.id - 1)) {
			this.id = 19;
		} else {
			this.id = +this.id - 1;
		}
		this.replaceViewContent();
	},
	replaceViewContent: function() {
		$('#item_details').replaceWith(this.template(this.collection.get(this.id).toJSON()));
	},		
});
