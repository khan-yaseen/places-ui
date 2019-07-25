import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import { Place } from '../_models/place';

@Injectable()
export class PlaceService {
    constructor(private http: HttpClient) { }

    add(place: FormData) {
        return this.http.post(`${environment.apiUrl}/places/add`, place);
    }

    getPlacesByUser(user) {
        return this.http.get(`${environment.apiUrl}/places/` + user["_id"]);
    }
}
