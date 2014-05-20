Trellino.Views.ListNew = Backbone.View.extend({
  initialize: function (options) {
  },

  events: {
    "click .new-list-btn": "submitList",
    'submit': 'submitList',
  },

  template: JST['listNew'],
  render: function () {
    var content = this.template({ lists: this.collection });
    this.$el.html(content);
    return this;
  },

  submitList: function (event) {
    event.preventDefault();
    var title = $('.list-title').val();
    var list = new Trellino.Models.List({
      title: title
    });
    this.trigger('addThisList', list);
  },

  leave: function () {
    this.remove();
  },


})