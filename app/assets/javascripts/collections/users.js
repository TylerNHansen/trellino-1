/*global Trellino, Backbone */
"use strict";

Trellino.Collections.Users = Backbone.Collection.extend({
	model: Trellino.Models.User,
	url: "/users"
});
