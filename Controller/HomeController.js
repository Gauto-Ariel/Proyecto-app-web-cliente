import { GetProducts } from "../Service/Service.js";
import { ProductsModel } from "../Model/HomeModel.js";

var globalIndex = 0;

$(document).ready(function() {
    GetProducts().then(function(products) {
        // Almacena los productos en Local Storage
        localStorage.setItem('Productos', JSON.stringify(products));

        showProducts(products);

    }).catch(function(error) {
        console.error('Hubo un problema con la solicitud:', error);
    });    
});

$(window).on("scroll", function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        MoreProducts();
    }
});

function showProducts(products) {
    // Muestra los primeros 4 productos
    for (var i = globalIndex; i < globalIndex + 4 && i < products.length; i++) {
        var product = products[i];
        var html = '<div class="col mb-5">' +
                        '<div class="card h-100">' +
                            '<img class="card-img-top" src="' + product.image + '" alt="..." />' +
                                '<div class="card-body p-4">' +
                                            '<div class="text-center">' +
                                                '<h5 class="fw-bolder">' + product.title + '</h5>' +
                                                product.price +
                                            '</div>' +
                                        '</div>' +
                                    '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">' +
                                '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Detalles del Producto</a></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        $('#procduct-secction').append(html);
    }
    globalIndex += 4;
}

function MoreProducts(){
    var savedProducts = JSON.parse(localStorage.getItem('Productos'));
    var remainingProducts = savedProducts.length - globalIndex;

    // Muestra hasta 4 productos adicionales
    for (var i = globalIndex; i < globalIndex + Math.min(4, remainingProducts); i++) {
        var product = savedProducts[i];
        var html = '<div class="col mb-5">' +
                        '<div class="card h-100">' +
                            '<img class="card-img-top" src="' + product.image + '" alt="..." />' +
                                '<div class="card-body p-4">' +
                                        '<div class="text-center">' +
                                            '<h5 class="fw-bolder">' + product.title + '</h5>' +
                                            product.price +
                                            '</div>' +
                                        '</div>' +
                                    '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">' +
                                '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Detalles del Producto</a></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        $('#procduct-secction').append(html);
    }
    globalIndex += 4;
}