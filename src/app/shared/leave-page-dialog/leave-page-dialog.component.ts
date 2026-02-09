import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-page-dialog',
  templateUrl: './leave-page-dialog.component.html'
})
export class LeavePageDialogComponent {

  constructor(private dialogRef: MatDialogRef<LeavePageDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
