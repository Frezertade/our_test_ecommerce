$(document).ready(function () {
  $(".main-ecom").hide();

  if (getCookie("token") != undefined) {
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

  //setCookie("user_email","bobthegreat@gmail.com",30); //set "user_email" cookie, expires in 30 days
  // var userEmail=getCookie("token");//"bobthegreat@gmail.com"

  $("#login-btn").on("click", function (e) {
    //     const data = {
    //       username: $("#UserName").val(),
    //       password: $("#password").val()
    //    };
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: "https://fakestoreapi.com/auth/login",
      data: {
        username: $("#UserName").val(),
        password: $("#password").val(),
      },
      // dataType: "dataType",
      success: function (response) {
        alert("User logged in successfully");
        // $.cookie("token", response.token, { expires: 7 , path: '/' });
        setCookie("token", response.token, 10);
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
      },
    });
  });
});
