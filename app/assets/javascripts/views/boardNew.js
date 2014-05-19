Trellino.Views.boardNew = Backbone.View.extend({
  initialize: function (options) {
  },

  events: {
    "click #submit-board": "submitBoard",
  },

  template: JST['boardNew'],
  render: function () {
    var content = this.template({ boards: this.collection });
    this.$el.html(content);
    return this;
  },

  submitBoard: function (event) {
    event.preventDefault();
    var title = $('#boardData').val();
    var board = new Trellino.Models.Board({
      title: title
    });
    board.save()
    this.trigger('submit', board);
  },

  leave: function () {
    this.remove();
  },


})