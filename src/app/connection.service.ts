import { Injectable } from '@angular/core';

@Injectable()
export class ConnectionService {

  constructor() { }

  login (nickname:string ,password:string) : boolean {
    //Validate if correct user and password
    if (nickname == "admin" && password == "admin"){
        //Set the session to true
        localStorage.setItem("connected", "true");
        return true;
    } else return false; 
}

//These should be real functions with a node call to a database

isConnected(): boolean {
  return localStorage.getItem("connected") == "true";
}

deconnect() : void {
    //Disconnect the user by removing the session
    localStorage.removeItem("connected");
}

}
