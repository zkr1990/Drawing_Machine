points = new Meteor.Collection('pointsCollection');
circles = new Meteor.Collection('circleCollection');
rectangles = new Meteor.Collection('rectangleCollection');

Meteor.methods({
  'clear': function () {
    points.remove({});
	circles.remove({});
	rectangles.remove({});
	
  }
});
