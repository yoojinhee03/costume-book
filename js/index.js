//HTML 이 모두 로드되고, DOM 트리가 완성되었지만
//외부 리소스(img etc) 가 아직 로드되어지지 않았을 때 DOMContentLoaded 사용
document.addEventListener('DOMContentLoaded', function(){

  //class가 drag인 요소 (이미지) 반환
  var selectAll = function(s){
    return document.querySelectorAll(s);
  }

  var droppables = selectAll('.drop');
  //alert(droppables[0].src);
   
  Draggable.create(".drag", {
    bounds: '.container',//드래그 범위

    edgeResistance:0.65,
    onPress: function(){
      console.log("this.x"+this.x)
      console.log("this.x"+this.x)
      //itemReset();
      //this.target.className="dragging";
      if(this.target.className=="complete"){ 
        this.enable();
      }
    	console.log("onPress");

      if(this.startX!=0&&this.startY!=0){
        this.startX = this.x,
        this.startY = this.y,
        this.offsetTop = this.startY - this.target.offsetTop;
        this.offsetLeft = this.startX - this.target.offsetLeft;
        //this.offsetLeft = 0;

        console.log(this.startX+","+this.startY+","+this.offsetTop+","+this.offsetLeft+",");
      }
    },
    onDragEnd: function(){
    	console.log("onDragEnd");
      //this.target.className="drag";
      var dragThing = this;
      var i = droppables.length;
      console.log(i);

      while(--i > -1){
        if(this.hitTest(droppables[i], '10%')) {
          var result = onDrop(this.target, droppables[i], dragThing);

          if(result == 'correct'){
            console.log("correct");
            //totalHits++;
            // if(totalHits == totalItems){
               //winGame();
            // }
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

function onDrop(dragged, dropped, dragObj) {//.drag , .drop , 
  if((dragged.id + "Drop") == dropped.id){
   dragged.className="complete";
    console.log("dragObj x:"+dragObj.offsetLeft+"dragObj y : "+dragObj.offsetTop);
    console.log("x:"+dropped.offsetLeft+"y : "+dropped.offsetTop);
    var model=document.getElementsByClassName("model")[0];

    TweenMax.to(dragged, .5, {
      //y: dragObj.offsetTop + dropped.offsetTop + addDimension('y'),
     // x: dragObj.offsetLeft + dropped.offsetLeft + addDimension('x'),
      y: dragObj.offsetTop+dropped.offsetTop+model.offsetTop,//38 : container의 margin값 
      x: dragObj.offsetLeft+dropped.offsetLeft+model.offsetLeft,
      onComplete: function(){
        //var dropImg=dropped.appendChild(document.createElement("img"));
        //dropImg.src="images/test.png";
        // TweenMax.to(dragged, .5, {
        //   delay: .5,
        //   opacity: 0,
        //   visibility: "hidden",
        // });
        // TweenMax.to(dropped.childNodes[1], .5, {
        //   delay: .5,
        //   onStart: function(){
        //      for(var i = 0; i < dropped.childNodes[1].childNodes.length; i++){
        //        TweenMax.to(dropped.childNodes[1].childNodes[i], .5, { fill: '#C65C3B' });
        //      }
        //   }
        // });

        // TweenMax.to(".correct", 1, {
        //   opacity: .7,
        //   top: "40%",
        //   ease: Elastic.easeOut,
        //   onComplete: function(){
        //     TweenMax.to(".correct", .5, {
        //       delay: .5,
        //       opacity: 0,
        //       top: "0"
        //     })
        //   }
        // });
      }
    });

    return 'correct';
  } else {
    TweenMax.to(dragged, .5, {
      x: dragObj.startX,
      y: dragObj.startY
    });
    // TweenMax.to(".wrong", 1, {
    //   opacity: .7,
    //   top: "40%",
    //   ease: Bounce.easeOut,
    //   onComplete: function(){
    //     TweenMax.to(".wrong", .5, {
    //       delay: .5,
    //       opacity: 0,
    //       top: "0"
    //     })
    //   }
    // });
  }
}
function itemReset(){
   // var item=document.getElementById("top");
   // item.style.transform="translate3d(0px, 0px, 0px)";
   // //alert(item.style.transform);
   // console.log(item.style.transform);
   // item.style.visibility="visible";
   // item.style.opacity="100";
   // item.className="drag";
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
