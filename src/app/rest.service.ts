import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from './models/blocks.model';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  // ngOnInit(){}

  blockUrl : string = "http://127.0.0.1:5000/fetch_tables_from_db";

  read_db(){
    return this.http.get<[Facial_Expression[], Body_Gestures[], Tone_Voice[], Speech[], Routines_Blocks[]]>(this.blockUrl);
  }

  upload_routine(routine): Observable<any>{
    return this.http.post<any>("http://127.0.0.1:5000/save_yaml", routine);
  }
}
