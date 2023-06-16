$(document).ready(function() {
  // Agregar Ciclista
  const formularioNuevo = document.getElementById('formulario-nuevo');
  const nuevoIdInput = document.getElementById('nuevoId');
  const nuevoNombreInput = document.getElementById('nuevoNombre');
  const nuevoApellidoInput = document.getElementById('nuevoApellido');
  const nuevaEdadInput = document.getElementById('nuevaEdad');
  const nuevoEquipoInput = document.getElementById('nuevoEquipo');

  const formularioActualizar = document.getElementById('formulario-actualizar');
  const actualizarIdInput = document.getElementById('actualizarId');
  const actualizarNombreInput = document.getElementById('actualizarNombre');
  const actualizarApellidoInput = document.getElementById('actualizarApellido');
  const actualizarEdadInput = document.getElementById('actualizarEdad');
  const actualizarEquipoInput = document.getElementById('actualizarEquipo');

  const formularioBorrar = document.getElementById('formulario-borrar');
  const borrarIdInput = document.getElementById('borrarId');

  const formularioBuscar = document.getElementById('formulario-buscar');
  const buscarIdInput = document.getElementById('buscarId');

  formularioNuevo.addEventListener('submit', function(event) {
    event.preventDefault();

    const nuevoCiclista = {
      id: nuevoIdInput.value,
      nombre: nuevoNombreInput.value,
      apellido: nuevoApellidoInput.value,
      edad: parseInt(nuevaEdadInput.value),
      equipo: nuevoEquipoInput.value
    };

    fetch('http://localhost:8080/ciclista/agregar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoCiclista)
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      })
      .then(function(ciclista) {
        console.log('Ciclista agregado:', ciclista);
        limpiarFormularioNuevo();
        listarCiclistas();
      })
      .catch(function(error) {
        console.log('Error en la solicitud:', error);
      });
  });

  formularioActualizar.addEventListener('submit', function(event) {
    event.preventDefault();

    const idAActualizar = actualizarIdInput.value;

    fetch(`http://localhost:8080/ciclista/buscar/${idAActualizar}`)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      })
      .then(function(ciclista) {
        if (ciclista) {
          const ciclistaActualizado = {
            id: idAActualizar,
            nombre: actualizarNombreInput.value,
            apellido: actualizarApellidoInput.value,
            edad: parseInt(actualizarEdadInput.value),
            equipo: actualizarEquipoInput.value
          };

          fetch(`http://localhost:8080/ciclista/actualizar/${idAActualizar}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(ciclistaActualizado)
          })
            .then(function(response) {
              if (response.ok) {
                return response.json();
              } else {
                console.log('Error en la solicitud:', response.status);
              }
            })
            .then(function(ciclista) {
              console.log('Ciclista actualizado:', ciclista);
              limpiarFormularioActualizar();
              listarCiclistas();
            })
            .catch(function(error) {
              console.log('Error en la solicitud:', error);
            });
        } else {
          console.log('El ciclista con ID', idAActualizar, 'no existe');
        }
      })
      .catch(function(error) {
        console.log('Error en la solicitud:', error);
      });
  });

  formularioBorrar.addEventListener('submit', function(event) {
    event.preventDefault();

    const idABorrar = borrarIdInput.value;

    fetch(`http://localhost:8080/ciclista/borrar/${idABorrar}`, {
      method: 'DELETE'
    })
      .then(function(response) {
        if (response.ok) {
          console.log('Ciclista borrado:', idABorrar);
          limpiarFormularioBorrar();
          listarCiclistas();
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      })
      .catch(function(error) {
        console.log('Error en la solicitud:', error);
      });
  });

  formularioBuscar.addEventListener('submit', function(event) {
    event.preventDefault();

    const idABuscar = buscarIdInput.value;

    fetch(`http://localhost:8080/ciclista/buscar/${idABuscar}`)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      })
      .then(function(ciclista) {
        if (ciclista) {
          console.log('Ciclista encontrado:', ciclista);
          mostrarCiclistaEnFormularioActualizar(ciclista);
        } else {
          console.log('El ciclista con ID', idABuscar, 'no existe');
        }
      })
      .catch(function(error) {
        console.log('Error en la solicitud:', error);
      });
  });

  function listarCiclistas() {
    fetch('http://localhost:8080/ciclista/todos')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          console.log('Error en la solicitud:', response.status);
        }
      })
      .then(function(ciclistas) {
        console.log('Lista de ciclistas:', ciclistas);
        mostrarCiclistasEnTabla(ciclistas);
      })
      .catch(function(error) {
        console.log('Error en la solicitud:', error);
      });
  }

  function mostrarCiclistasEnTabla(ciclistas) {
    const tablaCiclistas = document.getElementById('tabla-ciclistas');
    tablaCiclistas.innerHTML = '';

    for (let i = 0; i < ciclistas.length; i++) {
      const ciclista = ciclistas[i];

      const fila = document.createElement('tr');

      const columnaId = document.createElement('td');
      columnaId.textContent = ciclista.id;
      fila.appendChild(columnaId);

      const columnaNombre = document.createElement('td');
      columnaNombre.textContent = ciclista.nombre;
      fila.appendChild(columnaNombre);

      const columnaApellido = document.createElement('td');
      columnaApellido.textContent = ciclista.apellido;
      fila.appendChild(columnaApellido);

      const columnaEdad = document.createElement('td');
      columnaEdad.textContent = ciclista.edad;
      fila.appendChild(columnaEdad);

      const columnaEquipo = document.createElement('td');
      columnaEquipo.textContent = ciclista.equipo;
      fila.appendChild(columnaEquipo);

      tablaCiclistas.appendChild(fila);
    }
  }

  function limpiarFormularioNuevo() {
    nuevoIdInput.value = '';
    nuevoNombreInput.value = '';
    nuevoApellidoInput.value = '';
    nuevaEdadInput.value = '';
    nuevoEquipoInput.value = '';
  }

  function limpiarFormularioActualizar() {
    actualizarIdInput.value = '';
    actualizarNombreInput.value = '';
    actualizarApellidoInput.value = '';
    actualizarEdadInput.value = '';
    actualizarEquipoInput.value = '';
  }

  function limpiarFormularioBorrar() {
    borrarIdInput.value = '';
  }

  function mostrarCiclistaEnFormularioActualizar(ciclista) {
    actualizarIdInput.value = ciclista.id;
    actualizarNombreInput.value = ciclista.nombre;
    actualizarApellidoInput.value = ciclista.apellido;
    actualizarEdadInput.value = ciclista.edad;
    actualizarEquipoInput.value = ciclista.equipo;
  }

  listarCiclistas();
});