Template.topBar.events({
	"click a#register":function(event,template){
		event.preventDefault();
		Modal.show('register');
	},
	"click a#login":function(event,template){
		event.preventDefault();
		Modal.show('login');
	},

	"click a#logout":function(event,template){
		event.preventDefault();
		Modal.show('logout');
	},
});
