window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
  },
  urlRoot: 'api/lists/',

  url: function () {
    return 'api/boards/' + this.get('board').id + '/lists';
  },

  cards: function () {
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards({list: this});
    }
    return this._cards
  },

  parse: function (resp) {
    if(resp.cards){
      this.cards().set(resp.cards, {parse: true});
      delete resp.cards
    }
    return resp;
  },

  toJSON: function () {
    var json = Backbone.Model.prototype.toJSON.call(this);
    json.board_id = json.board.id;
    delete json.board;
    json.rank = 1;
    return json;
  },
})