var form = document.getElementById('noteform');
var noteList = document.getElementById('note-list');
var filter = document.getElementById('filter');
var editbutton = document.getElementsByClassName("edit");



filter.addEventListener('keyup', filterNotes);

form.addEventListener('submit', addNote);

form.addEventListener('submit', cleartextbox);

function cleartextbox(){
    document.getElementById('note_heading').value = "";
    document.getElementById('note_content').value ="";
}

noteList.addEventListener('click', deleteNote);

noteList.addEventListener('click', viewNote);

filter.addEventListener('focus', remove_otherthings);

filter.addEventListener('blur', backtonormal);

noteList.addEventListener('click', editNote);

//check if item was removed and ul length is 0
noteList.addEventListener('click', add404);

form.addEventListener('submit', remove404);


function blureditbtn(e){

    var li = this.parentElement;
    if(e.target !== document.activeElement && (e.target != li.firstChild || e.target != li.lastElementChild)){

    //li.firstChild.contentEditable = "false";
    //li.lastElementChild.contentEditable = "false";
    e.target.style.backgroundColor = 'lightgrey';
    e.target.style.color = 'green';

    e.target.setAttribute('listener', 'true');
    }
}


function add404(e){
    if(e.target.classList.contains('delete')){
        if(noteList.getElementsByTagName('li').length == 0){
            document.getElementById('nothing_here').style.display = 'block';
        };
    }
}

function remove404(e){
    if(noteList.getElementsByTagName('li').length != 0){
        document.getElementById('nothing_here').style.display = 'none';
    };
}


function remove_otherthings(){
    document.getElementById('add_notes').style.display = "none";
}

function backtonormal(){

    document.getElementById('add_notes').style.display = "block";
    filter.value = '';

    var arrayOfElements=document.getElementsByClassName("note");
    var lengthOfArray=arrayOfElements.length;

    for (var i=0; i<lengthOfArray;i++){
    arrayOfElements[i].style.display='block';

    filter.blur();

}

}


function addNote(e){

    e.preventDefault();
    var noteheading = document.getElementById('note_heading').value;
    var notecontent = document.getElementById('note_content').value;

    if(noteheading == "" && notecontent ==""){
        document.getElementById('note_submit').classList.remove("hasactive");
        document.getElementById('note_submit').blur();
        return;
    }
    if(noteheading == ""){
        noteheading = "Untitled";
    }
    
    //created li
    var newli = document.createElement('li');
    //added 'note' class to it
    newli.className = 'note';
    //made a division for header
    var newheader = document.createElement('div');
    newheader.setAttribute("contentEditable", "false");
    //Added class to it
    newheader.className = 'noteheader d-inline-block';
    newheader.appendChild(document.createTextNode(noteheading));
    //Appended it to new note li
    newli.appendChild(newheader);

   


    //Create delete btn
    var delbtn = document.createElement('button');
    delbtn.className = 'btn btn-danger btn-sm float-right delete d-inline-block';
    delbtn.appendChild(document.createTextNode('X'));

    newli.appendChild(delbtn);


     //Create edit button
     var editbtn = document.createElement('button');
     editbtn.className = 'btn btn-sm float-right edit d-inline-block';
     editbtn.innerHTML = '<i class="fas fa-edit"></i>';

     editbtn.addEventListener('blur', blureditbtn);
 
     newli.appendChild(editbtn);


     //Add month and date
     var d = new Date();
     var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var m = month[d.getMonth()];
     var newdatediv = document.createElement('div');

     var today = d.getDate();
    newdatediv.className = 'date';

    newdatediv.innerHTML = m + " " + today;

    newli.appendChild(newdatediv);

    //made a division for content
    var newcontent = document.createElement('div');
    //Added class to it
    newcontent.className = 'note-content';
    newcontent.setAttribute("contentEditable", "false");
    //appended it to new li
    newli.appendChild(newcontent);
    newcontent.appendChild(document.createTextNode(notecontent));

    //Ive used prepend because I want the new notes to appear first
    noteList.prepend(newli);
    
}


function deleteNote(e){
    if(e.target.classList.contains('delete')){
        var li = e.target.parentElement;
        noteList.removeChild(li);
    }
}

function editNote(e){
    if(e.target.classList.contains('edit')){
        var li = e.target.parentElement;               
        if(li.firstChild.contentEditable == "true"){

            
            li.firstChild.contentEditable = "false";
            li.lastElementChild.contentEditable = "false";
            e.target.style.backgroundColor = 'lightgrey';
            e.target.style.color = 'green';
        }else{
            li.firstChild.contentEditable = "true";
            li.lastElementChild.contentEditable = "true";
            e.target.style.backgroundColor = 'green';
            e.target.style.color = 'white';
        }
        
    }
    if(e.target.classList.contains('fa-edit')){

        
        var li = e.target.parentElement.parentElement;      

        if(li.firstChild.contentEditable == "true"){

            
            li.firstChild.contentEditable = "false";
            li.lastElementChild.contentEditable = "false";
            e.target.parentElement.style.backgroundColor = 'lightgrey';
            e.target.parentElement.style.color = 'green';
        }else{
            li.firstChild.contentEditable = "true";
            li.lastElementChild.contentEditable = "true";
            e.target.parentElement.style.backgroundColor = 'green';
            e.target.parentElement.style.color = 'white';
        }
    }
}

function filterNotes(e){

    if(e.keyCode === 13){
        
        backtonormal();
        
        return;
        
    }

    var text = e.target.value.toLowerCase();
    
    var notes = noteList.getElementsByTagName('li');

    let count = 0;

    Array.from(notes).forEach(function(note){

        //This gets the header(firstchild) of the note and converts the text to lowercase.
        var notename = note.firstChild.firstChild.textContent.toLowerCase();
        if(notename.indexOf(text) != -1){
            note.style.display = 'block';
            count++;
        }else{
            note.style.display = 'none';
            
        }

        if(count===0){
            document.getElementById('nothing_here').style.display = 'block';
        }else{
            document.getElementById('nothing_here').style.display = 'none';
        }
        
    })
}


function viewNote(e){


    
    
    if(e.target.classList.contains('note')){

        
        if(e.target.firstChild.contentEditable=="false"){
            if(e.target.lastElementChild.style.maxHeight == '0rem'){

                e.target.lastElementChild.style.maxHeight = "8rem";

            }else{
            
                e.target.lastElementChild.style.maxHeight = "0rem";

            }          
        }  
    }

    if(e.target.classList.contains('noteheader')){

        console.log(e.target.contentEditable);

        if(e.target.contentEditable == "false"){

            if(e.target.parentElement.lastElementChild.style.maxHeight == "0rem"){


                e.target.parentElement.lastElementChild.style.maxHeight = "8rem";
    
                
            }else{
    
                e.target.parentElement.lastElementChild.style.maxHeight = "0rem";
            }
            
        }  
    }

    if(e.target.classList.contains('note')){

        
        if(e.target.firstChild.contentEditable=="false"){
            if(e.target.lastElementChild.style.maxHeight == '0rem'){

                e.target.lastElementChild.style.maxHeight = "8rem";

            }else{
            
                e.target.lastElementChild.style.maxHeight = "0rem";

            }          
        }  
    }

    if(e.target.classList.contains('date')){

        if(e.target.contentEditable == "false"){

            if(e.target.style.maxHeight == "0rem"){
                e.target.style.maxHeight = "8rem";               
            }else{
                e.target.style.maxHeight = "0rem"; 
            }
        }
    }
    
}