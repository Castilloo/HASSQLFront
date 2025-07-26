// const apiUrl = "https://fakestoreapi.com/products";
const apiUrl = "http://localhost:5132/api/v1";


async function cargarProductos()
{
    // const res = await fetch(apiUrl);
    // const productos = await res.json();

    const res = await fetch(`${apiUrl}/productos`);
    const { data } = await res.json();

    console.log(data)

    const thead = document.querySelector('#tabla-productos thead');
    thead.innerHTML = "";

    const tbody = document.querySelector("#tabla-productos tbody");
    tbody.innerHTML = "";

    let h3 = document.querySelector('#cargando');
    

    data.forEach(p =>
    {
        const imageUrl = (p.imagen.includes('http')) ? p.imagen : `http://localhost:5132${p.imagen}`;
        
        const row = `
        <tr>
            <td>${p.referencia}</td>
            <td><img src="${imageUrl}"></td> 
            <td>${p.nombre}</td>
            <td>${p.marca}</td>
            <td>${p.categoria}</td>
            <td>${p.descripcion}</td>
            <td>${p.cantidad}</td>
            <td>$${p.precio}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="gestionarProducto('${p.referencia}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto('${p.referencia}')">Eliminar</button>
            </td>
        </tr>
    `;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    if(data !== null){
        thead.innerHTML = `<tr>
                <th>Ref.</th>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>`;
        
        h3.remove();
    
    } else {
        h3.innerHTML = "Error de corrección";
    }
}

function gestionarProducto(ref) {
    if(ref)
        window.location.href = `editar.html?referencia=${ref}`;
    else 
        window.location.href = "crear.html";
}

async function eliminarProducto(referencia)
{
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    const res = await fetch(`${apiUrl}/borrar-producto/${referencia}`, { method: "DELETE" });

    if (res.ok)
    {
        cargarProductos();
    } else
    {
        alert("No se pudo eliminar.");
    }
}

// Cargar productos al iniciar
window.addEventListener("DOMContentLoaded", cargarProductos);   
