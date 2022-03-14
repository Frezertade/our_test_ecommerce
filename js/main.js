$(document).ready(function () {
    $('.main-ecom').hide();

    $('#login-btn').on('click', function(e){
        e.preventDefault();
        $('.login').hide();
        $('.main-ecom').show();   
        //get products
        $.ajax({
            type: "Get",
            url: "https://fakestoreapi.com/products",
            success: function (response) {
                response.forEach(element => {
                    let item_html = '';
                    item_html += '<div class="card" style="width: 18rem;">';
                    item_html += '<img src="' + element.image + '" class="card-img-top" alt="...">';
                    item_html += '<div class="card-body">';
                    item_html += '<h5 class="card-title">' + element.title + '</h5>';
                    item_html += '<h5 class="card-subtitle">$' + element.price + '</h6>';
                    item_html += '<p class="card-text">' + element.description + '</p>';
                    item_html += '<a href="#" class="btn btn-primary">Add To Cart</a>';
                    item_html += '</div>';
                    item_html += '</div>';
                    item_html += '<br style="clear:left;"></br>';
                    $('#main-items').append(item_html);
                    //end of function
                });
            }
        });
    });
});