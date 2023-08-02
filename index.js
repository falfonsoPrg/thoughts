var pensamientos = []

function agregarAlHtml(element, imagen, id) {
    var contenedor = document.getElementById("texto")
    var nuevo_div = document.createElement("div")
    var div_padre = document.createElement("div")
    nuevo_div.innerHTML = element + "<img src = '" + imagen + "' class = 'ms-4' width='400' height='300'/>" + "<button type='button' class='btn-close ms-5' aria-label='Close'onClick='borrar(" + id + ")'></button>"
    nuevo_div.classList.add("card-body")
    div_padre.id = id
    div_padre.classList.add("card")
    div_padre.classList.add("mb-2")
    div_padre.appendChild(nuevo_div)
    contenedor.appendChild(div_padre)
}

function save() {
    var element = document.getElementById("pensamiento").value
    var imagen = document.getElementById("imagen").value
    pensamientos.push(element)

    guardarEnDb(element, imagen)

    const myModal = document.getElementById('exampleModal');
    const modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    //const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), )

    //const myModal = new bootstrap.Modal("#exampleModal", 
    //)
    //myModal.hide()
}
function cerrar() {
    var element = document.getElementById("pensamiento")
    element.value = ""
}




function borrar(idparametro) {
    console.log(idparametro)
    console.log("funciona")
    borrarDb(idparametro)
    document.getElementById(idparametro).remove()
}



// function traerDatosPorId() {
//     const postId = '123'; // Replace with the desired post ID
//     fetch(`http://mammoth-ancient-egg.glitch.me/posts/${postId}`)
//         .then(response => response.json())
//         .then(post => {
//             console.log(post);
//             // Handle the retrieved post
//         })
//         .catch(error => {
//             console.error(error);
//             // Handle the error
//         });
// }

function traerDatos() {
    fetch(`http://mammoth-ancient-egg.glitch.me/posts`)
        .then(response => response.json())
        .then(post => {
            console.log(post)
            post.forEach(e => {
                agregarAlHtml(e.title, e.content, e.id)
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function guardarEnDb(titulo, url) {
    const newPost = { id: uuidv4(), title: titulo, content: url };
    console.log(newPost)
    fetch('http://mammoth-ancient-egg.glitch.me/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    })
        .then(response => response.json())
        .then(createdPost => {
            agregarAlHtml(createdPost.title, createdPost.content, createdPost.id)
        })
        .catch(error => {
            console.error(error);
            // Handle the error
        });
}

function borrarDb(postId) {
    // DELETE request to delete a post
    fetch(`http://mammoth-ancient-egg.glitch.me/posts/${postId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(deletedPost => {
            console.log(deletedPost);
        })
        .catch(error => {
            console.error(error);
        });
}


function uuidv4() {
    return Math.floor(Math.random() * 1000);
}


traerDatos()