import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { NavController, AlertController } from 'ionic-angular';
import { AgregarPage } from '../agregar/agregar.component';

@Component({
  selector: 'page-pendientes',
  templateUrl: './pendientes.component.html'
})
export class PendientesPage {
  constructor(
    public deseosService: DeseosService,
    private NavController: NavController,
    private alertController: AlertController
  ) {}


  agregarLista() {
    // this.NavController.push(AgregarPage);
    const alerta = this.alertController.create({
      title: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Escribe aquí el título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Guardar',
          handler: data => {
            if (data.titulo.length === 0) {
              return;
            }
            this.NavController.push(AgregarPage, {
              titulo: data.titulo
            });
          }
        }
      ]
    });
    alerta.present();
  }
}
