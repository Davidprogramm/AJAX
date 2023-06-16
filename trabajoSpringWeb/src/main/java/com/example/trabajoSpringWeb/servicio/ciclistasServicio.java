package com.example.trabajoSpringWeb.servicio;

import com.example.trabajoSpringWeb.entidad.ciclistas;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ciclistasServicio {
    private List<ciclistas> listaCiclistas = new ArrayList<>();

    public ciclistasServicio() {
    }

    public List<ciclistas> todosCiclistas() {
        return listaCiclistas;
    }


    public ciclistas ciclistaPorId(String id) {
        for (ciclistas c : listaCiclistas) {
            if (c.getId().equals(id)) {
                return c;
            }
        }
        return null;
    }

    public void agregarCiclista(ciclistas ciclista) {
        listaCiclistas.add(ciclista);
    }

    public void borrarCiclista(ciclistas ciclista) {
        listaCiclistas.remove(ciclista);
    }

    public void actualizarCiclista(ciclistas ciclistaExistente, ciclistas ciclistaActualizacion) {
        ciclistaExistente.setNombre(ciclistaActualizacion.getNombre());
        ciclistaExistente.setApellido(ciclistaActualizacion.getApellido());
        ciclistaExistente.setEdad(ciclistaActualizacion.getEdad());
        ciclistaExistente.setEquipo(ciclistaActualizacion.getEquipo());
    }
}