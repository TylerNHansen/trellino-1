window.Trellino.Collections.Cards = Backbone.Collection.extend({
  initialize: function (options) {
    this.list = options.list
  },
  model: Trellino.Models.Card,

  url: function () {
    return '/api/lists/' + this.list.get('id') + '/cards'
  }
})