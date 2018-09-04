import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { NavParams } from 'ionic-angular';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'page-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarPage {
  lista: Lista;
  nombreItem: string = '';
  constructor(
    public deseosService: DeseosService,
    private NavParams: NavParams
  ) {
    const titulo = this.NavParams.get('titulo');

    if (this.NavParams.get('lista')) {
      this.lista = this.NavParams.get('lista');
    } else {
      this.lista = new Lista(titulo);
      this.deseosService.agregarLista(this.lista);
    }
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.deseosService.guardadStorage();

    this.nombreItem = '';
  }

  alternarEstadoTarea(item: ListaItem) {
    item.completado = !item.completado;

    const pendientes = this.lista.items.filter(itemData => {
      return !itemData.completado;
    }).length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }

    this.deseosService.guardadStorage();
  }

  borrar(index: number) {
    this.lista.items.splice(index, 1);
    this.deseosService.guardadStorage();
  }
}
