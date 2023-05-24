"use strict";

// selecting elements for mainpulate them
const form = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const createBtn = document.querySelector(".createBlog-btn");
const submitBtn = document.querySelector(".submit-and-close");

// defining function for events

const openForm = function () {
  console.log("open-btn-clicked");
  form.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const submitForm = function () {
  form.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Adding events to btn

createBtn.addEventListener("click", openForm);
submitBtn.addEventListener("click", submitForm);
overlay.addEventListener("click", submitForm);

// Fetch data from API and display it in the UI

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    const blogList = document.getElementById("blogList");
    data.forEach((blog) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="blog-section">
      <h3 class="blog-id">${blog.id}</h3>
      <h3 class="blog-title">${blog.title}</h3>
      <p class="blog-des">${blog.body}</p>
      <button class="delete-btn" data-id="${blog.id}">Delete</button>
      </div>`;
      blogList.appendChild(div);
    });
  });

// Handle form submission to add a new blog

document.getElementById("addBlogForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("titleInput").value;
  const body = document.getElementById("bodyInput").value;

  const blog = {
    title,
    body,
  };

  // Send a POST request to add the new blog

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => response.json())
    .then((data) => {
      const blogList = document.getElementById("blogList");
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="blog-section">
        <h3 class="blog-id">${data.id}</h3>
        <h3 class="blog-title">${data.title}</h3>
        <p class="blog-des">${data.body}</p>
        <button class="delete-btn" data-id="${data.id}">Delete</button>
      </div>
    `;
      blogList.appendChild(div);
      document.getElementById("addBlogForm").reset();
    });
});

// Handle click event on delete buttons

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const blogId = event.target.getAttribute("data-id");

    // Send a DELETE request to remove the blog

    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: "DELETE",
    }).then(() => {
      event.target.parentElement.remove();
    });
  }
});
