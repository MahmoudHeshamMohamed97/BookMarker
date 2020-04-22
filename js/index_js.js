var p1 = document.getElementById("pForBMN");
var p2 = document.getElementById("pForURL");
var myData = [];
var names=[] , links=[]; 

    function checkName(name){
        if (name == "" )    return false;
        else               return true;
    }
    function checkLink(link){
        if (link == "" )    return false;
        else               return true;
    }

    function Delete(index){
        names.splice(index,1);
        links.splice(index,1);
        document.getElementById("addedData").innerHTML=addNewSection(names,links);
    }

    function addNewSection(names,links){
        var html="";
        for(let i=0; i<names.length;i++){
            html += "<div class='data p-4'> <div><h2>" + names[i] + "</h2></div>" +
            "<div><a class='btn btn-primary mr-2' href='"+links[i]+"' target='blank' >Visit</a>"+
            "<a onclick='Delete("+i+")' class='btn btn-danger'>Delete</a> </div> </div> </br>" ;
        }
        return html;
    }

    function Submit(){
        p1.innerHTML=""; 
        p2.innerHTML="";
        var BmName = document.getElementById("BMN").value;
        var BmLink = document.getElementById("URL").value;
        if(! checkName(BmName) ){
            p1.innerHTML="Check data you Entered.";
        }
        if(! checkLink(BmLink) ){
            p2.innerHTML="Check data you Entered.";
        }
        else{
            alert("Successfully added");
            // myData.push("name : '" +BmName+"' , link : '"+BmLink+"' ");
            // alert(myData.length);
            // console.log(myData);
            names.push(BmName);
            links.push(BmLink);
            document.getElementById("addedData").innerHTML=addNewSection(names,links);
            alert(names.length);
        }
    }