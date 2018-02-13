$(document).ready(function () {

  let getAPI = (catg, id, callback) => {
    $.ajax({
      url: `/todo/${id}`,
      method: 'get'
    }).done(function (response) {
      console.log(response);
      console.log('id ', id);
      if( catg === 'products' || catg ==='books') {
        let productURL = `<a href='${response.url}'><button class="btn btn-warning"'><i class="fab fa-amazon"></i>Amazon</button></a>`;
        return callback(productURL);
      }
      if( catg === 'restaurants') {
        let starRating = response.rating;
        let yelpURL = response.url;
        let price = response.price;
        let address = response.address;

        let restaurantsTable = 
       `<div class="row">
          <table>
            <tr>
              <td><a href="${yelpURL}"><i class="fab fa-yelp"></i></a></td>
            </tr>
            <tr>
              <td><p>Address: ${address}</p></td>
            </tr>
            <tr>
              <td><p>Price: ${price}</p></td>
              <td><p>Rating:${starRating}</p></td>
            </tr>
          </table>
        </div>`;

        return callback(restaurantsTable);
      }
      if (catg === 'movies') {
        let poster = response.poster;
        let omdbRating = response.rating;

        let omdbResponse =
          `<div class="row">
          <table class="col-xs-12">
            <tr>
              <td><img src="${poster}" height="100px" alt="poster"></img></td>
              <td><p style="float: right">Rating:${omdbRating}</p></td>
            </tr>
          </table>
        </div>`;
        return callback(omdbResponse);
      }
    });
  };
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
    },

    shortSwipes: false
  });

  // Swipe button navigation
  //
  $('#books-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(1, 200);
  });
  $('#dining-btn').click( function ( event ) {
    event.preventDefault();
    mySwiper.slideTo(2, 400);
  });
  $('#movies-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(3, 600);
  });
  $('#products-btn').click(function (event) {
    event.preventDefault();
    mySwiper.slideTo(4, 800);
  });

  $("#todo-textarea").keyup(function () {
    let count = this.value.length;
  });

  $("#post-todo").click( function( event ) {
    console.log($("#todo-textarea"))
    event.preventDefault();
    let isContent = $("#todo-textarea").val();
    if(!isContent.trim()){
      throw err;
    }
    $.post("/todo", $( "#todo-textarea" ).serialize(), function () {
      console.log($("#todo-textarea").text());
      $("#todo-textarea").val('');
      loadNewTodo();
    });
  });

  //Builds todo row and returns to render todos
  //
  const createTodoElement = function (todoDB, apiString) {
let template =
`<div class="panel panel-default panel${todoDB.id}" data-id="${todoDB.id}">
    <div class="panel-heading" role="tab" id="heading${todoDB.id}">
      <h4 class="panel-title" data-id="${todoDB.id}" data-catg="${todoDB.name}">
        <a role="button" data-toggle="collapse" data-parent="#${todoDB.name}Accordion" href="#collapse${todoDB.id}" aria-expanded="false" aria-controls="collapse${todoDB.id}">
          ${todoDB.item}
        </a>
      </h4>
      <div class="item-icons">
      <a> <i class="far fa-trash-alt trash" data-id=${todoDB.id}></i></a>
      </div>
    </div>
    <div id="collapse${todoDB.id}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading${todoDB.id}">
      <div class="panel-body body${todoDB.id}">
        ${apiString}
      </div>
    </div>
  </div>`;
   // <a class="collapsed" role="button" data-toggle="collapse" data-parent="#${todoDB.name}Accordion" href="#collapse${todoDB.id}" aria-expanded="false" aria-controls="collapse${todoDB.id}">

    return template;
  };

  const getSlideFromCategory = (category) => {
    console.log(category);

    if (category === 'books') {
      return 1;
    } else if (category === 'restaurants') {
      return 2;
    } else if (category === 'movies') {
      return 3;
    } else if (category === 'products') {
      return 4;
    }
  };

  // builds slide page navigation login
  //
  const renderTodos = (todos, newTodo) => {

    //checks authorization
    if (!todos) {
      return null;
    }
    $(".slide-2")
      .attr("style", "display: inline");
    $(".slide-3")
      .attr("style", "display: inline");
    $(".slide-4")
      .attr("style", "display: inline");
    $(".slide-5")
      .attr("style", "display: inline");
    $(".slide-6")
      .attr("style", "display: inline");

    if (newTodo) {
      getAPI(todos.name, todos.id, (response) => {
        $(createTodoElement(todos, response)).appendTo(`#${todos.name}Accordion`);
        console.log(getSlideFromCategory(todos.name), todos.action );
        $('.collapse').collapse();

      });

      mySwiper.slideTo(getSlideFromCategory(todos.name));
    } else {
      todos.forEach(function (todo) {
        getAPI(todo.name, todo.id, (response) => {
          $(createTodoElement(todo, response)).appendTo(`#${todo.name}Accordion`);
          mySwiper.update();
          $('.collapse').collapse();
          
        });
      });
    }
  };

  let updateCategories = () => {
    $.getJSON("/todo/categories", (json) => {
      console.log(json);

      $(`#books-badge`).text(json.books);
      $(`#dining-badge`).text(json.restaurants);
      $(`#movies-badge`).text(json.movies);
      $(`#products-badge`).text(json.products);
    });

  };

  let loadNewTodo = () => {
    console.log('hello');

    updateCategories();
    $.getJSON("/todo", (json) => {
      console.log(json);
      renderTodos(json[json.length - 1], true);
    });
  };

  let loadTodos = () => {
    updateCategories();
    $.getJSON("/todo", (json) => {
      renderTodos(json, false);
    });
  };

  //login ajax & auth
  //
  const userAuthorized = function() {
    mySwiper.removeSlide(0);
    mySwiper.update();
    mySwiper.slideTo(0, 200);
  };
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
        loadTodos();
      } else {
        $(".warning").hide().slideDown();
      }
    });
  });




  $('body').on('click', '.trash', function(event) {
    event.stopPropagation();
    const id = $(this).data('id');
    console.log(id);
    $.ajax({
      url: `/todo/${id}`,
      method: 'DELETE',
    }).done(function(response){
      console.log('received response');
      console.log($(`div[data-id=${id}]`));
      $(`.panel${id}`).remove();
      updateCategories();
    });
  });

/*   $('body').on('click', 'h4', function(event){
    event.preventDefault();
    console.log('hit h4 brn');
    const id = $(this).data('id');
    $.ajax({
      url: `/todo/${id}`,
      method: 'get'
    }).done(function(response){
      console.log(response);
      console.log('id ', id);
      $(`#collapse${id}`).on('show.bs.collapse', function () {
        console.log('collapse');
        $(`<div>hello</div>`).appendTo(`.body${id}`);
      });
    });


  }); */

  $('body').on('click', '.submit', function(event) {
    event.stopPropagation();
    const id = $(this).data('id');
    const newItem = $('#newItem').serialize();
    const newCatg = $('#newCatg').serialize();
    const catgByNum = $('#newCatg').val();
    console.log(id);
    $.ajax({
      url: `/todo/${id}`,
      method: 'PUT',
      data: `${newItem}&${newCatg}`
    }).done(function(response){
      mySwiper.slideTo(getSlideFromCategory(catgByNum), 100);
    });
  });


  loadTodos();

});
