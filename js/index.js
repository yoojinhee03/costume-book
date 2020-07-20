//HTML 이 모두 로드되고, DOM 트리가 완성되었지만
//외부 리소스(img etc) 가 아직 로드되어지지 않았을 때 DOMContentLoaded 사용


document.addEventListener('DOMContentLoaded', function(){

  //class가 drag인 요소 (이미지) 반환
  var selectAll = function(s){
    return document.querySelectorAll(s);
  }

  var droppables = selectAll('.drop');
  // alert(droppables[0].src);
  
  Draggable.create(".drag", {
    // bounds: 'body',//드래그 범위

    edgeResistance:0.65,
    onPress: function(){
      console.log("this.x"+this.x)
      console.log("this.x"+this.x)

      console.log(this.target.parentElement);
      // alert(this.target.parentElement);

      //itemReset();
      //this.target.className="dragging";
      if(this.x!=0&&this.y!=0){
        console.log(this.target.id);
        document.getElementById(this.target.id+"Img").src="";
        this.target.style.width="100%";
        this.target.style.height="100%";
      }

      if(this.target.className=="complete"+this.target.id){ 
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
      // this.target.parentNode.classList.add("complete");
      this.target.className="drag";
      var dragThing = this;
      var i = droppables.length;

      let item=document.getElementsByClassName("item-"+this.target.id);
      
      

      while(--i > -1){
        if(this.hitTest(droppables[i], '10%')) {
          var result = onDrop(this.target, droppables[i], dragThing);
          if(result == 'correct'){
            console.log(dragThing);
            //totalHits++;
            // if(totalHits == totalItems){
               //winGame();
            // }
            for(let i=0; i<item.length; i++){
              console.log("change"+item[i].children[0].className);
              if(item[i].children[0].className=="complete"+this.target.id){
                change(item[i].children[0]);
                break;
              }
            }
            this.target.className="complete"+this.target.id;
            this.target.style.width =document.getElementById(this.target.id+"Drop").style.width;
            this.target.style.height="auto";
            this.target.parentElement.style.overflow="hidden";
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

function change(prevItem){
  document.getElementById(prevItem.id+"Img").src="";
  console.log(prevItem);
  prevItem.parentElement.style.overflow="visible";
  prevItem.className="drag";
  prevItem.style.width="100%";
  prevItem.style.height="100%";
  TweenMax.to(prevItem, .5, {
    x: 0,
    y: 0
  })
}
function onDrop(dragged, dropped, dragObj) {//.drag , .drop , 
  if((dragged.id + "Drop") == dropped.id){
   // dragged.className="complete";
    console.log("dragObj x:"+dragObj.offsetLeft+"dragObj y : "+dragObj.offsetTop);
    console.log("x:"+dropped.offsetLeft+"y : "+dropped.offsetTop);
    var model=document.getElementsByClassName("model")[0];

    TweenMax.to(dragged, .5, {
      //y: dragObj.offsetTop + dropped.offsetTop + addDimension('y'),
     // x: dragObj.offsetLeft + dropped.offsetLeft + addDimension('x'),
      y: dragObj.offsetTop+dropped.offsetTop+model.offsetTop,//38 : container의 margin값 
      x: dragObj.offsetLeft+dropped.offsetLeft+model.offsetLeft,
      onComplete: function(){
        // alert(dragged.id);
        var dropImg=document.getElementById(dragged.id+"Img");
        var dragImg=document.getElementsByClassName(dragged.id+"Drag");
        // for(let i=0; i<dragImg.length; i++){
        //     dragImg[i].index=i;
        //     dragImg[i].onmouseover = function(){
        //     alert(dragImg[i].index); // 내 자신의 index 번호를 뽑고 싶습니다 ㅜㅜ
        //     // break;
        //   }
        // }
        // dragged.
        // dragImg.classList.add()
        dropImg.src=document.getElementsByClassName("complete"+dragged.id)[0].src;
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
