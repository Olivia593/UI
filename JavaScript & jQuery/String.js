// setInterval 

// var interval = setInterval(function(){
//     console.log("interval");
// },1000);

// setTimeout(function(){
//     clearInterval(interval);
// },5000);

// callback function

// function fn(callbackFn){
//     setTimeout(function(){
//         callbackFn('Hello');
//     },5000);  
// }

// fn(function(value){
//     console.log(value);
// });

var str = "The user firstname is Olivia, and user last name is Wang";
// var counter = 0;
// str = str.replace(new RegExp('user','g'),function(match){
//     counter++;
//     if(counter == 2){
//         return 'Olivia';
//     }else{
//         return match;
//     }
// });
// console.log(str);

if(str.match('Olivia')){
    console.log('Match found');
}
if(str.indexOf('user')!=-1){
    console.log('find the user');
}
