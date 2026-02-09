import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanLeavePage {
  canLeave(): Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedFilesGuard implements CanDeactivate<CanLeavePage> {
  canDeactivate(component: CanLeavePage) {
    return component.canLeave();
  }
}
