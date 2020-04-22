var submitBtn = document.getElementById("subBtn");
var arrOfObjects = [];
var bookName = document.getElementById("BMN");
var bookLink = document.getElementById("URL");

submitBtn.onclick=Submit;

loadData();
function loadData() {
    if (localStorage.getItem("bookmarkLinks")) {
        var loadedData = localStorage.getItem("bookmarkLinks");
        loadedData = JSON.parse(loadedData);
        for(let i=0; i<loadedData.length; i++){
            arrOfObjects.push(loadedData[i]);
        }
        console.log(arrOfObjects);
        display();
    }
}

function Search(text){
    var html="";
    for(let i=0; i<arrOfObjects.length; i++){
        if(arrOfObjects[i].name.toLowerCase().includes(text.toLowerCase()) ){
            html += `<div class="data p-3">
                <h2>`+ arrOfObjects[i].name +`</h2>
                <div>
                <a href="`+ arrOfObjects[i].link +`" target=blank class="btn btn-primary mr-2" >Visit</a>
                <button onclick='deleteLink(`+i+`)' class='btn btn-danger mr-2'>Delete</button>
                <button onclick='edit(`+i+`)' class='btn btn-warning mr-2'>Edit</button>
                <button onclick='copyLink(`+i+`)' class='btn btn-info'><i class='fas fa-copy '></i></button>
                </div>
                </div> <br/>`
        }
    }

    document.getElementById("addedData").innerHTML = html;

}

function checkName() {
    var value = bookName.value;
    value = value.trim();
    if (value == "" || value == null || value == undefined) return false;
    else return true;
}
function checkLink() {
    var value = bookLink.value;
    value = value.trim();
    if (value == "" || value == null || value == undefined) return false;
    else return true;
}

function addNew(name, link) {
    var obj =
    {
        name: name,
        link: link
    }
    arrOfObjects.push(obj);
    alert(name + " added successfully.");
    localStorage.setItem("bookmarkLinks", JSON.stringify(arrOfObjects));
}

function deleteLink(index){
    arrOfObjects.splice(index,1);
    localStorage.setItem( "bookmarkLinks" , JSON.stringify(arrOfObjects) );
    display();
    alert("Successfully deleted")
}

function confirmBtn(index){
    var nameElem = document.getElementById("newName").value;
    var linkElem = document.getElementById("newLink").value;
    arrOfObjects.splice(index,1,{name: nameElem, link: linkElem});
    localStorage.setItem("bookmarkLinks", JSON.stringify(arrOfObjects) );
    display();
}

function edit(index){
    var htmlInUpdate= `<input class="form-control mr-3" type="text" name="NewName" id="newName" 
                        placeholder="New Name" value="`+arrOfObjects[index].name+`" />

                        <input class="form-control mr-3" type="text" name="NewLink" id="newLink" 
                        placeholder="New Link" value="`+arrOfObjects[index].link+`" />
                        <button onclick="confirmBtn(`+index+`)" class="btn btn-warning">Confirm</button>`;
    
    var elem = document.getElementsByClassName("data")[index];
    console.log(elem);
    elem.innerHTML = htmlInUpdate;

}

function copyLink(index){
    var elem = document.createElement("textarea");
    elem.value = arrOfObjects[index].link;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);

    var x = document.getElementById("messageBox");
    x.innerHTML = arrOfObjects[index].name + "'s Link has been copied to Clipboard";
    x.className = "show";
    setTimeout(function(){x.className = x.className.replace("show","")},4000)
}

function display(){
    var location = document.getElementById("addedData");
    html = "";
    for(let i=0; i<arrOfObjects.length; i++){
        html += `<div class="data p-3">
                <h2>`+ arrOfObjects[i].name +`</h2>
                <div>
                <a href="`+ arrOfObjects[i].link +`" target=blank class="btn btn-primary mr-2" >Visit</a>
                <button onclick='deleteLink(`+i+`)' class='btn btn-danger mr-2'>Delete</button>
                <button onclick='edit(`+i+`)' class='btn btn-warning mr-2'>Edit</button>
                <button onclick='copyLink(`+i+`)' class='btn btn-info'><i class='fas fa-copy '></i></button>
                </div>
                </div> <br/>`
    }
    location.innerHTML = html;
}

function reset(){
    var inputs = document.getElementsByTagName("input");
    for(let i=0; i<inputs.length; i++){
        inputs[i].value = "";
    }
}

function Submit() {
    var warningAtName = document.getElementById("pForBMN");
    var warningAtLink = document.getElementById("pForURL");
    warningAtName.style.display = "none";
    warningAtLink.style.display = "none";

    if (!checkName()) {
        warningAtName.innerHTML = "Please Check Name Field..";
        warningAtName.style.display = "block";
    }
    if (!checkLink()) {
        warningAtLink.innerHTML = "Please Check Link Field..";
        warningAtLink.style.display = "block";
    }
    if ((checkName()) && (checkLink())) {
        var name = bookName.value;
        var link = bookLink.value;
        addNew(name, link);
        display();
        reset();
    }
}