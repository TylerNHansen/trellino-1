// direct children: board.lists()
// $el = <div id="content" class="container"> / $('#content') in root.html.erb
// $listsel
window.Trellino.Views.boardShow = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click #deleteBoard': 'deleteBoard'
  },

  template: JST['boardShow'],
  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);
     // this.$el.html has stuff updated, but the DOM hasn't updated yet so the listsView can't muck about in it.
     // solution is to take this.$el, use the .find method to get to the place we want
     // then use .html to set the tag's inner html
     // and use the inner view's .render to build up the inner view's $el properly
     // and use the .$el attribute to grab the inner HTML we want, putting it where it goes.
    if(this.listsView){
      this.listsView.leave();
    }
    this.listsView = new Trellino.Views.listsForBoard({lists: this.model.lists()} );
    this.$el.find('#lists').html(this.listsView.render().$el);
    return this;
  },

  deleteBoard: function () {
    event.preventDefault();
    this.trigger('deleteMe', this.model);
  },

  leave: function () {
    this.listsView.leave();
    this.remove();
  },


})