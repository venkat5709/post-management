//Elements
const dataContainer = document.querySelector(".container");
let popUpModal = document.querySelector(".popupForm");
const createButton = document.querySelector(".createBtn");
const newPostModal = document.getElementById("newPost");

//getting data from json
const getData = function () {
  fetch(`http://localhost:3000/posts `)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      return renderTitles(json);
    });
};
getData();

//function: title buttons
const renderTitles = function (data) {
  for (const [i, posts] of data.entries()) {
    const html = `<p><div class="titleform"><button class="title"  > TITLE: ${posts.title} <button class="deleteTitle"><img src="remove.png" /> </button></button> </button> </div></p>`;
    dataContainer.insertAdjacentHTML("beforeend", html);
  }
  //Elements
  let viewPost = document.querySelectorAll(".title");
  let deleteTitle = document.querySelectorAll(".deleteTitle");
  for (let i = 0; i < viewPost.length; i++) {
    viewPost[i].addEventListener("click", function (postId) {
      postId.preventDefault();
      viewPostInfo(data[i]);
      popUpModal.style.display = "block";
    });
  }
  for (let i = 0; i< deleteTitle.length;i--){
    deleteTitle[i].addEventListener("click", function (postId) {
      postId.preventDefault();
      deletePostInfo(data[i]);
      popUpModal.style.display = "none"; add
    });
  }
};

//function: getting details of corresponding titles
const viewPostInfo = function (postId) {
  let htmlData = `<div class="popupForm">
        <button class="close"> X </button>
        <p class="post__row"><span ></span> <b>${postId.title}</b></p>
         <p class="post__row"><span></span> ${postId.body}</p>
               <p class="post__row" id="username"><span></span></p>
               </div>
               `;

               dataContainer.insertAdjacentHTML("afterbegin", htmlData);
  //Elements
  popUpModal = document.querySelector(".popupForm");
  let closeBtn = document.querySelectorAll(".close");

  fetch(`http://localhost:3000/users/${postId.userId}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res.username);
      // return res.username;
      const username = document.getElementById("username");
      username.innerHTML = `UserName: ${res.username}`;
    });

  for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener("click", function (e) {
      e.preventDefault();
      popUpModal.style.display = "none";
    });
  }
};

function charcounts(startfrom, charend) {
  var len = document.getElementById(startfrom).value.length;
  document.getElementById(charend).innerHTML = len;
}
function charcount(startsfrom, charends) {
  var length = document.getElementById(startsfrom).value.length;
  document.getElementById(charends).innerHTML = length;
}

//create event handler
createButton.addEventListener("click", function (e) {
  e.preventDefault();

  let modalhtml = `<div class="newPost">
  <form class="form form--create">
  <label for="newPostTitle">Title</label>

      <textarea
         id="value"
        class="form__input form__input--title"
        placeholder="Your Title.."
        style="height: 50px"
        maxlength="100"
        onkeyup="charcounts('value','countchar');"
        onkeyown="charcounts('value','countchar');"
        onmouseout="charcounts('value','countchar');"
      ></textarea>
      <h4 style="color:red; margin-top:-8px; margin-right:28px ;float:right" >*Title should not exceed 100 characters:  <span id="countchar" style="color:red;">0</span></h4>

      <p>
      <label for="newPostBody">Post</label>

      <textarea
        id="values"
        class="form__input form__input--body"
        placeholder="Write something.."
        style="height: 100px"
        maxlength="300"
        onkeyup="charcount('values','countschar');"
        onkeyown="charcount('values','countschar');"
        onmouseout="charcount('values','countschar');"
      ></textarea>
      <h4 style="color:red; margin-top:-20px; margin-right:28px ;float:right" >*Body should not exceed 300 characters:  <span id="countschar" style="color:red;">0</span></h4>
      </p>
      
      <label for="newPostUsername"
      >User Name</label>
      <select id="newPostUsername"  placeholder="UserId" class="form__input form__input--userName" >
      <option value="1">Bret</option>
      <option value="2">Antonette</option>
      <option value="3" selected>Samantha</option>
      <option value="4">Karianne</option>
      <option value="5">Kamren</option>
      <option value="6">Leopoldo_Corkery</option>
      <option value="7">Elwyn.Skiles</option>
      <option value="8">Maxime_Nienow</option>
      <option value="9">Delphine</option>
      <option value="10">Moriah.Stanton</option>
    </select>
      
      <p id="invaliduserName" style="color:red"></p>
      <button id="newPostCloseBtn"><span>Close</span?</button>
      <button id="newPostCeateBtn"><span>Create</span></button>
      </form>
      </div>`;
  newPostModal.insertAdjacentHTML("afterbegin", modalhtml);
  newPostModal.style.display = "block";
  //Elements
  let newPostCloseBtn = document.getElementById("newPostCloseBtn");
  const inputCreateTitle = document.querySelector(".form__input--title");
  const inputCreateBody = document.querySelector(".form__input--body");
  const inputCreateuserName = document.querySelector(".form__input--userName");
  let newPostCreateBtn = document.getElementById("newPostCeateBtn");
  let newPost = document.querySelector(".newPost");
  //closeBtn event handler
  newPostCloseBtn.addEventListener("click", function (e) {
    e.preventDefault();
    newPost.style.display = "none";
  });
  //CreateBtn event handler
  newPostCreateBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const title = String(inputCreateTitle.value);
    const body = String(inputCreateBody.value);
    const userName = String(inputCreateuserName.value);
    let text;
    if (title == null || body == null) {
      alert("please fill the input fields");
    } else {
      const createPost = function () {
        fetch(`http://localhost:3000/posts`, {
          method: "POST",
          body: JSON.stringify({
            title: `${title}`,
            body: `${body}`,
            userId: `${userName}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => console.log(json));
      };
      createPost();
    }
  });
});
