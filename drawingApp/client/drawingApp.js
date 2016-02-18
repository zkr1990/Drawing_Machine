points = new Meteor.Collection('pointsCollection');
circles = new Meteor.Collection('circleCollection');
rectangles = new Meteor.Collection('rectangleCollection');

var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";
var circleX=0;
var circleY=0;
var rectangleX=0;
var rectangleY=0;

var option = 0;

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var data = points.find({}).fetch();
	var data_circle = circles.find({}).fetch();
	var data_rectangle = rectangles.find({}).fetch();
	
    if (canvas) {
      canvas.draw(data, data_circle, data_rectangle);
	  
    }
  });
});

Template.wall.events({
  "click button.clear": function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  },
  "click button.line": function () {
    lastX=0;
    lastY=0;
	option=0;
    strokeColor = "black";
  },
  "click button.circle": function () {
    circleX=0;
    circleY=0;
	option=1;
	strokeColor = "black";
	//circleR=10;  no need to pass the r value right now
  },
  "click button.rectangle": function () {
    rectangleX=0;
    rectangleY=0;
	option=2;
	strokeColor = "black";
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "click button.red": function () {
    lastX=0;
    lastY=0;
    strokeColor = "red";
  },

  "click button.black": function () {
    lastX=0;
    lastY=0;
    strokeColor = "black";
  },

  "click button.purple": function () {
    lastX=0;
    lastY=0;
    strokeColor = "purple";
  },

  "click button.chocolate": function () {
    lastX=0;
    lastY=0;
    strokeColor = "chocolate";
  },

  "click button.gold": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gold";
  },

  "click button.tomato": function () {
    lastX=0;
    lastY=0;
    strokeColor = "tomato";
  },

  "click button.white": function () {
    lastX=0;
    lastY=0;
    strokeColor = "white";
  },

  "click button.blue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "blue";
  },

  "click button.green": function () {
    lastX=0;
    lastY=0;
    strokeColor = "green";
  },

  "click button.hotpink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "hotpink";
  },

  "click button.lightblue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lightblue";
  },

  "click button.lightpink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lightpink";
  },

  "click button.orange": function () {
    lastX=0;
    lastY=0;
    strokeColor = "orange";
  },

  "click button.palegreen": function () {
    lastX=0;
    lastY=0;
    strokeColor = "palegreen";
  },

  "click button.peru": function () {
    lastX=0;
    lastY=0;
    strokeColor = "peru";
  },

  "click button.silver": function () {
    lastX=0;
    lastY=0;
    strokeColor = "silver";
  },

  "click button.thicker": function () {

    thickness+=1;

  },

  "click button.thinner": function () {
    
    if (thickness > 0) {
      thickness-=1;
    }
  },
  "click button.save": function (event) {
	  var html = d3.select('svg')
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
	  //console.log(html);
	  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
	  var canvas1 = document.createElement('canvas');
	  canvas1.width = 800;
	  canvas1.height = 600;
	  var context = canvas1.getContext('2d');
	  var image = new Image;
	  image.src = imgsrc;
	  image.onload = function() {
		  context.drawImage(image, 0, 0, 800, 600, 0, 0, 800, 600);

		  var canvasdata = canvas1.toDataURL("image/png");
		  var a = document.createElement("a");
		  a.download = "ThisIsYourDownloadImage.png";
		  a.href = canvasdata;
		  a.click();
	  };
  },



})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
      points.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        x: (event.pageX - offset.left),
        y: (event.pageY - offset.top),
        x1: lastX,
        y1: lastY,
        // We could calculate the line thickness from the distance
        // between current position and last position
        //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
        //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
        // Or we could just set the line thickness using buttons and variable
        w: thickness,
        // We can also use strokeColor, defined by a selection
        c: strokeColor,


      }); // end of points.insert()

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

var markCircle = function() {
	var offset = $('#canvas').offset();
      // check that x was something not top-left. should probably set this to -1
	  if(circleX == 0){
		  
      circleX = (event.pageX - offset.left);
      circleY = (event.pageY - offset.top);
	  }
      circles.insert({
        //this draws a point exactly where you click the mouse
      // x: (event.pageX - offset.left),
      // y: (event.pageY - offset.top)});


        //We can do more interesting stuff
        //We need to input data in the right format
        //Then we can send this to d3 for drawing


        //1) Algorithmic mouse follower
      // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
      // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

        //2) draw a line - requires you to change the code in drawing.js
        cx: circleX,
        cy: circleY,
        c: strokeColor,

      }); // end of circles.insert()
      circleX = (event.pageX - offset.left);
      circleY = (event.pageY - offset.top);


}

var markRectangle = function() {
	var offset = $('#canvas').offset();
      // check that x was something not top-left. should probably set this to -1
	  if(rectangleX == 0){
		  
      rectangleX = (event.pageX - offset.left);
      rectangleY = (event.pageY - offset.top);
	  }
      rectangles.insert({
        x: rectangleX,
        y: rectangleY,
        c: strokeColor,

      }); // end of circles.insert()
      rectangleX = (event.pageX - offset.left);
      rectangleY = (event.pageY - offset.top);


}

Template.canvas.events({
  'click': function (event) {
	  if(option == 0){
		  markPoint();
	  }
  },
  'mousedown': function (event) {
    Session.set('draw', true);
	if(option == 1){
		  markCircle();
	  } else if(option == 2){
		  markRectangle();
	  }
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
  },
  'mousemove': function (event) {
	if (Session.get('draw')) {
      if(option == 0){
			markPoint();
	  }
	}
    
  }
});
