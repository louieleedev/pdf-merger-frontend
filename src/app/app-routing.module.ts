import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfMergeComponent} from "./pages/pdf-merge/pdf-merge.component";
import {PdfSplitComponent} from "./pages/pdf-split/pdf-split.component";
import {UnsavedFilesGuard} from "./guards/unsaved-files.guard";

const routes: Routes = [
  { path: '', redirectTo: 'merge', pathMatch: 'full' },
  // { path: 'merge', component: PdfMergeComponent },
  // { path: 'split', component: PdfSplitComponent }
  {
    path: 'merge',
    component: PdfMergeComponent,
    canDeactivate: [UnsavedFilesGuard]
  },
  {
    path: 'split',
    component: PdfSplitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
