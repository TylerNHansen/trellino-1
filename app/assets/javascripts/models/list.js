window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {

  },
  urlRoot: 'api/list/',

  cards: function () {
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards({list: this});
    }
  },

  parse: function (resp) {
    if(resp.cards){
      this.cards().set(resp.cards);
      delete resp.cards
    }
    return resp;
  },
})