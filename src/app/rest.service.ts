import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facial_Expression, Body_Gestures, Tone_Voice, Speech, Routines_Blocks } from './models/blocks.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  // ngOnInit(){}

  blockUrl : string = "http://127.0.0.1:5000/fetch_from_db";

  /*read_db(){
    return this.http.get<Facial_Expression[]>(this.blockUrl);
  }*/
}
