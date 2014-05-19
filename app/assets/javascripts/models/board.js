

window.Trellino.Models.Board = Backbone.Model.extend({
  initialize: function (options) {
  },
  urlRoot: 'api/boards/',

  lists: function () {
    if(!this._lists){
        this._lists = new Trellino.Collections.Lists({board: this});
    }
    return this._lists
  },

  // since this has a nested list in the model, need to over-write parse
  parse: function (resp) {
    if(resp.lists){
      this.lists().set(resp.lists);
      delete resp.lists
    }
    return resp;
  },

})