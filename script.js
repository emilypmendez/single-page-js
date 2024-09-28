const rootDiv = document.getElementById('root');

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password"><br>
            <button type="button" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

renderSignUp();

let userName = '';

function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    if (nameInput && emailInput && passwordInput) {
        userName = nameInput; // Store the user's name in a global variable
        renderHomePage();     // Move to the next step in the app
    } else {
        alert('Please fill out all fields');
    }
}

function renderHomePage() {
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList"></ul>
    `;
}

let posts = [];
let editingPostId = null;


function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;
    
    if (postContent) {
        if (editingPostId !== null) {
            const postIndex = posts.findIndex(post => post.id === editingPostId);
            posts[postIndex].content = postContent;
            editingPostId = null; 
        } else {
            const newPost = { id: Date.now(), content: postContent }; // Create a new post with a unique id
            posts.push(newPost); // Add the new post to the posts array
        }
        document.getElementById('postContent').value = ''; // Clear the textarea
        renderPostList(); // Update the post list
    } else {
        alert('Post content cannot be empty');
    }
}
function handleEditPost(postId){
    const postToEdit = posts.find(post => post.id === postId);
    if(postToEdit){
        document.getElementById('postContent').value = postToEdit.content;
        editingPostId = postId;
    }
}

function handleDeletePost(postId){
    posts = posts.filter(post => post.id != postId)
    renderPostList(); // Update the post 
}

function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = ''; // Clear the current list
    posts.forEach((post) => {
        const postItem = document.createElement('li');
        postItem.innerHTML = `
        <p>${post.content}</p>
        <button onclick="handleEditPost(${post.id})">Edit</button>
        <button onclick="handleDeletePost(${post.id})">Delete</button>
    `;
    postListElement.appendChild(postItem);
    });
}
renderPostList();
