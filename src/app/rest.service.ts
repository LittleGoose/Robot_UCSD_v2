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



  read_db(){
    return this.http.get<[Facial_Expression[], Body_Gestures[], Tone_Voice[], Speech[], Routines_Blocks[]]>(this.fetch_db_url);
  }

  upload_routine(routine): Observable<any>{
    return this.http.post<any>(this.upload_db_url, {routine});
  }

  delete_routine(name): Observable<any>{
    return this.http.delete<any>(this.delete_db_url + `/${name}`);
  }

  download_routine(name){
    return this.http.get(this.download_db_url + `/${name}`, {responseType: 'blob'});
  }


  get_recent_routine(): Observable<[any]>{
    return this.http.get<[any]>(this.recent_db_url);
  }
    // COIDGO PARA IMPLEMENTAR EN UN COMPONENT PARA OBTENER LA RUTINA MAS RECIENTE
    // this.rs.get_recent_routine()
    // .subscribe(
    //   (response) => {
    //     console.log(response);
    //   },(error) => {
    //     console.log("No Data Found" + error);
    //   }
    // )

}
