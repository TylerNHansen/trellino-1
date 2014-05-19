window.Trellino.Collections.Boards = Backbone.Collection.extend({
  initialize: function (options) {
  },
  model: Trellino.Models.Board,

  url: '/api/boards',

})