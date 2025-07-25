const apiUrl = "https://fakestoreapi.com/products";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");



async function cargarProducto() {   

    if(id){
        const url = `${apiUrl}/${id}`;
        const res = await fetch(url);
        const producto = await res.json();

        console.log(producto);
        

        const form = document.getElementById("form-product");
        form.elements['nombre'].value = producto.title;
        // form.elements['imagen'].value = producto.title;
        form.elements['categoria'].value = producto.category;
        form.elements['marca'].value = 'opcion1';
        form.elements['descripcion'].value = producto.description;
        form.elements['cantidad'].value = 1;
        form.elements['precio'].value = producto.price;

        console.log(form.elements['nombre'].value); 
    }
}

async function crearProducto()
{
    const nombre = document.getElementById("nombre").value.trim();  
    const precio = parseFloat(document.getElementById("precio").value);

    if (!nombre || isNaN(precio))
    {
        alert("Debe ingresar nombre y precio válido.");
        return;
    }

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }),
    });

    if (res.ok)
    {
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        cargarProductos();
    } else
    {
        alert("Error al crear el producto.");
    }
}


window.addEventListener("DOMContentLoaded", cargarProducto);   
