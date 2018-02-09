$(document).ready(function () {

  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
/*
  $("#todo-textarea").keyup(function () {
    let count = this.value.length;
  });
  
  $("#post-todo").click( function( event ) {
    event.preventDefault();
    let isContent = $("#todo-textarea").val();
    if(!isContent.trim()){
      throw err;
    }
    $.post("/user/:user_id/todo", $("#todo-textarea").serialize(), function () {
      loadNewTodo();
    });
  });
  const renderTodos = (todos, newTodo) => {
    let contentAll = '';

    if (newTodo) {
      $(createTodoElement(todos)).prependTo('.todo-container').hide().slideDown();
      contentAll = todo.content.text; // append
      $("#todo-string").text(contentAll);
    } else {
      todos.forEach(function (todo) {
        $(createTodoElement(todo)).prependTo('.todo-container');
        contentAll = todo.content.text; // append
        $("#todo-string").text(contentAll);
      });
    }
    contentAll = String(contentAll);
    $("#todo-string").text(contentAll);
  }

  let loadNewTodo = () => {
    $.getJSON("/user/:user_id/todo", (json) => {
      renderTodos(json[json.length - 1], true);
    });
  };
  
  const createTodoElement = function (todoDB) {

    let template = [

      `<section class="tweet-article">`,

      `<header>`,
      `<img class="avatar" alt="${tweetDB.user.handle}" src="${tweetDB.user.avatars.small}">`,
      `<h2>${tweetDB.user.name}</h2>`,
      `<p class="handle">${tweetDB.user.handle}</p>`,
      `</header>`,

      `<article>`,
      `<p id="tweet-string" ></p>`,
      `</article>`,

      `<footer>`,
      `<p class="whenPosted">${datePosted(tweetDB.created_at)}</p>`,
      `<div class="social">`,
      `<a href="#"><i class="far fa-flag"></i></a>`,
      `<a href="#"><i class="fas fa-retweet"></i></a>`,
      `<a href="#"><i class="fas fa-heart"></i></a>`,
      `</div">`,
      `</footer>`,

      `</section>`

    ];

    return template.join('');
  }; */
});