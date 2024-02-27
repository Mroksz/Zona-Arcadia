document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = document.querySelector('.create-post-btn');
    const createPostModal = document.getElementById('createPostModal');
    const publicacionesContainer = document.getElementById('publicacionesContainer');
    const publicarBtn = document.getElementById('publicarBtn');
  
    createPostBtn.addEventListener('click', function () {
      createPostModal.style.display = 'block';
      createPostBtn.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
        createPostBtn.style.display = 'none';
      }, 500);
    });
  
    document.querySelector('.close').addEventListener('click', function () {
      createPostModal.style.display = 'none';
      createPostBtn.style.display = 'block';
      createPostBtn.classList.remove('animate__fadeOut');
    });
  
    publicarBtn.addEventListener('click', function () {
      const titulo = document.getElementById('titulo').value;
      const descripcion = document.getElementById('descripcion').value;
      const imagenPublicacion = document.getElementById('imagenPublicacion').files[0];
  
      if (titulo.trim() !== '' && descripcion.trim() !== '') {
        const publicacion = {
          titulo: titulo,
          descripcion: descripcion,
          imagenPublicacion: imagenPublicacion ? URL.createObjectURL(imagenPublicacion) : null,
          likes: 0,
          dislikes: 0,
          comentarios: []
        };
  
        mostrarPublicacion(publicacion);
  
        // Limpiar campos y cerrar modal
        document.getElementById('titulo').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('imagenPublicacion').value = '';
        createPostModal.style.display = 'none';
        createPostBtn.style.display = 'block';
        createPostBtn.classList.remove('animate__fadeOut');
      }
    });
  
    function mostrarPublicacion(publicacion) {
      const publicacionElement = document.createElement('div');
      publicacionElement.classList.add('publicacion', 'animate__animated', 'animate__fadeInUp');
  
      const contenidoPublicacion = `
        <h2>${publicacion.titulo}</h2>
        <p>${publicacion.descripcion}</p>
        ${publicacion.imagenPublicacion ? `<img src="${publicacion.imagenPublicacion}" alt="Imagen de la publicación" class="imagenPublicacion">` : ''}
        <div class="likes-dislikes">
          <button class="like-btn">Like (${publicacion.likes})</button>
          <button class="dislike-btn">Dislike (${publicacion.dislikes})</button>
        </div>
        <div class="comentarios"></div>
        <button class="comentar-btn">Comentar</button>
      `;
  
      publicacionElement.innerHTML = contenidoPublicacion;
      publicacionesContainer.appendChild(publicacionElement);
  
      const likeBtn = publicacionElement.querySelector('.like-btn');
      const dislikeBtn = publicacionElement.querySelector('.dislike-btn');
      const comentarBtn = publicacionElement.querySelector('.comentar-btn');
  
      likeBtn.addEventListener('click', function () {
        publicacion.likes++;
        actualizarPublicacion(publicacion);
      });
  
      dislikeBtn.addEventListener('click', function () {
        publicacion.dislikes++;
        actualizarPublicacion(publicacion);
      });
  
      comentarBtn.addEventListener('click', function () {
        const comentarioText = prompt('Escribe tu comentario:');
        if (comentarioText) {
          const comentario = {
            nombreUsuario: 'UsuarioAnonimo',
            contenido: comentarioText
          };
          publicacion.comentarios.push(comentario);
          actualizarPublicacion(publicacion);
        }
      });
    }
  
    function actualizarPublicacion(publicacion) {
      const publicacionElement = document.querySelector('.publicacion:last-child');
  
      if (publicacionElement) {
        const likesDislikesElement = publicacionElement.querySelector('.likes-dislikes');
        const comentariosElement = publicacionElement.querySelector('.comentarios');
  
        likesDislikesElement.innerHTML = `
          <button class="like-btn">Like (${publicacion.likes})</button>
          <button class="dislike-btn">Dislike (${publicacion.dislikes})</button>
        `;
  
        comentariosElement.innerHTML = '';
  
        publicacion.comentarios.forEach(comentario => {
          const comentarioElement = document.createElement('div');
          comentarioElement.classList.add('comentario');
          comentarioElement.innerHTML = `<p><strong>${comentario.nombreUsuario}:</strong> ${comentario.contenido}</p>`;
          comentariosElement.appendChild(comentarioElement);
        });
      }
    }
  });
  