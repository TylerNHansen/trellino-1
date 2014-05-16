window.Trellino.Collections.Lists = Backbone.Collection.extend({
  initialize: function (options) {
    this.board = options.board
  },

  url: function () {
    return '/api/boards/' + this.board.id + '/lists'
  },
})