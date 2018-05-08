
$(document).ready(function(){

    if(localStorage.data == null){
    var arr = [];
    localStorage.data = JSON.stringify(arr);
    }
    var obj = JSON.parse(localStorage.data);
    if(localStorage.data != arr){
        html = '';
        html+='<table><tr><th>Username</th><th>Company</th><th>Location</th><th>Gender</th>';
        html+=`<tr>`;
    for(var i = 0; i < obj.length; i++){
        html += `<tr>`;
        $.each(obj[i],function(key,value){
        html+=`<td>${value}</td>`;
    });
        html+=`</tr>`;
    }
    html+='</table>'
    jQuery("#table").html(html);
    }
$("#myForm").validate({
    rules:{
        name : {
            required: true
        },
        company : {
            required: true
        },
        location : {
            required: true
        },
        gender : {
            required: true
        }
    }
});
$("form").submit(function(e){
    var data = $(this).serializeArray();
    // console.log(data);
    var empty = false;
    for(var i = 0; i < data.length; i++){
        arr = data[i];
        if(arr.value == ""){
            empty = true;
        }
    }
    if (!empty) {
    var user = {};
    add = `<tr>`;
    for(var i = 0; i < data.length; i++){
        arr = data[i];
        user[arr.name] = arr.value;
        add += `<td>${arr.value}</td>`;
    }
    add += `</tr>`;
    $("table").append(add);
    var obj = JSON.parse(localStorage.data);
    obj.push(user);
    localStorage.data = JSON.stringify(obj); 
    e.preventDefault();
// });
    }
});
});


