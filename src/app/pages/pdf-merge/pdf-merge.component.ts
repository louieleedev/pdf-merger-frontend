import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as pdfjsLib from 'pdfjs-dist';
import {CanLeavePage} from "../../guards/unsaved-files.guard";
import {MatDialog} from "@angular/material/dialog";
import {LeavePageDialogComponent} from "../../shared/leave-page-dialog/leave-page-dialog.component";
import { take, map } from 'rxjs/operators';

/**
 * View-Model für eine PDF-Datei inkl. Vorschau
 */
interface PdfItem {
  file: File;
  previewUrl?: string;
}

// pdf.js Worker konfigurieren (einmalig)
(pdfjsLib as any).GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.min.js';
@Component({
  selector: 'app-pdf-merge',
  templateUrl: './pdf-merge.component.html',
  styleUrls: ['./pdf-merge.component.css']
})
export class PdfMergeComponent implements CanLeavePage {

  /** Alle hochgeladenen PDFs in aktueller Reihenfolge */
  pdfs: PdfItem[] = [];

  constructor(private dialog: MatDialog) {}

  /**
   * Wird aufgerufen, wenn der User PDFs auswählt
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) {
      return;
    }

    for (const file of Array.from(input.files)) {
      const item: PdfItem = { file };
      this.pdfs.push(item);
      this.generatePreview(item);
    }

    // wichtig: damit dieselbe Datei erneut gewählt werden kann
    input.value = '';
  }

  /**
   * Drag & Drop: Reihenfolge ändern (links / rechts)
   */
  drop(event: CdkDragDrop<PdfItem[]>): void {
    moveItemInArray(this.pdfs, event.previousIndex, event.currentIndex);
  }

  /**
   * PDF aus der Liste entfernen
   */
  removePdf(index: number): void {
    this.pdfs.splice(index, 1);
  }

  /**
   * Vorschau (erste Seite) für eine PDF erzeugen
   */
  private async generatePreview(item: PdfItem): Promise<void> {
    console.log('generatePreview called for', item.file.name);
    try {
      const buffer = await item.file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;

      console.log('PDF loaded, pages:', pdf.numPages);

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.5 });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderTask = page.render({
        canvasContext: context,
        viewport: viewport
      });

      await renderTask.promise;

      item.previewUrl = canvas.toDataURL('image/png');
    } catch (err) {
      console.error('PDF preview failed:', err);
    }
  }

  /**
   * Merge-Button (Backend kommt später)
   */
  merge(): void {
    const filesInOrder = this.pdfs.map(p => p.file);
    console.log('Merge clicked', filesInOrder);
  }

  canLeave() {
    if (this.pdfs.length === 0) {
      return true;
    }

    return this.dialog
      .open(LeavePageDialogComponent, {
        width: '400px',
        disableClose: true
      })
      .afterClosed()
      .pipe(
        take(1),
        map(result => result === true)
      );
  }

}
