import { Component, Input } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { NavController } from 'ionic-angular';
import { AgregarPage } from '../pages/agregar/agregar.component';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-lista',
  templateUrl: './listas.component.html'
})
export class ListasComponent {


  @Input() terminada: boolean = false;


  constructor(public deseosService: DeseosService,private navController: NavController) {
  }

  listaSeleccionada(lista: Lista) {
    this.navController.push(AgregarPage, {
      titulo: lista.titulo,
      lista: lista
    });
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }
}
