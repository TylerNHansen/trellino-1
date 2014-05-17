Trellino.Views.listNew = Backbone.View.extend({
  initialize: function (options) {
  },

  events: {
    "click #submit-list": "submitList",
  },

  template: JST['listNew'],
  render: function () {
    var content = this.template({ lists: this.collection });
    this.$el.html(content);
    return this;
  },

  submitList: function (event) {
    event.preventDefault();
    var title = $('#listData').val();
    var list = new Trellino.Models.List({
      title: title
    });
    this.collection.add(list);
    list.save();
    this.trigger('submit', list);
  },

  leave: function () {
    this.remove();
  },


})