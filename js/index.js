document.addEventListener('DOMContentLoaded', function(){

  var selectAll = function(s){
    return document.querySelectorAll(s);
  }

  var droppables = selectAll('.drag');

  Draggable.create(".drag", {
    bounds: 'main',
    edgeResistance:0.65,
    onPress: function(){
      this.startX = this.x,
      this.startY = this.y,
      this.offsetTop = this.startY - this.target.offsetTop;
      this.offsetLeft = this.startX - this.target.offsetLeft;
    },
    onDragEnd: function(){
      var dragThing = this;
      var i = droppables.length;

      while(--i > -1){
        if(this.hitTest(droppables[i], '10%')) {
          var result = onDrop(this.target, droppables[i], dragThing);

          if(result == 'correct'){
            totalHits++;
            if(totalHits == totalItems){
              winGame();
            }
          }
          break;
        } else {
          TweenMax.to(dragThing.target, .5, {
            x: dragThing.startX,
            y: dragThing.startY
          })
        }
      }
    }
  });
});

function onDrop(dragged, dropped, dragObj) {
  if((dragged.id + "Drop") == dropped.id){
    TweenMax.to(dragged, .5, {
      y: dragObj.offsetTop + dropped.offsetTop + addDimension('y'),
      x: dragObj.offsetLeft + dropped.offsetLeft + addDimension('x'),
      onComplete: function(){
        TweenMax.to(dragged, .5, {
          delay: .5,
          opacity: 0,
          visibility: "hidden"
        });
        TweenMax.to(dropped.childNodes[1], .5, {
          delay: .5,
          onStart: function(){
            for(var i = 0; i < dropped.childNodes[1].childNodes.length; i++){
              TweenMax.to(dropped.childNodes[1].childNodes[i], .5, { fill: '#C65C3B' });
            }
          }
        });

        TweenMax.to(".correct", 1, {
          opacity: .7,
          top: "40%",
          ease: Elastic.easeOut,
          onComplete: function(){
            TweenMax.to(".correct", .5, {
              delay: .5,
              opacity: 0,
              top: "0"
            })
          }
        });
      }
    });

    return 'correct';
  } else {
    TweenMax.to(dragged, .5, {
      x: dragObj.startX,
      y: dragObj.startY
    });
    TweenMax.to(".wrong", 1, {
      opacity: .7,
      top: "40%",
      ease: Bounce.easeOut,
      onComplete: function(){
        TweenMax.to(".wrong", .5, {
          delay: .5,
          opacity: 0,
          top: "0"
        })
      }
    });
  }
}

function winGame(){
  TweenMax.to('.boxContainer', .5, {
    backgroundColor: '#27ae60'
  });
  TweenMax.to('.winner', .5, {
    opacity: 1,
    marginTop: "-10px"
  });
  TweenMax.staggerTo('.svgColor', .5, {
    delay: 2,
    fill: "#2ecc71"
  }, .2)
}

function addDimension(cardinal){

  if(cardinal == 'y'){
    return (window.screen.width <= 480) ? 0 : 20;
  } else {
    return (window.screen.width <= 480) ? -2 : 10;
  }
}
