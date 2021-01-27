import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MyErrorStateMatcher } from '../my-error-state-matcher';

@Component({
  selector: 'app-add-new-user-dialog',
  templateUrl: './add-new-user-dialog.component.html',
  styleUrls: ['./add-new-user-dialog.component.css']
})
export class AddNewUserDialogComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();

  matcher = new MyErrorStateMatcher();
  newUserForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl('', [
        Validators.required,
      ])
    });
  }

  submit(): void {
    const data = this.newUserForm.value;
    this.newItemEvent.emit(data);
  }
}
