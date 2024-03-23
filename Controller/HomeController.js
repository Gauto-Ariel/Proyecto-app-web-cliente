var globalIndex = 0;

$(document).ready(function() {
    GetProducts().then(function(products) {
        // Almacena los productos en Local Storage
        localStorage.setItem('Productos', JSON.stringify(products));

        showProducts(products);

    }).catch(function(error) {
        console.error('Hubo un problema con la solicitud:', error);
        // Aquí puedes manejar el error si es necesario
    });
    
});

$(window).on("scroll", function() {
    // Verifica si se ha llegado al final de la página y carga más productos
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
                                    '<div class="text-center"><a class="btn btn-outline-dark mt-auto product-btn" href="#" data-index="' + i + '">Detalles del Producto</a></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

        $('#procduct-secction').append(html);
    }
    globalIndex += 4; // Incrementa globalIndex después de mostrar los productos

    // Eliminar cualquier manejador de eventos previamente asociado
    $('#procduct-secction').off('click', '.product-btn');

    // Manejo del clic en los botones usando delegación de eventos
    $('#procduct-secction').on('click', '.product-btn', function() {
        var index = $(this).data('index'); // Obtiene el índice del producto desde el atributo de datos
        showProductModal(index);
    });
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
                                    '<div class="text-center"><a class="btn btn-outline-dark mt-auto product-btn" href="#" data-index="' + i + '">Detalles del Producto</a></div>'

                            '</div>' +
                        '</div>' +
                    '</div>';

        $('#procduct-secction').append(html);
    }
    globalIndex += 4; // Incrementa globalIndex después de mostrar los productos

    // Eliminar cualquier manejador de eventos previamente asociado
    $('#procduct-secction').off('click', '.product-btn');

    // Manejo del clic en los botones usando delegación de eventos
    $('#procduct-secction').on('click', '.product-btn', function() {
        var index = $(this).data('index'); // Obtiene el índice del producto desde el atributo de datos
        showProductModal(index);
    });
}

function showProductModal(index) {
    var savedProducts = JSON.parse(localStorage.getItem('Productos'));
    var product = savedProducts[index];

    // Eliminar cualquier instancia existente del modal
    $('#productModal').remove();

    // Crear el HTML del modal dinámicamente
    var modalHtml = '<div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                            '<div class="modal-content">' +
                                '<div class="modal-header">' +
                                    '<h5 class="modal-title" id="productModalLabel">' + product.title + '</h5>' +
                                    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
                                '</div>' +
                                '<div class="modal-body">' +
                                    '<img class="card-img-top" src="' + product.image + '" alt="..." />' +
                                    '<p>' + product.description + '</p>' +
                                    '<p>' +"$"+ product.price + '</p>' +
                                '</div>' +
                                '<div class="modal-footer d-flex justify-content-center">' +
                                '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Agregar al carrito</button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

    // Agregar el modal al cuerpo del documento
    $('body').append(modalHtml);

    // Mostrar el modal
    $('#productModal').modal('show');
}

function GetProducts(){
    return fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            return "Servicio no disponible.";
            });
}
