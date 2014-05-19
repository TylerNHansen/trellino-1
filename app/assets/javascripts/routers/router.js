// $rootEl = div id='content' / $('#content') in root.html.erb
Trellino.Routers.router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },


  routes: {
    '': 'boardIndex',
    'boards/new': 'boardNew',
    'boards/:id': 'boardShow',
    'boards/:board_id/lists/new': "listNew",
  },
  boardIndex: function () {
    var indexView = new Trellino.Views.boardIndex({
      collection: Trellino.boards()
    })
    this._swapView(indexView);
  },
  boardNew: function () {
    var newView = new Trellino.Views.boardNew({
      collection: Trellino.boards()
    })
    this.listenTo(newView, 'submit', function (board) {
      this.listenTo(board, 'sync', function () {
        this.navigate('boards/' + board.id, {trigger: true});
      })
    })
    this._swapView(newView);
  },
  boardShow: function (id) {
    var showView = new Trellino.Views.boardShow({
      model: Trellino.getOrFetch({
        collection: Trellino.boards(),
        Model: Trellino.Models.Board,
        id: id,
      })
    })

    this.listenTo(showView, 'deleteMe', function (objToDel) {
      objToDel.destroy();
      this.navigate('', {trigger: true});
    })
    this._swapView(showView);
  },

  _swapView: function (view) {
    if(this._currentView){
      this._currentView.leave();
    }
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },



})