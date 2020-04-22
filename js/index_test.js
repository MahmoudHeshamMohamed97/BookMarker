var arrOfObjects = [];
function checkName(name)
{
    if( (name == undefined)  ||  (name == null)  ||  (name == "") ) return false;
    else return true;
}
function checkLink(name)
{
    if( (name == undefined)  ||  (name == null)  ||  (name == "") ) return false;
    else return true;
}
function deleteLink(index){
    arrOfObjects.splice(index,1);
    display(arrOfObjects);
}
function getNames(arr){
    var names = [];

    
    for(let i=0; i<arr.length; i++){
        var indexOfName = arr[i].indexOf("name: ");
        var indexOfLink = arr[i].indexOf(", link: ");
        var name="";
        // console.log(indexOfName);
        // console.log(indexOfLink);
        for(let j=indexOfName+6; j<indexOfLink; j++){
            name+=arr[i][j];
        }
        // console.log(name);
        names.push(name);
    }
    // console.log(names);
    return names;
}
function getLinks(arr){
    var links = [];
    
    for(let i=0; i<arr.length; i++){
        var indexOfLink = arr[i].indexOf("link: ");
        var indexOflast = arr[i].indexOf("}");
        var link="";
        for(let j=indexOfLink+6; j<indexOflast; j++){
            link+=arr[i][j];
        }
        links.push(link);
    }
    // console.log(links);
    return links;
}
function done(index){
    var name = document.getElementById("NewName").value;
    var link = document.getElementById("NewLink").value;
    arrOfObjects.splice(index,1);
    arrOfObjects.splice(index,0,"{name: "+name+", link: "+link+"}");
    display(arrOfObjects);
}
function edit(index){
    var html = "";
    var names = getNames(arrOfObjects);
    var name = names[index-1];
    // console.log(name);
    var links = getLinks(arrOfObjects);
    var link = links[index-1]; 
    // console.log(link);
    var elem = document.getElementById("idNum"+index);
    html =  "<input type='text' id='NewName' placeholder='New Bookmark Name' class='form-control mr-3' value="+name+" /> "
            +"<input type='text' id='NewLink' placeholder='New Bookmark Link' class='form-control mr-3' value="+link+" />"
            +"<button onclick='done("+(index-1)+")' class='btn btn-warning'>Done</button>";
    elem.innerHTML=html;
}
function copyLink(index){
    var names = getNames(arrOfObjects);
    var links = getLinks(arrOfObjects);
    var elem = document.createElement('textarea');
    elem.value= links[index];
    elem.setAttribute('readonly','');
    elem.style = {position : 'absolute',left: '-9999px'};
    document.body.appendChild(elem);
    elem.select();  
    document.execCommand('copy');
    document.body.removeChild(elem);
    // https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
    // alert("Link copied...")
    var x = document.getElementById("messageBox");
    x.innerHTML = names[index]+"'s Link Copied to Clipboard..";
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar
}
function display(arr){
    var html="";
    var names = getNames(arr);
    var links = getLinks(arr);

    for(let i=0; i<arr.length; i++){
        html += "<div class='data p-4' id='idNum"+(i+1)+"'>" 
                    +"<h2>"+names[i]+"</h2>"
                    +"<div>"
                    +"<a href='"+links[i]+"' target='blank' class='btn btn-primary mr-2'>Visit</a>"
                    +"<button onclick='deleteLink("+i+")' class='btn btn-danger mr-2'>Delete</button>"
                    +"<button onclick='edit("+(i+1)+")' class='btn btn-warning mr-2'>Edit</button>"
                    +"<button onclick='copyLink("+i+")' class='btn btn-info'><i class='fas fa-copy '></i></button>"
                    +"</div>"
              + "</div> </br>";
    }

    document.getElementById("addedData").innerHTML=html;
}
function Submit(){
    var name = document.getElementById("BMN").value;
    var link = document.getElementById("URL").value;
    
    if( !checkName(name) ){
        document.getElementById("pForBMN").innerHTML="Check data Entered....";
    }
    if( !checkLink(link) ){
        document.getElementById("pForURL").innerHTML="Check data Entered....";
    }
    else{
        arrOfObjects.push("{name: "+name+", link: "+link+"}");
        alert(arrOfObjects.length);
        console.log(arrOfObjects);
        display(arrOfObjects);
    }
}
