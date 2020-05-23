var comments =[
    {
        id:1,
        text: "comment1",
        child: {
            id: 11,
            parentId: 1,
            text: "childComment1",
            child:{
                id: 111,
                parentId: 11,
                text: "grand child comment1",
                child:{
                    id:1111,
                    parentId: 111,
                    text:"grand grand child comment1"
                }
            }
        }
    },
    {
        id:2,
        text: "comment2",
    }
];

function renderWithSpacing(div, comment){
    if(comment.parentId){
        div.style.padding = "9px";
        document.getElementById(comment.parentId).appendChild(div);
    }else{
        document.getElementById('commentRenderer').appendChild(div);
    }
    div.addEventListener('click', function(e){
        // e.preventdefault();
        if(this.children && this.children.length>0){
            if(this.children[0].style.display === ""){
                this.children[0].style.display = "none";
            }else{
                this.children[0].style.display = "";
            }
            
        }
        e.stopPropagation();
    })
}

function renderComments(comments) {
    if(!comments.child){
      var div = document.createElement('div');
      div.innerHTML = comments.text;
      div.className = "myClass";
      renderWithSpacing(div, comments);
    }else{
        var div = document.createElement('div');
        div.id = comments.id;
        div.innerHTML = comments.text;
        renderWithSpacing(div, comments);
        renderComments(comments.child);
    }

}
comments.map(i=>{
   renderComments(i);
})

window.onload = function(){
    var list = document.getElementsByClassName("myClass");
    for (var i = 0; i < list.length; i++) {
        list[i].onClick = function(){
            console.log(this + "clicked");
        }
    }
}