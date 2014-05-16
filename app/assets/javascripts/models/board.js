window.Trellino.Models.Board = Backbone.Model.extend({
  initialize: function () {
    this.lists = new Trellino.Collections.Lists({ board: this });
  },
  urlRoot: 'api/boards/'
})