$(document).ready(function () {

  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    
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

  const createTodoElement = function (todoDB) {

    let template = `<tr><td>${todoDB.user.text}</td><td></td><td id="data-icon"><i class="fas fa-pencil-alt"></i><a ><i class="far fa-trash-alt"></i></a></td></tr>`;

    return template;
  };

  const renderTodos = (todos, newTodo) => {
    let contentAll = '';

    if (newTodo) {
      $(createTodoElement(todos)).prependTo(`#${todos.user.category}`).hide().slideDown();
    } else {
      todos.forEach(function (todo) {
        $(createTodoElement(todo)).prependTo(`#${todos.user.category}`);
      });
    }
  };

  let loadNewTodo = () => {
    $.getJSON("/user/:user_id/todo", (json) => {
      renderTodos(json[json.length - 1], true);
    });
  };

  let loadTodos = () => {
    $.getJSON("/user/:user_id/todo", (json) => {
      renderTodos(json, false);
    });
  };
  
  loadTodos();
  */
});