const apiUrl = "http://localhost:5132/api/v1";
const params = new URLSearchParams(window.location.search);
const ref = params.get("referencia");   

const form = document.getElementById("form-product");

async function cargarProducto() {   
    const urlMarcas = `${apiUrl}/marcas`
    const urlCategorias = `${apiUrl}/categorias`

    const [marcas, categorias] = await Promise.all([
        cargarDatos(urlMarcas),
        cargarDatos(urlCategorias)
    ]);
    
    construirSelect(marcas, '.div-marca select');
    construirSelect(categorias, '.div-categoria select')
    

    if(ref){
        const urlProducto = `${apiUrl}/producto/${ref}`;
        const producto = await cargarDatos(urlProducto);    
        
        const imgUrl = producto.imagen.includes('http') ? producto.imagen : `http://localhost:5132${producto.imagen}` 
        

        form.elements['nombre'].value = producto.nombre;
        document.getElementById("img-preview").src = imgUrl;    
        form.elements['descripcion'].value = producto.descripcion;
        form.elements['cantidad'].value = producto.cantidad;
        form.elements['precio'].value = producto.precio;
        form.elements['idCategoria'].value = extraerId(categorias, producto.categoria);
        form.elements['idMarca'].value = extraerId(marcas, producto.marca);

    }

}

async function guardarProducto()
{
    const formData = new FormData(form);

    const nombre = form.elements["nombre"].value.trim();
    const precio = parseFloat(form.elements["precio"].value);

    if (!nombre || isNaN(precio)) {
        alert("Debe ingresar nombre y precio válido.");
        return;
    }

    if(ref) {
        formData.append("referencia", ref)
    }

    const endpoint = ref 
        ? `${apiUrl}/editar-producto/${ref}`  // edita producto
        : `${apiUrl}/guardar-producto`; // crea producto

    const metodo = ref ? "PUT" : "POST";
    
    console.log(endpoint);
    

    try {
        const res = await fetch(endpoint, {
            method: metodo,
            body: formData,
        });

        const resultado = await res.json();
        
        for (let [clave, valor] of formData.entries()) {
        console.log(clave, valor);
}

        if (res.ok) {
            let msj = '';
            (ref) ? msj = 'actualizado' : msj = 'guardado'
            alert(`Producto ${msj} correctamente`);
            form.reset();

            window.location.href = "index.html";
        } else {
            let msj = "";
            (ref) ? msj = "Error al actualizar producto:" : "Error al crear producto: ";
            alert( msj + (resultado?.mensaje || "Error desconocido"));
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error al enviar el producto.");
    }
}   

async function cargarDatos(url) {
    const res = await fetch(url);
    const { data } = await res.json();

    return data;
}

function construirSelect(obj, query = ''){
    let etiqueta = document.querySelector(query);
    etiqueta.innerHTML = '';
    
    etiqueta.insertAdjacentHTML("beforeend", `<option value="">-- Seleccione --</option>`);

    obj.forEach((o) => {
        const valor = `
            <option value="${ (query.includes('marca')) ? o.idMarca : o.idCategoria }">${o.nombre}</option>
        `;

        etiqueta.insertAdjacentHTML("beforeend", valor);
    });
}

function extraerId(arr = [], str) {
        return (arr
            .filter(({ nombre }) => nombre === str)
            .map(({idMarca, idCategoria}) => (idMarca) ? idMarca : idCategoria))[0]
}

window.addEventListener("DOMContentLoaded", () => {
    cargarProducto();

    const form = document.getElementById("form-product");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 
        guardarProducto();      
    });

    form.addEventListener("reset", function (e) {
        window.location.href = "index.html";
    });

    const inputImagen = form.elements["imagen"];
    const imgPreview = document.getElementById("img-preview");

    inputImagen.addEventListener("change", function () {
        const archivo = this.files[0];
        if (archivo) {
            const urlTemporal = URL.createObjectURL(archivo);
            imgPreview.src = urlTemporal;
        }
    });
});