$(document).ready(function() {

    // Ciclista Nuevo
    $("#enviarNuevo").click(function(e) {
      e.preventDefault();
      let id = $("#id").val();
      let nombre = $("#nombre").val();
      let apellido = $("#apellido").val();
      let edad = $("#edad").val();
      let equipo = $("#equipo").val();
  
      let data = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        equipo: equipo
      };
  
      $.ajax({
        url: "http://localhost:8080/ciclista/nuevo",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function() {
          $("#id").val('');
          $("#nombre").val('');
          $("#apellido").val('');
          $("#edad").val('');
          $("#equipo").val('');
        },
        error: function(xhr, status, error) {
          console.log(xhr);
          console.log(status);
          console.log(error);
        }
      });
    });
  
    // BUSCAR
    $("#buscar").click(function(e) {
      e.preventDefault();
      let idConsultar = $("#buscarId").val();
      let tabla = $("#listaBuscar");
      if (idConsultar === '') {
        console.log("Ponte serio");
        return;
      }
      $.ajax({
        url: "http://localhost:8080/ciclista/" + idConsultar,
        type: "GET",
        dataType: "JSON",
        success: function(respuesta) {
          tabla.empty(); // Limpiar el contenido anterior antes de agregar nuevos datos
          tabla.append(
            `<div class="resultado">
              <p><strong>ID:</strong> ${respuesta.id}</p>
              <p><strong>Nombre:</strong> ${respuesta.nombre}</p>
              <p><strong>Apellido:</strong> ${respuesta.apellido}</p>
              <p><strong>Edad:</strong> ${respuesta.edad}</p>
              <p><strong>Equipo:</strong> ${respuesta.equipo}</p>
            </div>`
          );
  
          // Temporizador para eliminar los resultados después de 10 segundos
          setTimeout(function() {
            tabla.empty();
          }, 10000); // 10000 milisegundos = 10 segundos
        },
        error: function(xhr, status, error) {
          console.log(xhr);
          console.log(status);
          console.log(error);
        }
      });
    });
  
    // BORRAR
    $("#borrar").click(function(e) {
      e.preventDefault();
      let idEliminar = $("#borrarId").val();
      let tabla = $("#listaBuscar");
      if (idEliminar === '') {
        console.log("PONTE SERIO");
        return;
      }
    
      $.ajax({
        url: "http://localhost:8080/ciclista/borrar/" + idEliminar,
        type: "DELETE",
        success: function() {
          console.log("Ciclista borrado exitosamente");
        },
        error: function(xhr, status, error) {
          console.log(xhr);
          console.log(status);
          console.log(error);
        }
      });
    });

    // Listar 
    $("#listar").click(function() {
      $.ajax({
        type: "GET",
        url: "http://localhost:8080/ciclista/todos",
        success: function(respuesta) {
          console.log(respuesta);
    
          let tablaCuerpo = $("#tabla-cuerpo");
          tablaCuerpo.empty(); // Limpiar el contenido anterior antes de agregar nuevos datos
    
          for (let i = 0; i < respuesta.length; i++) {
            tablaCuerpo.append(
              `<tr>` +
                `<td>${respuesta[i].id}</td>` +
                `<td>${respuesta[i].nombre}</td>` +
                `<td>${respuesta[i].apellido}</td>` +
                `<td>${respuesta[i].edad}</td>` +
                `<td>${respuesta[i].equipo}</td>` +
              `</tr>`
            );
          }
        }
      });
    });

    });
    
  

  




