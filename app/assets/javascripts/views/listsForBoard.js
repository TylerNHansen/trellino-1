// $el is div id='lists' / $('#lists') in boardShow.jst.ejs
window.Trellino.Views.listsForBoard = Backbone.View.extend({
  initialize: function (options) {
    // this.$el = $('#lists');
    this.lists = options.lists // must be passed, add throwing error if missing?
    this.listenTo(this.lists, 'sync', this.render);
  },

  events: {
    // 'click #deleteBoard': 'deleteBoard'
  },

  template: JST['listShow'],
  render: function () {
    var that = this
    var content = '<ul id="Lists-ul">'
    this.lists.each(function (list) {
      content += that.template({list: list});
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