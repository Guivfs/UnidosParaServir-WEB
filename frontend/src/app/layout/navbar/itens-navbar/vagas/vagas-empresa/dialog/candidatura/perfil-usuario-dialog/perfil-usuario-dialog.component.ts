import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VagasService } from '../../../../vagas.service';

@Component({
  selector: 'app-perfil-usuario-dialog',
  templateUrl: './perfil-usuario-dialog.component.html',
  styleUrls: ['./perfil-usuario-dialog.component.css']
})
export class PerfilUsuarioDialogComponent {
  usuario: any;

  constructor(
    private vagasService: VagasService,
    @Inject(MAT_DIALOG_DATA) public data: { idUsuario: number, idVaga?: number } // Recebendo o idVaga como parâmetro opcional
  ) {
    // Obter os detalhes do usuário
    this.vagasService.getUsuarioById(data.idUsuario).subscribe((res) => {
      this.usuario = res;
    });
  }
}
