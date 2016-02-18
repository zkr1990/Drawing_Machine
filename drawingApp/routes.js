Router.configure({
	layoutTemplate: 'layout'
});
Router.route('/', function () {
	this.render("navbar", {to:"navbar"});
	this.render("instruction", {to:"first"});
});
Router.route('/1wall', function () {
	this.render("navbar", {to:"navbar"});
	this.render("wall", {to:"first"});  
	this.render("canvas", {to:"second"});  
});
