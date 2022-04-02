$(document).ready(function () {
  $(".main-ecom").hide();
  $("#register").hide();
  $("#image").hide();

  if (getCookie("token") != undefined && getCookie("token").length != 0) {
    $(".login").hide();
    $(".main-ecom").show();
    //get products
    $.ajax({
      type: "Get",
      url: "https://fakestoreapi.com/products",
      success: function (response) {
        response.forEach((element) => {
          let item_html = "";
          item_html += '<div class="card" style="width: 18rem;">';
          item_html +=
            '<img src="' + element.image + '" class="card-img-top" alt="...">';
          item_html += '<div class="card-body">';
          item_html += '<h5 class="card-title">' + element.title + "</h5>";
          item_html += '<h5 class="card-subtitle">$' + element.price + "</h6>";
          item_html += '<p class="card-text">' + element.description + "</p>";
          item_html += '<a href="#" class="btn btn-primary">Add To Cart</a>';
          item_html += "</div>";
          item_html += "</div>";
          item_html += '<br style="clear:left;"></br>';
          $("#main-items").append(item_html);
        });
      },
    });
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  $("#login-btn").on("click", function (e) {
    e.preventDefault();
    $(".alert").alert('close')

    $.ajax({
      type: "POST",
      url: "https://fakestoreapi.com/auth/login",
      data: {
        username: $("#UserName").val(),
        password: $("#password").val(),
      },
      beforeSend: function () {
        $("#image").show();
      },
      error: function () {
        $("#loaderDiv").hide();
        $(".main1 .login-form").prepend(
          '<div class="alert alert-danger" role="alert">Username / Password combination is invalid! </div>'
        );
      },
      //success: function (response) {
        $("#loaderDiv").hide();
        $(".main1 .login-form").prepend('<div class="alert alert-success alert-dismissible fade show" role="alert">'+
        '<strong>LoggedIn Successfully!</strong> Please hit the "ok" button to proceed.'+
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
          '<span aria-hidden="true">Ok</span>'+
        '</button>'+
      '</div>'
  
        );

        $(".close").on("click", function (e) {
          e.preventDefault();
        $(".alert").alert('close')
        
        setCookie("token", response.token, 10);
        $(".login").hide();
        //$(".main-ecom").show();
        //get products
        $.ajax({
          type: "Get",
          url: "https://fakestoreapi.com/products",
          success: function (response) {
            response.forEach((element) => {
              let item_html = "";
              item_html += '<div class="card" style="width: 18rem;">';
              item_html +=
                '<img src="' +
                element.image +
                '" class="card-img-top" alt="...">';
              item_html += '<div class="card-body">';
              item_html += '<h5 class="card-title">' + element.title + "</h5>";
              item_html +=
                '<h5 class="card-subtitle">$' + element.price + "</h6>";
              item_html +=
                '<p class="card-text">' + element.description + "</p>";
              item_html +=
                '<a href="#" class="btn btn-primary">Add To Cart</a>';
              item_html += "</div>";
              item_html += "</div>";
              item_html += '<br style="clear:left;"></br>';
              $("#main-items").append(item_html);
            });
          },
        });
      });
      },
    
    });
    $("#UserName").val("");
    $("#password").val("");
  });

  function deleteCookie(name) {
    setCookie(name, "", -1);
  }

  $("#logout").on("click", function (e) {
    e.preventDefault();

    deleteCookie("token");

    $(".main-ecom").hide();
    $(".login").show();
  });

  $("#register-btn").on("click", function (e) {
    e.preventDefault();

    $(".main-ecom").hide();
    $(".login").hide();
    $("#register").show();
  });

  $("#submit").on("click", function (e) {
    e.preventDefault();
    const register = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      userEmail: $("#inputEmail4").val(),
      password: $("#inputPassword4").val(),
      address: $("#inputAddress").val(),
      address2: $("#inputAddress2").val(),
      city: $("#inputCity").val(),
      state: $("#inputState").val(),
      zip: $("#inputZip").val(),
    };
    $.ajax({
      type: "POST",
      url: "http://localhost/ecom/register",
      data: register,
      dataType: "dataType",
      success: function (response) {
        console.log("success !")
      },
      error: function(e){
        console.log("error !",e)
      }
    });

    

    console.log(register);
  });
});
