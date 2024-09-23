  import { Component, Inject } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

  @Component({
    selector: 'app-confirmacao-demissao-dialog',
    templateUrl: './confirmacao-demissao-dialog.component.html',
    styleUrl: './confirmacao-demissao-dialog.component.css'
  })
  export class ConfirmacaoDemissaoDialogComponent {
    constructor(
      public dialogRef: MatDialogRef<ConfirmacaoDemissaoDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    confirmar(): void {
      this.dialogRef.close(true);
    }

    cancelar(): void {
      this.dialogRef.close(false);
    }
  }

