window.Trellino.Views.boardShow = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists, 'sync', this.render);
    this.model.lists.fetch();
  },


  template: JST['boardShow'],
  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

})