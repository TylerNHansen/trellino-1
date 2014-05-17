window.Trellino.Models.Board = Backbone.Model.extend({
  initialize: function (options) {
    this.lists = new Trellino.Collections.Lists({ board: this });
  },
  urlRoot: 'api/boards/'
})