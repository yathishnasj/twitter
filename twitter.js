
const friends = [
    "Nandhitha",
    "Jenifer",
    "Yathishna",
    "Harini",
    "Sanju",
    "Sonu",
    "Pragathi",
    "Srinithi"
];

let posts = [
    {
        name: "Nakshatra VS",
        username: "@nakshatra",
        text: "Hello everyone! 👋 Welcome to my profile! 💙",
        comments: 12,
        reposts: 8,
        likes: 35
    },
    {
        name: "Nandhitha",
        username: "@nandhitha",
        text: "College life is full of memories! ❤️✨",
        comments: 8,
        reposts: 5,
        likes: 27
    },
    {
        name: "Jenifer",
        username: "@jenifer",
        text: "Learning new things every day! 💻🚀",
        comments: 6,
        reposts: 9,
        likes: 31
    },
    {
        name: "Yathishna",
        username: "@yathishna",
        text: "Good vibes and good friends make life better! 😊",
        comments: 15,
        reposts: 7,
        likes: 42
    },
    {
        name: "Harini",
        username: "@harini",
        text: "Today was a beautiful day! 🌸",
        comments: 4,
        reposts: 3,
        likes: 19
    },
    {
        name: "Sanju",
        username: "@sanju",
        text: "Never stop learning. Keep growing! 🌱",
        comments: 10,
        reposts: 4,
        likes: 24
    },
    {
        name: "Sonu",
        username: "@sonu",
        text: "Coding + Music = Perfect day 🎧💻",
        comments: 5,
        reposts: 6,
        likes: 29
    },
    {
        name: "Pragathi",
        username: "@pragathi",
        text: "Friends make every moment special! 🥰",
        comments: 11,
        reposts: 5,
        likes: 38
    },
    {
        name: "Srinithi",
        username: "@srinithi",
        text: "Keep smiling and enjoy every moment! 😊❤️",
        comments: 7,
        reposts: 2,
        likes: 22
    }
];

function showPage(pageName) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });
    document.getElementById(pageName).classList.add("active-page");
    if (pageName === "profile") {
        displayProfilePosts();
    }
}

function displayPosts() {
    const container = document.getElementById("posts");
    container.innerHTML = "";
    posts.forEach((post, index) => {
        const article = document.createElement("article");
        article.className = "post";
        article.innerHTML = `
            <div class="avatar">
                ${post.name.charAt(0)}
            </div>
            <div class="post-content">
                <div class="post-name">
                    ${post.name}
                    <span>
                        ${post.username} · ${index + 1}h
                    </span>
                </div>
                <p class="post-text">
                    ${post.text}
                </p>
                <div class="post-actions">
                    <button onclick="commentPost(${index})">
                        💬 ${post.comments}
                    </button>
                    <button onclick="repostPost(${index})">
                        🔁 ${post.reposts}
                    </button>
                    <button onclick="likePost(this, ${index})">
                        ❤️ ${post.likes}
                    </button>
                    <button onclick="bookmarkPost(${index})">
                        🔖
                    </button>
                    <button>
                        ↗️
                    </button>
                </div>
            </div>
        `;
        container.appendChild(article);
    });
}

function createPost() {
    const input = document.getElementById("postText");
    const text = input.value.trim();
    if (text === "") {
        alert("Please write something!");
        return;
    }
    posts.unshift({
        name: "Nakshatra VS",
        username: "@nakshatra",
        text: text,
        comments: 0,
        reposts: 0,
        likes: 0
    });
    input.value = "";
    updateCount();
    displayPosts();
}

function updateCount() {
    const input = document.getElementById("postText");
    document.getElementById("count").textContent =
        input.value.length + "/280";
}

function likePost(button, index) {
    posts[index].likes++;
    button.classList.add("liked");
    displayPosts();
}

function repostPost(index) {
    posts[index].reposts++;
    displayPosts();
    alert("Post reposted! 🔁");
}

function commentPost(index) {
    const comment = prompt("Write your comment:");
    if (!comment || comment.trim() === "") {
        return;
    }
    posts[index].comments++;
    displayPosts();
    alert("Comment added! 💬");
}

function bookmarkPost(index) {
    const post = posts[index];
    document.getElementById("bookmarkPosts").innerHTML += `
        <div class="bookmark-card">
            🔖 <b>${post.name}</b>
            <p>${post.text}</p>
        </div>
    `;
    alert("Post bookmarked!");
}

function searchPosts() {
    const value =
        document.getElementById("searchInput")
        .value
        .toLowerCase();
    const allPosts =
        document.querySelectorAll(".post");
    allPosts.forEach(post => {
        if (post.innerText.toLowerCase().includes(value)) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    });
}

function displayProfilePosts() {
    const container =
        document.getElementById("profilePosts");
    container.innerHTML = "";
    posts
        .filter(post => post.name === "Nakshatra VS")
        .forEach(post => {
            container.innerHTML += `
                <div class="post">
                    <div class="avatar">N</div>
                    <div class="post-content">
                        <div class="post-name">
                            Nakshatra VS
                            <span>@nakshatra</span>
                        </div>
                        <p class="post-text">
                            ${post.text}
                        </p>
                        <div class="post-actions">
                            <button>💬 ${post.comments}</button>
                            <button>🔁 ${post.reposts}</button>
                            <button>❤️ ${post.likes}</button>
                            <button>🔖</button>
                        </div>
                    </div>
                </div>
            `;
        });
}

let currentFriend = "";

function openChat(friend) {
    currentFriend = friend;
    document.getElementById("chatHeader").innerHTML = `
        <h3>${friend}</h3>
        <small>@${friend.toLowerCase()}</small>
    `;
    document.getElementById("chatMessages").innerHTML = `
        <div class="chat-message">
            Hey Nakshatra! 👋
        </div>
        <div class="chat-message">
            How are you? 😊
        </div>
    `;
}

function sendMessage() {
    const input =
        document.getElementById("messageInput");
    const message = input.value.trim();
    if (message === "") {
        return;
    }
    if (currentFriend === "") {
        alert("Select a friend first!");
        return;
    }
    document.getElementById("chatMessages").innerHTML += `
        <div class="chat-message">
            ${message}
        </div>
    `;
    input.value = "";
}

function focusPost() {
    showPage("home");
    setTimeout(() => {
        document.getElementById("postText").focus();
    }, 100);
}

displayPosts();
