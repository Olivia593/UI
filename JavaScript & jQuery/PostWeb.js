
jQuery('#btn').click(function(){
    var posts = 'https://jsonplaceholder.typicode.com/posts';
    var comments = 'https://jsonplaceholder.typicode.com/comments';
    var users = 'https://jsonplaceholder.typicode.com/users';
    $.getJSON(posts,function(data){
        localStorage.posts = JSON.stringify(data);
    });
    $.getJSON(comments,function(data){
        localStorage.comments = JSON.stringify(data);
    });
    $.getJSON(users,function(data){
        localStorage.users = JSON.stringify(data);
    });
// });
// $(document).ready(function(){
// if(localStorage.posts!=null && localStorage.comments!=null && localStorage.users!=null){
    
    jQuery('#btn').hide();

    var posts = JSON.parse(localStorage.posts);
    var users = JSON.parse(localStorage.users);
    var comments = JSON.parse(localStorage.comments);
    var html = '';
    html += `<div id="createPost">
                <h1>Create Post</h1>
                Title: <input name="title" type="text"/>
                Description: <input name="body" type="text"/>
                <button id="createPostbtn">Create Post</button>
            </div><br>`
    var start = 0;
    function display(){
    for(var i = start; i < posts.length && i < start+20; i++){
        var poster_name;
        for(var j = 0; j < users.length; j++){
            if(users[j].id == posts[i].userId){
                poster_name = users[j].username;
                break;
            }
        } 
    html += `
        <div id="post_${posts[i].id}" border="1">
            <div><label><strong>Post Title:</strong></label> ${posts[i].title}</div> 
            <div><strong>User:</strong> ${poster_name}</div>
            <div><strong>Description:</strong></div>
            <div>${posts[i].body}</div><br>
            <div><button id="post_${posts[i].id}">Comments</button><button id="deletePost_${posts[i].id}">Delete Post</button></div><br>
        `
        html += `</div>`;    
    }
        start += 20;
    };
    display();
    jQuery(window).scroll(
        display()
    );
    jQuery(document).on('click','button[id^="post_"]',function(){
        var counter = 1;
        var id = 1;
        for(var i = 0; i < comments.length; i++){
            // console.log(this.id);
            // console.log(comments[i].postId);
    
            if(("post_"+comments[i].postId) == this.id){   
                id = comments[i].postId;
                jQuery(this).parent().append(`<div id="comment_${comments[i].id}">${comments[i].body}<button id="deleteCom_${comments[i].id}">Delete</button></div>`);
                ++counter; // ?
            }
        }
        jQuery(this).parent().append(`<div><strong>Add Comments:</strong> <input id="addcomm_${id} type="text"/><button id="addcomm_${id}">Add</button></div>`);
    });
    jQuery(document).on('click','button[id^="addcomm_"]',function(){
        var id = this.id;
        // console.log($(`input[id="${id}"]`).end());
        var input = jQuery(this).parent().find('input').get()[0].value;
        var newComment = {
                "postId": id,
                "id": comments.length,
                "name": input,
                "email": "xiaoluwang31@gmail.com",
                "body": input
        };
        console.log(comments.length);
        comments.push(newComment);
        console.log(comments.length);
        // console.log(input);
        jQuery(this).parent().prepend(`<div>${input}<button id="deleteCom_${comments.length}">Delete</button></div>`);
    });
    jQuery(document).on('click','#createPostbtn',function(){
        var input = jQuery("#createPost").find('input').get();
        var title = input.filter(function(elem){
            if(elem.name == "title"){
                return elem.value;
            }
        })
        var des = input.filter(function(elem){
            if(elem.name == "body"){
                return elem.value;
            }
        })
        var newPost = {
            "title": title[0].value,
            "body": des[0].value
        }
        posts.push(newPost);
        localStorage.posts = JSON.stringify(posts);
        console.log(posts[posts.length-1]);
        console.log(title); 
        console.log(des);
    });
    jQuery(document).on('click','button[id^="deletePost_"]',function(){
        jQuery(this).parent().parent().hide();
    })
    jQuery(document).on('click','button[id^="deleteCom_"]',function(){
        console.log(this.id);
        jQuery(this).parent().hide();
    })
    
    $('#posts').html(html);
}
);
