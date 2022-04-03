$(document).ready(function () {
  $(".main-ecom").hide();
  $("#register").hide();
  $("#image").hide();

  let manualPassword = "",
    manualUserName = "";

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
    $(".alert").alert("close");

    if (
      $("#UserName").val() === manualUserName &&
      $("#password").val() === manualPassword &&
      manualUserName !== "" &&
      manualPassword !== ""
    ) {
      $(".login").hide();
      $(".main-ecom").show();

      $(".container-fluid").append(
        '<div style="width:50%" class="alert alert-success" role="alert"><b>You are Logged In Successfully!</b></div>'
      );
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
            item_html += '<p class="card-text">' + element.description + "</p>";
            item_html += '<a href="#" class="btn btn-primary">Add To Cart</a>';
            item_html += "</div>";
            item_html += "</div>";
            item_html += '<br style="clear:left;"></br>';
            $("#main-items").append(item_html);
          });
        },
      });
      setTimeout(function () {
        $(".alert").alert("close");
      }, 6000);
    } else {
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
        success: function (response) {
          $("#loaderDiv").hide();
          $(".container-fluid").append(
            '<div style="width:50%" class="alert alert-success" role="alert"><b>You are Logged In Successfully!</b></div>'
          );

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
                item_html +=
                  '<h5 class="card-title">' + element.title + "</h5>";
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

          setTimeout(function () {
            $(".alert").alert("close");
          }, 6000);
        },
      });
    }

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
        console.log("success !");
      },
      error: function (e) {
        console.log("error !", e);
      },
    });

    console.log(register);
  });

  $("#submit").on("click", function (e) {
    e.preventDefault();

    if (
      $("#firstName").val() === "" ||
      $("#lastName").val() === "" ||
      $("#inputEmail4").val() === "" ||
      $("#inputUserName4").val() === "" ||
      $("#inputPassword4").val() === "" ||
      $("#inputAddress").val() === "" ||
      $("#inputCity").val() === "" ||
      $("#inputState").val() === "" ||
      $("#inputZip").val() === ""
    ) {
      $("#toAppend").append(
        '<div class="alert alert-danger" role="alert">Please, all  required fields must be filled before you submit </div>'
      );
    } else {
      manualUserName = $("#inputUserName4").val();
      manualPassword = $("#inputPassword4").val();
      $("#register").hide();
      $(".login").show();
      $(".main1 .login-form").prepend(
        '<div class="alert alert-success" role="alert"><b><b>You are Registered Successfully!<br><b>Please, login with registered credentials</div>'
      );

      $("#firstName").val("");
      $("#lastName").val("");
      $("#inputEmail4").val("");
      $("#inputPassword4").val("");
      $("#inputUserName4").val("");
      $("#inputAddress").val("");
      $("#inputAddress2").val("");
      $("#inputCity").val("");
      $("#inputState").val("");
      $("#inputZip").val("");
    }
  });

  $(
    "#firstName,#lastName,#inputEmail4,#inputPassword4,#inputAddress,#inputAddress2,#inputCity,#inputState,#inputZip,#UserName,#password"
  ).on("click", function (e) {
    e.preventDefault();
    $(".alert").alert("close");
  });
});
