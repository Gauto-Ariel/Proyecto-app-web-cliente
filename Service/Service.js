function GetProducts(){
    return fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => json)
            .catch(error => {
            console.error('Hubo un problema con la solicitud:', error);
            return "Servicio no disponible.";
            });
}