import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from '../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notes: Note[] = [];
  public loaded: boolean = false;

  constructor(private storage: Storage) { }

  public load(): Promise<boolean> {
    // Return a promise to let us know when this operation has completed
    return new Promise((resolve) => {
      // Get the notes that were saved into storage
      this.storage.get('notes').then((notes) => {
        // Only set this notes to the returned value if there were values stored
         if(notes != null){
           this.notes = notes;
         }

         // This allows us to check if the data has been loaded in or not
         this.loaded = true;
         resolve(true);
      }); 
    });
  }

  public save(): void {
    // Save the current array of notes to storage
    this.storage.set('notes', this.notes);
  }

  public getNote(id): Note {
    // Return the note that has an id matching the id passed in
    return this.notes.find(note => note.id === id);
  }

  public createNote(title): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

    this.notes.push( {
      id: id.toString(),
      title: title,
      content: ''
    });

    this.save();
  }

  public deleteNote(note): void {
    // Get the index in the array of the note that was passed in
    let index = this.notes.indexOf(note);
    // Delete that element of the array and resve the data
    if(index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
