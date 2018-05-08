var elem = document.getElementById('first');

// Change Contents

elem.innerHTML = 'update';

elem.onclick = function(){
    this.innerHTML = "update onclick";
}

var group = document.getElementsByClassName('group');

document.getElementById('btn').addEventListener('click',function(){
    for(var i = 0; i < group.length; i++){
        group[i].innerHTML = 'Paragraph ' + i;
    }
});



// EventListener

var fn = function(){
    this.innerHTML = 'updated EventListener';
    alert('Hello');
};
elem.addEventListener('click',fn);

document.getElementById('btn').addEventListener('click',function(){
    elem.removeEventListener('click',fn);
});

// PageLoad Listener

window.onload = function(){
    var groups = document.querySelectorAll('p[id^="group"]');
    for(var i = 0; i < groups.length; i++){
        groups[i].innerHTML = 'group ' + i + ' updated';  
    }
}

document.addEventListener('DOMContentLoaded',function(){
    var groups = document.querySelectorAll('p[id^="group"]');
    for(var i = 0; i < groups.length; i++){
        groups[i].innerHTML = 'group ' + i + ' updated';  
    }
});

var interval;
document.getElementById('btn').addEventListener('click',function(){
    var counter = 0;
    interval = setInterval(function(){
        var text = document.getElementById('group2').innerHTML;
        // console.log(text);
        document.getElementById('group1').innerHTML += text.charAt(counter);
        counter++;
        console.log(text.charAt(counter));
    },500);
});

setTimeout(function(){
    clearInterval(interval);
},5000);


