window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    this.boards();
    this._router = new Trellino.Routers.router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
  },

  boards: function () {
    if(!this._boards){
      this._boards = new Trellino.Collections.Boards();
      this._boards.fetch();
    }
    return this._boards
  },

  router: function () {
    return this._router;
  },

  getOrFetch: function (options) {
    var collection = options.collection;
    var Model = options.Model;
    var id = options.id;

    var model;

    if(!(model = collection.get(id))){
      model = new Model({id: id});
      model.fetch({
        success: function () { collection.add(model); }
      });
    }

    return model;
  },

};
