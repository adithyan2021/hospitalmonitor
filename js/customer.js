import { getDatabase,ref,set,get,child,push,update,remove, query, limitToLast} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
var app ;
var db ;
var loader=100;
var checkvalue;
//Never touch this ,if you make it blank or notinitiallaised ,there is chance to replace entaire ticket unexpectedley
//start
var popupInUpdateMode=false;
var selectedUuid="-1";
var selectedUuidfordoc="-1";
var selectedAssignee="NA";
var selectedAssigneedoc="NA";
var currentStatus="Pending";
//end
/////////////////////
var noSorting=true;
var sortingKey="";
////////////////////
var noSorting_status=true;
var sortingKey_status="";
////////////////////
// document.getElementById("m1-c-new2").addEventListener('click',addticket);
// var mod = document.getElementById("m1-c-new2");


var modal = document.getElementById("selectingpop"); 
///todo
// document.getElementById("").addEventListener('click',selectanempp);

////////////////////////////////////////
export function selectanempp(){
  document.getElementById("tic2dis").style.display="none";
 //alert("kooooo");
  // hideDialoge();
 }
export function addingnewtic(){
  document.getElementById("newaddticdis").style.display="block";

  // hideDialoge();
 
   }
   export function closetic1(){
    document.getElementById("newaddticdis").style.display="none";
   //alert("kooooo");
   hideDialogeTic();
   
     }
     export function closemse(){
      document.getElementById("tic2dis").style.display="none";
     //alert("kooooo");
      // hideDialoge();
     
       }
export function getdate() {
  var n = Date.now();
  var date = new Date(n);
  var k= (date.getMonth()+1);
  if (/^\d$/.test(k))  {
    var b =(date.getFullYear()+
          "-"+"0"+(date.getMonth()+1)+
          "-"+date.getDate());
          // date.getDate()
          // date.getFullYear()

  
  }else{
  var b =(date.getFullYear()+
          "-"+(date.getMonth()+1)+
          "-"+date.getDate());
  }
  // alert(b);
  // document.getElementById("created-date").innerHTML = n;
  document.getElementById("created-date").value = b;

}
// if(checkvalue=="sales"||checkvalue=="service"){
//   document.getElementById("select-btnTic").disabled = true;
// }else{
//   document.getElementById("select-btnTic").disabled = false;
// }
export function selectInTic_1(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="block";
    document.getElementById("myticket_prdt").style.display="none";
    document.getElementById("myticket_staff").style.display="none";
    document.getElementById("myticket_number").style.display="none";
    document.getElementById("inTic_5").style.display="none";
    document.getElementById("myticket_InAddress").style.display="none";
}
export function selectInTic_2(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="none";
    document.getElementById("myticket_prdt").style.display="block";
    document.getElementById("myticket_staff").style.display="none";
    document.getElementById("myticket_number").style.display="none";
    document.getElementById("inTic_5").style.display="none";
    document.getElementById("myticket_InAddress").style.display="none";
}
export function selectInTic_3(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="none";
    document.getElementById("myticket_prdt").style.display="none";
    document.getElementById("myticket_staff").style.display="block";
    document.getElementById("myticket_number").style.display="none";
    document.getElementById("inTic_5").style.display="none";
    document.getElementById("myticket_InAddress").style.display="none";
}
export function selectInTic_4(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="none";
    document.getElementById("myticket_prdt").style.display="none";
    document.getElementById("myticket_staff").style.display="none";
    document.getElementById("myticket_number").style.display="block"
    document.getElementById("inTic_5").style.display="none";
    document.getElementById("myticket_InAddress").style.display="none";
}
export function selectInTic_5(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="none";
    document.getElementById("myticket_prdt").style.display="none";
    document.getElementById("myticket_staff").style.display="none";
    document.getElementById("myticket_number").style.display="none";
    document.getElementById("inTic_5").style.display="block";
    document.getElementById("myticket_InAddress").style.display="none";
}
export function selectInTic_6(){
  // clearing_inp();
    document.getElementById("myticket_search").style.display="none";
    document.getElementById("myticket_prdt").style.display="none";
    document.getElementById("myticket_staff").style.display="none";
    document.getElementById("myticket_number").style.display="none";
    document.getElementById("inTic_5").style.display="none";
    document.getElementById("myticket_InAddress").style.display="block";
}
export function loader_Tic(){
     loader=loader+100;
     $("#customer-table").find("tr:gt(0)").remove();
     loadingFull();
}
// export function makeFullTic(){
//   loader=loader*10000;
//      tableFeederTic();
// }

// function addticket(){
//   var mod = document.getElementById("m1-c-new2");
//     mod.style.display = "block";
  
//     document.getElementById("getdate").style.display="block";

// }
/////todo
function selectanemp(){
  document.getElementById("tic2dis").style.display="block";
    // spa.onclick = function() {
    //   modal.style.display = ""; 
    // }

}
export function ticket(firebase,database,noSorting,sortingKey,checkmail){
    app=firebase;
    db=database;
    var check_element=checkmail;

    const dbRef = ref(db);
    get(child(dbRef, `user`)).then((snapshot) => {    
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(`${childKey}`);
        if (snapshot.exists()) {
          /////for time
          selectemploytable(childData.name,childData.emp_code,childData.uuid);
          console.log(snapshot.val());
          selectDoctable(childData.name,childData.emp_code,childData.uuid);
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
        
        
      });    
    }).catch((error) => {
      console.error(error);
    });
    tableFeederTic(check_element);


}


export function submitButtonCallBackTic(){
  
    console.log("working.....");
    // var mod = document.getElementById("myModalforticket");
    var name=  document.getElementById("validationCustom01Tic");
    var phone=  document.getElementById("phoneTic");
    var query=  document.getElementById("complaint");
    var remark=  document.getElementById("remark");
    var place=  document.getElementById("adress");
    var exdate=  document.getElementById("ex-date");
    var created=  document.getElementById("created-date");
    var selectedOption = selectTIc_pri.options[selectTIc_pri.selectedIndex];
  
    var prdt=  document.getElementById("ty-product");
    // var selectedStatus = selected.options[selected.selectedIndex];
    var phonelength=phone.value.length;
    var assign=  document.getElementById("asignee");
    var assigndoc=  document.getElementById("asigndoc");
    var location=  document.getElementById("locationTic");
 

    var valuesAreCorrect=true;

    if (created.value=="F"&&name.value==""&&assign.value==""&&phone.value==""&&exdate.value==""&&query.value==""&&place.value==""&&prdt.value=="") {      
      alert("please fill all");    
    }else{
      
      if(isNaN(phone.value)&&isNaN(created.value)){
        valuesAreCorrect=false;
        alert("please fill valid phone number"); 
      }else if((phonelength<10)){
        valuesAreCorrect=false;
        alert("please fill valid phone number"); 
      }else if((phonelength>10)){
        valuesAreCorrect=false;
        alert("please fill valid phone number"); 
      }

      if(valuesAreCorrect){

        if(!popupInUpdateMode){
      
            var empRef=push(ref(db,'ticket'),{
                custome_name:name.value,
                address: place.value,
                assignee : "NA",
                assigndoc : "NA",
                expected_date:exdate.value,
                created_date:created.value,
                phone_no:phone.value,
                location:location.value,
                priority:selectedOption.value,
                query:query.value,
                typeof_product_type:prdt.value,
                status:"Pending",
                created:"admin",
                remark:remark.value,
                time_stamp:Date.now()
              });
          addToDataTableTic(name.value,phone.value,created.value,place.value,selectedOption.value,query.value,remark.value,prdt.value,"Pending","NA","NA",location.value,exdate.value,empRef.key);
          hideDialogeTic();
        }else{
            
            var empRef=update(ref(db,'ticket/'+selectedUuid),{
              custome_name:name.value,
              created_date:created.value,
             
              address: place.value,
              expected_date:exdate.value,
              phone_no:phone.value,
              location:location.value,
              priority:selectedOption.value,
              query:query.value,
              remark:remark.value,
              typeof_product_type:prdt.value,
              
            });
           
            addToDataTableTic(name.value,phone.value,created.value,place.value,selectedOption.value,query.value,remark.value,prdt.value,currentStatus,selectedAssignee,selectedDoc,location.value,exdate.value,selectedUuid);


            //Never touch this ,need allways last
            //start
            popupInUpdateMode=false;
            selectedUuid="-1";
            selectedAssignee="NA";
            selectedDoc="NA";
            currentStatus="Pending";
            //end
          }
            hideDialogeTic();
      }
    }
};
//////////////////////////////////////
// /////for time
function selectemploytable(name,empcode,uuid){
  
  var table = document.getElementById("myTable");
 
  var row = table.insertRow(table.length);
  var cell1 = row.insertCell(0);

  var cell3 = row.insertCell(1);
  
  cell1.innerHTML = name;

  cell3.innerHTML = empcode;

  row.onclick=function (ev) {
    console.log("asgaaaaaaaarddddddd");
    document.getElementById("tic2dis").style.display="none";
    assingTotableemploy(name,empcode,uuid);
    
  };
  
  
 
}
function selectDoctable(name,empcode,uuid){
  
  var table = document.getElementById("myTable");
 
  var row = table.insertRow(table.length);
  var cell1 = row.insertCell(0);

  var cell3 = row.insertCell(1);
  
  cell1.innerHTML = name;

  cell3.innerHTML = empcode;

  row.onclick=function (ev) {
    console.log("asgaaaaaaaarddddddd");
    document.getElementById("tic2dis").style.display="none";
    assingTotableemployDoc(name,empcode,uuid);
    
  };
  
  
 
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////                                                                         emp
///////////////////selectingemploy///////////
////////////////////////////////////////////
 /////for time
function assingTotableemploy(name,empcode,uuid){
   document.getElementById("Ticselect_searchCode").value=empcode;
   var row = document.getElementById(selectedUuid);
   var but = document.getElementById(selectedUuid+"emp-select");
   var empRef=update(ref(db,'ticket/'+selectedUuid),{
    assignee : uuid,
  });
  set(ref(db,'ticket_inbox/'+uuid+"/"+selectedUuid),Date.now());

  but.innerHTML=name;
 
    selectedUuid="-1";
    selectedAssignee="NA";

  var modal = document.getElementById("m1-o-new3");
  modal.style.display = "none";  
}
///////////////////////////////////////////////
function assingTotableemployDoc(name,empcode,uuid){
  document.getElementById("Ticselect_searchCode").value=empcode;
  var row = document.getElementById(selectedUuidfordoc);
  var but = document.getElementById(selectedUuidfordoc+"emp-selectdoc");
  but.innerHTML=name;
  var empRef=update(ref(db,'ticket'),{
   assignee :name,
 });
 set(ref(db,'ticket_inbox/'+uuid+"/"+selectedUuidfordoc),Date.now());

 but.innerHTML=name;

 selectedUuidfordoc="-1";
 selectedAssigneedoc="NA";

 var modal = document.getElementById("m1-o-new3");
 modal.style.display = "none";  
}
///////////////////////////////////////////////



///////////////////////////////////
export function addToDataTableTic(name,phone,created,place,selectedOption,query,remark,prdt,status,assignee,assigndoc,location,exdate,uuid){
  console.log("------------"+name); 
  var table = document.getElementById("customer-table");
  var row = document.getElementById(uuid);
  if(row==null){
    row=table.insertRow(1);
    row.id=uuid;
  }else{
    row.innerHTML="";
  }
  

  var cell1 = row.insertCell(0);
  
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
 var cell6a = row.insertCell(6);
  var cell7 = row.insertCell(7);
  var cell7a= row.insertCell(8);
  var cell8 = row.insertCell(9);
  var cell9 = row.insertCell(10);
  var cell10 = row.insertCell(11);
  var cell11a=row.insertCell(12);
  // var cell11 = row.insertCell(13);
  var cell12 = row.insertCell(13);
  var cell13 = row.insertCell(14);
  cell1.innerHTML = name;
  cell2.innerHTML = phone;
  cell3.innerHTML = created;
  cell4.innerHTML = place;
  cell5.innerHTML = selectedOption;
  cell6.innerHTML = query;
  cell6a.innerHTML = remark;
  cell7.innerHTML = prdt;
  cell7a.innerHTML = '<select id="'+uuid+'select-status">'+
  
  '<option value="Pending" '+(status=='Pending'?'selected="selected"':'')+'>Pending</option>'+
  '<option value="Ongoing" '+(status=='Ongoing'?'selected="selected"':'')+'>Ongoing</option>'+
  '<option value="Hold" '+(status=='Hold'?'selected="selected"':'')+'>Hold</option>'+
  '<option value="Completed" '+(status=='Completed'?'selected="selected"':'')+'>Completed</option></select>';

  cell8.innerHTML = '<button onclick="openForm()" name="_but" id="'+uuid+'but0076">Update</button>';
  cell9.innerHTML = '<button name="_but"  id="'+uuid+'delete">Delete</button>';
  cell10.innerHTML = '<button name="_but"  id="'+uuid+'emp-select">'+assignee+'</button>';
  cell11a.innerHTML = '<button name="_but"  id="'+uuid+'emp-selectdoc">'+assigndoc+'</button>';
  cell12.innerHTML = location;
  cell13.innerHTML = exdate;
  document.getElementById(uuid+"but0076").addEventListener("click", function (ev) {
    console.log("efgsgerd......"+selectedOption);
    // updateTicket(uuid,name,phone,query,remark,place,location,exdate,created,selectedOption,prdt,assignee);
   //updateTicket(uuid,name,phone,created,exdate,place,selectedOption,query,prdt,assignee);
   updateTicket(uuid,name,phone,query,remark,place,exdate,location,created,selectedOption,prdt,assignee,assigndoc);
  }, true);
  document.getElementById(uuid+"delete").addEventListener("click", function (ev) {
    console.log("efgsgerd......"+uuid);
    deleteTicket(uuid);
  }, true);
  document.getElementById(uuid+"emp-select").addEventListener("click", function (ev) {
    console.log("efgsgerd......"+uuid);
    selectEmp(uuid);
  }, true);
  document.getElementById(uuid+"emp-selectdoc").addEventListener("click", function (ev) {
    console.log("efgsgerd......"+uuid);
    selectDocEmp(uuid);
  }, true);
  document.getElementById(uuid+"select-status").addEventListener("change", function (ev) {
    statuscompletion(uuid,status);
    closemse();
  }, true);
  // document.getElementById("myInput").addEventListener("click", myFunctionTic);
  // document.getElementById("myticket").addEventListener("click", myticket);

}
// document.getElementById(uuid+"emp-select").addEventListener("click", selectemploy);
////////////////////////////////////
///todo
function statuscompletion(uuid){
  var x = document.getElementById(uuid+"select-status").value;
  
  var empRef=update(ref(db,'ticket/'+uuid),{
    status:x
  });
  closemse();

}
/////////////////////////////////////
export function dropsortingTic(){
  //   noSorting=false;
    sortingKey=selectTic.options[selectTic.selectedIndex].value;
  //   console.log(sortingKey);
  
  //   $("#customer-table").find("tr:gt(0)").remove();
  //   tableFeederTic();
  //   sortingKey_status=selectTic_status.options[selectTic_status.selectedIndex].value;
  // console.log(sortingKey);
  if(sortingKey!=""){
    noSorting=false;
    $("#customer-table").find("tr:gt(0)").remove();
   loadingFull();

  }else{
    noSorting=true;
    $("#customer-table").find("tr:gt(0)").remove();
    loadingFull();
  }

  }
/////////////////////////////////////
function fullyload(){
  const dbRef = ref(db);
  
  
  get(child(dbRef, `ticket`)).then((snapshot) => {        
    snapshot.forEach((childSnapshot) => {
        ////////first-loop-user
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();   
      if (snapshot.exists()) {
     
        get(child(dbRef,`emp_record/`+childData.assignee)).then((snapshotUser) => { 
          const childData2 = snapshot.val();
         
          if(noSorting || (snapshotUser.val().emp_type==sortingKey)){
            if(noSorting_status|| ( childData.status==sortingKey_status)){
              if(childData2.status!="deleted"){
                //   if(counter<loader){
                // counter=counter+1;
            
              if(childData.assignee==check_element){
                
                addToDataTableTic(childData.custome_name,childData.phone_no,childData.created_date,
                  childData.address,childData.priority,childData.query,childData.remark,childData.typeof_product_type,
                  childData.status,(snapshotUser.val()==null?"NA":snapshotUser.val().name),(snapshotUser.val()==null?"NA":snapshotUser.val().name),childData.location,childData.expected_date,childKey);
               }
        
        //  } 
        }}} });
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });    
 
});
 

}

export function loadingFull(){
  if(document.getElementById("makeFullTic").checked ==true){
    fullyload();

  }else{
    tableFeederTic();
  }
} 
   
function tableFeederTic(check_element){
    // var counter=0;

  
    const dbRef = ref(db);
    const recentPostsRef = query(ref(db, 'ticket'), limitToLast(loader));
    
    get(child(dbRef, `ticket`)).then((snapshot) => {        
      snapshot.forEach((childSnapshot) => {
          ////////first-loop-user
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();   
        if (snapshot.exists()) {
       
          get(child(dbRef,`emp_record/`+childData.assignee)).then((snapshotUser) => { 
            const childData2 = snapshot.val();
           
            if(noSorting || (snapshotUser.val().emp_type==sortingKey)){
              if(noSorting_status|| ( childData.status==sortingKey_status)){
                if(childData2.status!="deleted"){
                  //   if(counter<loader){
                  // counter=counter+1;
              
                if(snapshotUser.val().name==check_element){
                  
                  addToDataTableTic(childData.custome_name,childData.phone_no,childData.created_date,
                    childData.address,childData.priority,childData.query,childData.remark,childData.typeof_product_type,
                    childData.status,(snapshotUser.val()==null?"NA":snapshotUser.val().name),(snapshotUser.val()==null?"NA":snapshotUser.val().name),childData.location,childData.expected_date,childKey);
                 }
          
          //  } 
          }}} });
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      });    
   
  });
}

 
////////////////////////////////////
//export function updateTicket(uuid,name,phone,created,exdate,place,remark,query,selectedOption,prdt,assignee){
////////
//export function updateTicket(uuid,name,phone,created,place,selectedOption,query,remark,prdt,assignee,location,exdate){
export function updateTicket(uuid,name,phone,query,remark,place,exdate,location,created,selectedOption,prdt,assignee,assigndoc){
  document.getElementById("newaddticdis").style.display="block";
  //  addingnewtic();
    // var mod = document.getElementById("m1-o-new2");
    // mod.style.display = "block";
    //Never touch this
    //start
    popupInUpdateMode=true;
    selectedUuid=uuid;
    selectedAssignee=assignee;
    selectedUuidfordoc=uuid;
    selectedAssigneedoc=assigndoc;
    //end
    document.getElementById("validationCustom01Tic").value=name;
    document.getElementById("phoneTic").value=phone;
    document.getElementById("complaint").value=query;
    document.getElementById("remark").value=remark;
    document.getElementById("adress").value= place  ;
    document.getElementById("ex-date").value=  exdate  ;
    document.getElementById("locationTic").value=location;
    document.getElementById("created-date").value=created;
    document.getElementById("created-date").disabled = true;
    document.getElementById("getdate").style.display="none";

    var selectstatus=document.getElementById(uuid+"select-status");
    currentStatus=selectstatus.options[selectstatus.selectedIndex];
    var select=document.getElementById("select");
    console.log("iiiiiiiii"+select.length);
    for(var i=0;i<selectstatus.length;i++){
      if(selectedOption==select.options[i].value){
        select.selectedIndex=i;
      }
    }
    
    document.getElementById("ty-product").value=prdt;
    // hideDialogeTic();
  }


 /////for time
export  function selectEmp(uuid){
    selectanemp();

  
    selectedUuid=uuid;


}
export  function selectDocEmp(uuid){
  selectanemp();


  selectedUuidfordoc=uuid;


}




///////////////////employ-list////////////////

// export function myticket_search() {
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myticket_search");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[0];
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }       
//   }
// }
export function myticket_search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myticket_search");
  filter = input.value.toUpperCase();
  table = document.getElementById("customer-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
export function myticket_number() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myticket_number");
  filter = input.value.toUpperCase();
  table = document.getElementById("customer-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
export function myticket_Instatus() {
  
  sortingKey_status=selectTic_status.options[selectTic_status.selectedIndex].value;
  console.log(sortingKey);
  if(sortingKey_status!=""){
    noSorting_status=false;
    $("#customer-table").find("tr:gt(0)").remove();
    loadingFull();

  }else{
    noSorting_status=true;
    $("#customer-table").find("tr:gt(0)").remove();
  loadingFull();
  }

  

}
export function myticket_InAddress() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myticket_InAddress");
  filter = input.value.toUpperCase();
  table = document.getElementById("customer-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
export function myticket_prdt() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myticket_prdt");
    filter = input.value.toUpperCase();
    table = document.getElementById("customer-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[7];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  export function myticket_staff() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myticket_staff");
    filter = input.value.toUpperCase();
    table = document.getElementById("customer-table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[11];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  //////////////////////////
  export function Ticselect_searchEmp() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("Ticselect_searchEmp");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
////////////////////////////
export function Ticselect_searchCode() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("Ticselect_searchCode");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
/////////////delete////////
function deleteTicket(uuid){
 
  if (confirm('Are you sure you want to save this thing into the database?')) {
   var table = document.getElementById("customer-table");
  var row = document.getElementById(uuid);
    console.log('Thing was saved to the database.');
    console.log(uuid);


    var adaRef = ref(db,'ticket/'+uuid);
    remove(adaRef)
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
    table.deleteRow(row.rowIndex);
  } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
  }
}
//////////////////////////////////////
function hideDialogeTic(){
  
  document.getElementById("validationCustom01Tic").value="";
    document.getElementById("phoneTic").value="";
    document.getElementById("complaint").value="";
    document.getElementById("adress").value= "";
    document.getElementById("ex-date").value= "";
    document.getElementById("ty-product").value="";
    document.getElementById("remark").value="";
    document.getElementById("created-date").value="";
    document.getElementById("locationTic").value="";
    //todo
    // var select=document.getElementById("select");
  
    
    closetic1();
}
export function sortingTic(){
  var table = document.getElementById("customer-table");
  var header= table.rows[0];
//  for(var i=0;i<table.rows.length;i++){
//    table.deleteRow(i);
//    console.log(",,,,,"+i);
//  }


// $("#customer-table tbody tr").remove();
$("#customer-table").find("tr:gt(0)").remove();
  var j=document.getElementById("Tic-date");
  // alert(j.value);

  const dbRef = ref(db);
  get(child(dbRef, `ticket`)).then((snapshot) => {    
    snapshot.forEach((childSnapshot) => {
        ////////first-loop-user
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();   
      if (snapshot.exists()) {
        //,childKey
        //var google= snapshot.val().signin_loc;
        //const myArray = google.split(",");
        //var lat=myArray[0];
        //var lon=myArray[1]; 
        get(child(dbRef, `emp_record/`+childData.assignee)).then((snapshotUser) => {   
          console.log(childData.created_date+"----"+j.value);
          if(j.value==childData.created_date){
            
            if(checkvalue=="admin"){
              addToDataTableTic(childData.custome_name,childData.phone_no,childData.created_date,
                childData.address,childData.priority,childData.query,childData.remark,childData.typeof_product_type,
                childData.status,(snapshotUser.val()==null?"NA":snapshotUser.val().name),childData.location,childData.expected_date,childKey);
             }
             else if((checkvalue=="sales"||checkvalue=="service")){
              if(snapshotUser.val().emp_type==checkvalue){
                addToDataTableTic(childData.custome_name,childData.phone_no,childData.created_date,
                  childData.address,childData.priority,childData.query,childData.remark,childData.typeof_product_type,
                  childData.status,(snapshotUser.val()==null?"NA":snapshotUser.val().name),childData.location,childData.expected_date,childKey);
 
              }else{
                console.log("sorrrry");
              }}
            } else {
              console.log("No data available");
            }
        
        
            });
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });    
  }).catch((error) => {
    console.error(error);
  });
    

   
  

  
}
 
 
 