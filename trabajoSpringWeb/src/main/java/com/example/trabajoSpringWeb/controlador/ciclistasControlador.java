package com.example.trabajoSpringWeb.controlador;

import com.example.trabajoSpringWeb.entidad.ciclistas;
import com.example.trabajoSpringWeb.servicio.ciclistasServicio;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;

@RestController
@RequestMapping("/ciclista")
@CrossOrigin(origins = "*")


public class ciclistasControlador {

    private ciclistasServicio ciclistaServicio;

    public ciclistasControlador(ciclistasServicio ciclistaServicio) {
        this.ciclistaServicio = ciclistaServicio;
    }

    @GetMapping("/todos")
    public List<ciclistas> todosCiclistas() {
        return ciclistaServicio.todosCiclistas();
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<ciclistas> buscarCiclistaPorID(@PathVariable String id) {
        ciclistas ciclista = ciclistaServicio.ciclistaPorId(id);
        if (ciclista == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(ciclista, HttpStatus.OK);
        }
    }

    @PostMapping("/agregar")
    public ResponseEntity<ciclistas> agregarCiclista(@RequestBody ciclistas nuevoCiclista) {
        if (ciclistaServicio.ciclistaPorId(nuevoCiclista.getId()) == null) {
            ciclistaServicio.agregarCiclista(nuevoCiclista);
            return new ResponseEntity<>(nuevoCiclista, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ciclistas> actualizarCiclista(@PathVariable String id, @RequestBody ciclistas ciclistaActualizacion) {
        ciclistas ciclistaExistente = ciclistaServicio.ciclistaPorId(id);
        if (ciclistaExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            ciclistaServicio.actualizarCiclista(ciclistaExistente, ciclistaActualizacion);
            return new ResponseEntity<>(ciclistaExistente, HttpStatus.ACCEPTED);
        }
    }

    @DeleteMapping("/borrar/{id}")
    public ResponseEntity<?> borrarCiclista(@PathVariable String id) {
        ciclistas ciclistaExistente = ciclistaServicio.ciclistaPorId(id);
        if (ciclistaExistente == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            ciclistaServicio.borrarCiclista(ciclistaExistente);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
}