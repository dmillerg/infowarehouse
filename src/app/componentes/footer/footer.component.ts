import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { SessionStorageService } from 'ngx-webstorage';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/apis/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  messageButton: string = 'Login';
  constructor(public dialog: MatDialog, private storage: SessionStorageService) { }

  ngOnInit(): void {
    this.messageButton = this.storage.retrieve('user').usuario;
  }

  openDialog(data: string = '') {
    let dialogRef = this.dialog.open(DialogFromUsers, {
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.length > 0) {
        this.messageButton = result;
      }
    });
  }
}


@Component({
  selector: 'dialog-from-menu-dialog',
  templateUrl: 'mat-dialog-user.html',
})
export class DialogFromUsers {
  usuario: string = '';
  password: string = '';
  constructor(private storage: SessionStorageService, private api: ApiService, public dialogRef: MatDialogRef<FooterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  login() {
    let form = new FormData();
    form.append('usuario', this.usuario);
    form.append('password', this.password);
    this.api.login(form).subscribe((result) => {
      this.data = result.usuario;
      this.storage.store('user', {
        id: result.usuario.id,
        usuario: result.usuario.usuario,
        nombre: result.usuario.nombre,
        token: result.token,
      });
      this.dialogRef.close(result.usuario.usuario);
    });
  }

  logout() {
    this.api.logout().subscribe((result) => {
      this.storage.clear('user');
      this.dialogRef.close('Login');
    })
  }

  submit() {
    document.getElementById('submit')?.click();
  }
}