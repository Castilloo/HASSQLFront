const apiUrl = "https://fakestoreapi.com/products";

async function cargarProductos()
{
    const res = await fetch(apiUrl);
    const productos = await res.json();

    const thead = document.querySelector('#tabla-productos thead');
    thead.innerHTML = "";

    const tbody = document.querySelector("#tabla-productos tbody");
    tbody.innerHTML = "";

    let h3 = document.querySelector('#cargando');
    

    productos.forEach((p) =>
    {
        const row = `
        <tr>
            <td>${p.id}</td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="gestionarProducto('${p.id}')">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto('${p.id}')">Eliminar</button>
            </td>
        </tr>
    `;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    if(productos !== null){
        thead.innerHTML = `<tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>`;
        
        h3.remove();
    
    } else {
        h3.innerHTML = "Error de corrección";
    }
}

function gestionarProducto(id) {
    if(id)
        window.location.href = `editar.html?id=${id}`;
    else 
        window.location.href = "crear.html";
}

// async function editarProducto()
// {
//     const nombre = document.getElementById("nombre").value.trim();  
//     const precio = parseFloat(document.getElementById("precio").value);

//     if (!nombre || isNaN(precio))
//     {
//         alert("Debe ingresar nombre y precio válido.");
//         return;
//     }

//     const res = await fetch(apiUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nombre, precio }),
//     });

//     if (res.ok)
//     {
//         document.getElementById("nombre").value = "";
//         document.getElementById("precio").value = "";
//         cargarProductos();
//     } else
//     {
//         alert("Error al crear el producto.");
//     }
// }

async function eliminarProducto(id)
{
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

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
