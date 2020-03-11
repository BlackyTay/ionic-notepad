import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
import { Note } from '../interfaces/note';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public note: Note;

  constructor(private route: ActivatedRoute, private router: Router, private notesService: NotesService) { 
    // placeholder
    this.note = {
     id: '',
     title: '',
     content: '' 
    };
   }

  ngOnInit() {
    // Get id from url
    let noteId = this.route.snapshot.paramMap.get('id');

    // Checking the data is loaded before getting the note
    if(this.notesService.loaded){
      this.note = this.notesService.getNote(noteId);
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId);
      });
    }
  }

  noteChanged() {
    this.notesService.save();
  }

  deleteNote() {
    this.notesService.deleteNote(this.note);
    this.router.navigate(['./notes']);
  }

}
