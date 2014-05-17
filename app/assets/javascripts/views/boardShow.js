window.Trellino.Views.boardShow = Backbone.View.extend({
  initialize: function (options) {
    board = this.model
    board.lists = (this.model.lists || new Trellino.Collections.Lists(board))
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists, 'sync', this.render);
    board.fetch();
  },

  events: {
    'click #deleteBoard': 'deleteBoard'
  },

  template: JST['boardShow'],
  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
    return this;
  },

  deleteBoard: function () {
    event.preventDefault();
    this.trigger('deleteMe', this.model);
  },

  leave: function () {
    this.remove();
  },


})