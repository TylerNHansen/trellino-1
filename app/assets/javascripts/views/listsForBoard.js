// $el is div id='lists' / $('#lists') in boardShow.jst.ejs
window.Trellino.Views.ListsForBoard = Backbone.View.extend({
  initialize: function (options) {
    // this.$el = $('#lists');
    this.lists = options.lists // must be passed, add throwing error if missing?
    this.listenTo(this.lists, 'sync', this.render);
    this._children = _([]);
  },

  events: {
    // 'click #deleteBoard': 'deleteBoard'
  },

  template: JST['listShow'],
  render: function () {
    var that = this
    var content = '<ul class="lists-ul">'
    this._children.each(function (child) {
      child.leave();
    })

    this.lists.each(function (list) {
      content += '<ul class="cards-ul">'
      content += that.template({list: list});
      var cardView = new Trellino.Views.CardsForList({cards: list.cards()});
      that._children.push(cardView);
      content += cardView.render().$el.html();
      content += '</ul>';
    });
    content += '</ul>'
    this.$el.html(content);
    return this;
  },

  // deleteBoard: function () {
  //   event.preventDefault();
  //   this.trigger('deleteMe', this.model);
  // },

  leave: function () {
    this._children.each(function (child) {
      child.leave();
    });
    this.remove();
  },


})