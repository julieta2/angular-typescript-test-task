import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewUserDialogComponent } from './add-new-user-dialog/add-new-user-dialog.component';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MyErrorStateMatcher } from './my-error-state-matcher';

export interface User {
  name: string;
  email: string;
  phone: string;
}

export interface EditMode {
  index: number;
  cellName: string;
  value: string;
}

const defaultEditMode = {
  index: null,
  cellName: '',
  value: '',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatTable) table: MatTable<any>;

  title = 'users-list';
  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['Name', 'Email', 'Phone', 'Actions'];
  users: User[] = [];
  editMode: EditMode = defaultEditMode;

  constructor(public dialog: MatDialog) {}

  addNewUser(): void {
    const dialogRef = this.dialog.open(AddNewUserDialogComponent, {
      width: '273px',
    });

    dialogRef.componentInstance.newItemEvent.subscribe((res) => {
      this.users.push(res);
      this.table?.renderRows();
      dialogRef.close();
    });
  }

  deleteUser(e, index): void {
    e.stopPropagation();

    // if we had data from back-end I would find item using id
    this.users.splice(index, 1);

    this.table.renderRows();
  }

  editCell(cellName: string, index: number): void {
    if ((this.editMode.cellName !== cellName && this.editMode.index !== index) ||
        (this.editMode.index === index && this.editMode.cellName !== cellName)) {
      this.editMode = {
        index,
        cellName,
        value: this.users[index][cellName]
      };
    }
  }

  cancelEditMode(e): void {
    e.stopPropagation();
    this.editMode = defaultEditMode;
  }

  updateCell(e, cellName, index): void {
    e.stopPropagation();

    this.users[index][cellName] = this.editMode.value;
    this.editMode = defaultEditMode;
    this.table.renderRows();
  }
}
