// $el is div id='lists' / $('#lists') in boardShow.jst.ejs
window.Trellino.Views.CardsForList = Backbone.View.extend({
  initialize: function (options) {
    // this.$el = $('#cards');
    this.cards = options.cards // must be passed, add throwing error if missing?
    this.listenTo(this.cards, 'sync', this.render);
  },

  events: {
    // 'click #deleteBoard': 'deleteBoard'
  },

  template: JST['cardShow'],
  render: function () {
    var that = this
    var content = '<ul id="cards-ul">'
    this.cards.each(function (card) {
      content += that.template({card: card});
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
    this.remove();
  },


})