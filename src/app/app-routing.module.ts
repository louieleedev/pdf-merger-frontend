import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfMergeComponent} from "./pages/pdf-merge/pdf-merge.component";
import {PdfSplitComponent} from "./pages/pdf-split/pdf-split.component";

const routes: Routes = [
  { path: '', redirectTo: 'merge', pathMatch: 'full' },
  { path: 'merge', component: PdfMergeComponent },
  { path: 'split', component: PdfSplitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
