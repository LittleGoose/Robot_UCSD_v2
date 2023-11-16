import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block, Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from './models/blocks.model';
import { Observable } from 'rxjs/internal/Observable';
import { Routines } from './models/routines.model';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  // ngOnInit(){}
  server_url : string = "http://127.0.0.1:5000"; // este tiene que quedarse como "http://127.0.0.1:5000" en modo de desarrollo 
  fetch_db_url : string = `${this.server_url}/fetch_tables_from_db`;
  upload_db_url : string = `${this.server_url}/save_routine`;
  delete_db_url : string = `${this.server_url}/delete_routine`;
  recent_db_url : string = `${this.server_url}/recent_routine`;
  download_db_url : string = `${this.server_url}/download_routine`;
  get_text_url : string = `${this.server_url}/load_current_routine_txt`;
  download_routines_url : string = `${this.server_url}/fetch_routines_from_db`;


  read_db(){
    return this.http.get<[Facial_Expression[], Body_Gestures[], Tone_Voice[], Speech[], Routines_Blocks[]]>(this.fetch_db_url);
  }

  upload_routine(routine, replace): Observable<any>{
    return this.http.post<any>(this.upload_db_url + `/${replace}`, {routine});
  }

  delete_routine(name): Observable<any>{
    return this.http.delete<any>(this.delete_db_url + `/${name}`);
  }

  download_routine(name){
    return this.http.get(this.download_db_url + `/${name}`, {responseType: 'blob'});
  }

  get_recent_routine(){
    return this.http.get<Array<Array<any>>>(this.recent_db_url);
  }

  get_routine_text_preview(){
    return this.http.get(this.get_text_url);
  }

  get_routines(){
    return this.http.get<[Routines_Blocks[]]>(this.download_routines_url);
  }

}
