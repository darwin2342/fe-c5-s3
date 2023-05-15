import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from '../models/note';
import { NoteService } from '../services/note.service';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  notes: Note[] = [];
  searchText: string = '';
  dialogRef: any;
  constructor(private noteService: NoteService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  onAddNoteClicked(): void {
    this.dialogRef = this.dialog.open(AddNoteComponent, {
      width: '500px',
      panelClass: 'add-note-dialog'
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.getNotes();
    });
  }

  onNoteAdded(note: Note): void {
    this.notes.push(note);
    this.dialogRef.close();
  }

  onSearchTextChanged(): void {
    if (this.searchText.trim() !== '') {
      this.noteService.getNotes()
        .subscribe(notes => this.notes = notes.filter(note => note.title.toLowerCase().includes(this.searchText.trim().toLowerCase())));
    } else {
      this.getNotes();
    }
  }
}