$(document).ready(function () {


  var mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination'
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  $('#books-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(2, 200);
  });
  $('#dining-btn').click( function ( event ) {
    event.preventDefault();
    mySwiper.slideTo(3, 400);
  });
  $('#movies-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(4, 600);
  });
  $('#products-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(5, 800);
  });

  $("#todo-textarea").keyup(function () {
    let count = this.value.length;
  });

  $("#post-todo").click( function( event ) {
    event.preventDefault();
    let isContent = $("#todo-textarea").val();
    if(!isContent.trim()){
      throw err;
    }
    $.post("/todo", $("#todo-textarea").serialize(), function () {
      loadNewTodo();
    });
  });

  const createTodoElement = function (todoDB) {

    let template = `<tr data-id="${todoDB.id}"><td>${todoDB.item}</td><td></td><td id="data-icon"><i class="fas fa-pencil-alt"></i><a ><i class="far fa-trash-alt"></i></a></td></tr>`;

    return template;
  };

  const createSlideElements = function() {
    let template = [
      `<div class="swiper-slide slide-3 slide-height"><% include partials/_books %></div>`,
      `<div class="swiper-slide slide-4 slide-height"><% include partials/_dining %></div>`,
      `<div class="swiper-slide slide-5 slide-height"><% include partials/_movies %></div>`,
      `<div class="swiper-slide slide-6 slide-height"><% include partials/_products %></div>`
    ];
    return template;
  };

  const renderTodos = (todos, newTodo) => {
    let contentAll = '';

    if (!todos) {
      return null;
    }

    mySwiper.appendSlide(createSlideElements());

    if (newTodo) {
      $(createTodoElement(todos)).prependTo(`#${todos.name}Table`).hide().slideDown();
    } else {
      todos.forEach(function (todo) {
        $(createTodoElement(todo)).prependTo(`#${todos.name}Table`);
      });
    }
    mySwiper.update();
  };

  let loadNewTodo = () => {
    $.getJSON("/todo", (json) => {
      renderTodos(json[json.length - 1], true);
    });
  };

  let loadTodos = () => {
    $.getJSON("/todo/categories", (json) => {
      console.log(json);
      $(`#books-badge`).text(json.books);
      $(`#dining-badge`).text(json.restaurants);
      $(`#movies-badge`).text(json.movies);
      $(`#products-badge`).text(json.products);
    });
    $.getJSON("/todo", (json) => {
      console.log(json);
      renderTodos(json, false);
    });
  };




  //??Can we change button name to btn-register??
  //??is it okay to remove slide-2 after login/register?
  $('#signup-btn').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    const queryString = `email=${$('#input-email').val()}&password=${$('#input-password').val()}`;
    $.ajax({
      url: '/user/register',
      method: 'POST',
      data: queryString
    }).done(function(response){
      if(!response.isUser) {
        userAuthorized();
      } else {
        $(".warning").hide().slideDown();
      }
    });
    loadTodos();
  });

  const userAuthorized = function() {
    mySwiper.removeSlide(0);
    mySwiper.appendSlide(`<div class="swiper-slide slide-2 slide-height"><% include partials/_overview %></div>`);
    mySwiper.update();
    mySwiper.slideTo(1, 200);
  }
  //??change to btn-login?
  $('#login-btn').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    const queryString = `email=${$('#input-email').val()}&password=${$('#input-password').val()}`;
    $.ajax({
      url: '/user/login',
      method: 'POST',
      data: queryString
    }).done(function(response){
      // response.email to navbar
      if(response.auth){
        userAuthorized();
      } else {
        $(".warning").hide().slideDown();
      }
    });
    loadTodos();
  });

});
