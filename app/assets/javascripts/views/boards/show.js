/*global Trellino, Backbone, $, _, JST */
'use strict';

Trellino.Views.BoardShow = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model.lists(), 'add', this.render);
    this.listenTo(Trellino.boards, 'add', this.render);
  },

  events: {
    'click #new-list': 'newListForm',
    // 'click span.list_entry': 'renameList',
    // 'click button.newMember': 'addMember',
    // 'click li.card_entry': 'showCard',
    // 'click button.deleteBoard': 'deleteBoard'
  },

  template: JST['boards/show'],

  renderLists: function () {
    this.model.lists().each(function (list) {
      var view = new Trellino.Views.ListShow({
        model: list
      });
      this.addSubView('#lists', view.render());
    }, this);
  },

  render: function () {
    //    var boardMembers = this.model.get('members');
    var content = this.template({
      board: this.model,
      lists: this.model.lists(),
      members: _([])
      //members: boardMembers
    });

    this.$el.html(content);
    this.renderLists();
    // this.$('ul.list_list').sortable({
    //   tolerance: 'pointer',
    //   start: function (event, ui) {
    //     $(ui.item).toggleClass('dragged');
    //   },
    //   stop: function (event, ui) {
    //     $(ui.item).toggleClass('dragged');
    //     that._realignBoard($(event.target));
    //   }
    // });

    // this.collection.each(function (list) {
    //   var cardsIndexView = new Trellino.Views.CardsIndex({
    //     model: list,
    //     collection: list.cards
    //   });
    //   var $cardsViewEl = cardsIndexView.render().$el;
    //   that.$el.find('li#list_' + list.id).append($cardsViewEl);
    // });

    // var flexwidth = (this.collection.length > 1 ? 270 * this.collection.length : 280);
    // this.$el.find('#list_index').outerWidth(flexwidth);

    return this;
  },

  newListForm: function (event) {
    event.preventDefault();
    var view = new Trellino.Views.ListForm({
      board: this.model
    });
    $(event.currentTarget).replaceWith(view.render().$el);
  },

  renameList: function (event) {
    var selectedList = this.collection.get(($(event.target).attr('data-id')));

    if (selectedList) {
      var editListView = new Trellino.Views.ListEdit({
        model: selectedList,
        collection: this.collection
      });
      $(event.target).html(editListView.render().$el);
    }
  },

  addMember: function (event) {
    $(event.target).toggleClass('hidden');
    var newMemberView = new Trellino.Views.MemberNew({
      model: this.model,
      collection: this.collection
    });
    $(event.target).parent().append(newMemberView.render().$el);
  },

  showCard: function (event) {
    var cardID = $(event.target).attr('data-id');
    var selectedCard = Trellino.cards.get(cardID);
    var cardShowView = new Trellino.Views.CardShow({
      model: selectedCard,
      collection: selectedCard.get('todo_items')
    });

    $('.overlay').toggleClass('hidden');
    $('.overlay').append(cardShowView.render().$el);
  },

  deleteBoard: function (event) {
    var boardID = this.model.id;
    this.model.destroy({
      success: function () {
        var dependentLists = Trellino.lists.where({
          board_id: boardID
        });
        _(dependentLists).each(function (list) {
          list.cards.each(function (card) {
            Trellino.cards.remove(card);
          });
        });
        Trellino.boardsRouter.navigate('#', {
          trigger: true
        });
      }
    });
  },

  _realignBoard: function ($ul) {
    var listItems = $ul.find('li');

    var rankIndex = 1;
    $(listItems).each(function (index, item) {
      if ($(item).hasClass('list_entry')) {
        var list = Trellino.lists.get($(item).data('id'));
        list.set({
          rank: rankIndex
        });
        list.save({
          silent: true
        });
        rankIndex++;
      }
    });
  }
});
