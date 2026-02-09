import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PdfMergeComponent } from './pages/pdf-merge/pdf-merge.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatIconModule} from "@angular/material/icon";
import { HeaderComponent } from './layout/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { PdfSplitComponent } from './pages/pdf-split/pdf-split.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfMergeComponent,
    HeaderComponent,
    PdfSplitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
