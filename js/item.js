
function changeItem(id,idx){
	 let item=document.getElementsByClassName("row")[idx].children;
     let items = document.getElementById("item-container").children;//2
     let complete = document.getElementsByClassName("complete");//2

     for(let i = 0; i < item.length; i++){
    	item[i].style.display="inline-block";
     }
     for(let i=0; i<items.length; i++){//2
    	if(i==idx)continue;
    	for(let j=0; j<items[i].children.length; j++){
    		items[i].children[j].style.display="none";
    	}
     }
    // for(let i=0; i<complete.length; i++){
    // 	complete[i].style.display="inline-block";
    // }
}

function changeMakeUp(item){
    console.log(item);
    var imageSrc=item.src.split("icon/");
    var id=item.id;
    document.getElementById(id+"Img").src="images/makeUp/"+id+"/"+imageSrc[1];
    // console.log(imageSrc);
    // alert(item);
}