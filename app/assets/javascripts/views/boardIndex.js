window.Trellino.Views.boardIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, 'reset add remove destroy', this.render);
    this.collection.fetch();
  },


  template: JST['boardIndex'],
  render: function () {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    return this;
  },

  leave: function () {
    this.remove();
  },


})