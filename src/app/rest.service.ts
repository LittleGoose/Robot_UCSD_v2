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
  server_url : string = "http://localhost:5000";
  fetch_db_url : string = `${this.server_url}/fetch_tables_from_db`;
  upload_db_url : string = `${this.server_url}/save_yaml`;
  delete_db_url : string = `${this.server_url}/delete_routine`;


  read_db(){
    return this.http.get<[Facial_Expression[], Body_Gestures[], Tone_Voice[], Speech[], Routines_Blocks[]]>(this.fetch_db_url);
  }

  upload_routine(routine): Observable<any>{
    return this.http.post<any>(this.upload_db_url, routine);
  }

  delete_routine(id): Observable<any>{
    return this.http.delete<any>(this.delete_db_url + `/${id}`);
  }

}
