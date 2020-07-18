
function changeItem(id,idx){
	 let item=document.getElementsByClassName("row")[idx].children;
     let items = document.getElementById("item-container").children;//2
     // console.log(totalItem);

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
