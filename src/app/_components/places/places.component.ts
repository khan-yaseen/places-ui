import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { User, Place } from '../../_models';
import { AddPlaceDialogComponent } from './add-place-dialog/add-place-dialog.component';
import { PlaceService } from 'src/app/_services/place.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';
import { environment } from 'src/environments/environment.prod';
@Component({
    templateUrl: 'places.component.html',
    styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

    places: any[];
    currentUser: User;
    animal: string;
    name: string;
    apiUrl: string;
    constructor(public dialog: MatDialog,
                private placeService: PlaceService,
                private alertService: AlertService) {
                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                 }

    ngOnInit() {
        this.getPlacesByUser();
        this.apiUrl = environment.apiUrl;
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AddPlaceDialogComponent, {
            width: '250px',
            data: { name: this.name, animal: this.animal }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }

    getPlacesByUser() {
        this.placeService.getPlacesByUser(this.currentUser).pipe(first())
        .subscribe(
            (data: any) => {
                this.places = data;
            },
            error => {
                this.alertService.error(error);
            });
    }
}
