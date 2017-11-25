import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Profile } from './profile';

import { environment } from '../../environments/environment';

@Injectable()
export class ProfileService {
  private profileUrl = environment.urlRoot + 'profiles';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET profile by username. Will 404 if id not found */
  getProfile(userName: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.profileUrl}/${userName}`);
  }
}
