var data = JSON.parse(localStorage.details);
var posts = data[0],
	comments = data[1],
	users = data[2];
var postslen = posts.length;
var commentslen = comments.length;
var userslen = users.length;
var start = 0;
function findusername(userId) {
	for (var j = 0; j < userslen; j++) {
		if (users[j].id == userId) {
			return users[j].name;
		}
	}
}

function showtwentyposts() {
	for (var i = 0; start + i < postslen && i < 20; i++) {
		jQuery('#maincontainer').append(`<div class="postscls" style="margin: 2%;padding: 1%;border: 2px solid black;">
											<h2>${posts[start + i].title}</h2>
											<div>${findusername(posts[start + i].userId)}</div>
											<p>${posts[start + i].body}</p>
											<button id="display_${posts[start + i].id}">Display Comments</button>
											<button id="removepost_${posts[start + i].id}">Remove Post</button><br>
											<input type="text" placeholder="leave your comment here"
											 id="commentbody_${posts[start + i].id}"/>
											<button id="createcomment_${posts[start + i].id}">Comment</button>
										</div>`);
	}
	start += 20;
}
showtwentyposts();
window.onscroll = function(ev) {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		showtwentyposts();
		console.log('hello');
	}
}
// function displayComments(id) {
// 	var id = jQuery(this).attr('id');
// 	id = id.replace('display_', '');
// 	var data = JSON.parse(localStorage.details);
// 	var comments = data[1];
// 	var postcomments = comments.filter(function(element) {
// 		if (element.postId == id) {
// 			return element;
// 		}
// 	});
// 	return postcomments.length;

// }
// jQuery(document).on('click', 'button[id^="display_"]', displayComments(this));
jQuery(document).on('click', 'button[id^="display_"]', function() {
	jQuery(this).parent().children('.commentContainer').remove();
	var id = jQuery(this).attr('id');
	id = id.replace('display_', '');
	var data = JSON.parse(localStorage.details);
	var comments = data[1];
	var postcomments = comments.filter(function(element) {
		if (element.postId == id) {
			return element;
		}
	});
	var postcmtlen = postcomments.length;
	for (var i = 0; i < postcmtlen; i++) {
		jQuery(this).parent().append(`<div class="commentContainer" style="margin: 2%;padding: 1%;border: 2px solid black;">${postcomments[i].body}<br>
			<button id="removecomment_${postcomments[i].id}">Remove Comment</button></div>`)
	}
});
jQuery(document).on('click', 'button[id^="removepost_"]', function() {
	var id = jQuery(this).attr('id');
	id = id.replace('removepost_', '');
	posts = JSON.parse(localStorage.details)[0];
	comments = JSON.parse(localStorage.details)[1];
	var postcomments = comments.filter(function(element) {
		if (element.postId == id) {
			return element;
		}
	});
	for (var i = 0; i < postcomments.length; i++) {
		var commentidx = comments.findIndex(function(element) {
			if (element.postId == id) {
				return element;
			}
		});
		console.log(commentidx);
		comments.splice(commentidx, 1);
	}
	var postindex = posts.findIndex(function(element) {
		if (element.id == id) {
			return element;
		}
	});
	posts.splice(postindex, 1);
	//update the localstorage
	data = [];
	data.push(posts, comments, users);
	localStorage.details = JSON.stringify(data);
	//then remove it from the html
	jQuery(this).parent().remove();
});
jQuery(document).on('click', 'button[id^="removecomment_"]', function() {
	var id = jQuery(this).attr('id');
	id = id.replace('removecomment_', '');
	// var commentindex = comments.find(function(element, index) {
	// 	if (element.id == id) {
	// 		return index;
	// 	}
	// });
	comments = JSON.parse(localStorage.details)[1];
	var commentindex = comments.findIndex(function(element) {
		if (element.id == id) {
			return element;
		}
	});
	console.log(commentindex);
	comments.splice(commentindex, 1);
	data = [];
	data.push(posts, comments, users);
	localStorage.details = JSON.stringify(data);
	jQuery(this).parent().remove();
});
jQuery(document).on('click', 'button[id^="createcomment_"]', function() {
	if (jQuery(this).parent().children('input[id^="commentbody_"]')[0].value) {
		var id = jQuery(this).attr('id');
		id = id.replace('createcomment_', '');
		comments = JSON.parse(localStorage.details)[1];
		var postcomments = comments.filter(function(element) {
			if (element.postId == id) {
				return element;
			}
		});
		var commentsnum = postcomments.length;

		var comment = {
			postId: id,
			id: id+'_'+commentsnum,
			name: 'NewUsername',
			email: 'NewUserEmail',
			body: jQuery(this).parent().children('input[id^="commentbody_"]')[0].value
		}
		console.log(jQuery(this).parent().children('input[id^="commentbody_"]')[0]);
		jQuery(this).parent().children('input[id^="commentbody_"]').css('border: 2px solid red');
		comments.push(comment);
		data[1] = comments;
		localStorage.details = JSON.stringify(data);
		jQuery(this).parent().append(`<div class='commentContainer' style="margin: 2%;padding: 1%;border: 2px solid black;">${comment.body}<br>
			<button id="removecomment_${comment.id}">Remove Comment</button></div>`);
	}
	else {
		alert("Comment can't be empty!");
	}
});