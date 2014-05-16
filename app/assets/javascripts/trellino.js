window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    Trellino.boards = new Trellino.Collections.Boards();
    Trellino.router = new Trellino.Routers.router({
      $rootEl: $('#content')
    });
    Backbone.history.start();
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
