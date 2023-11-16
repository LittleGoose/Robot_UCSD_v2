import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from './models/blocks.model';
import { Observable } from 'rxjs/internal/Observable';
import { Routines } from './models/routines.model';
@Injectable({
  providedIn: 'root'
})

// REST service that communicates between the ionic app and the python Flask app
export class RestService {

  constructor(private http : HttpClient) { }

  server_url : string = "http://127.0.0.1:5000"; // Python server URL (the URL remains http://127.0.0.1:5000 while in development)

  // Each of the server's URL that serve as API endpoints
  fetch_db_url : string = `${this.server_url}/fetch_collections_from_db`; 
  upload_db_url : string = `${this.server_url}/save_routine`;
  delete_db_url : string = `${this.server_url}/delete_routine`;
  recent_db_url : string = `${this.server_url}/recent_routine`;
  download_db_url : string = `${this.server_url}/download_routine`;
  get_text_url : string = `${this.server_url}/load_current_routine_txt`;
  download_routines_url : string = `${this.server_url}/fetch_routines_from_db`;


  // API endoint to fetch all documents from the databases
  read_db(){
    return this.http.get<[Facial_Expression[], Body_Gestures[], Tone_Voice[], Speech[], Routines_Blocks[]]>(this.fetch_db_url);
  }

  // API endoint to upload a routine to the Routines database
  upload_routine(routine, replace): Observable<any>{
    return this.http.post<any>(this.upload_db_url + `/${replace}`, {routine});
  }

  // API endoint to delete a routine from the Routines database
  delete_routine(id): Observable<any>{
    return this.http.delete<any>(this.delete_db_url + `/${id}`);
  }

  // API endoint to download a routine from the Routines database
  download_routine(name){
    return this.http.get(this.download_db_url + `/${name}`, {responseType: 'blob'});
  }

  // API endoint to get the most recently modified routine from the Routines database
  get_recent_routine(){
    return this.http.get<Array<Array<any>>>(this.recent_db_url);
  }

  // API endoint to get the YAML text preview of a routine being currently built
  get_routine_text_preview(){
    return this.http.get(this.get_text_url);
  }

  // API endoint to get all documents from the Routines database
  get_routines(){
    return this.http.get<[Routines_Blocks[]]>(this.download_routines_url);
  }

}
