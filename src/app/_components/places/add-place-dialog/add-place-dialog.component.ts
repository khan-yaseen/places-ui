import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Place } from 'src/app/_models/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from 'src/app/_services/place.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services';


@Component({
    selector: 'app-add-place-dialog',
    templateUrl: 'add-place-dialog.component.html',
})
export class AddPlaceDialogComponent {

    currentUser: any;
    placeForm: FormGroup;
    loading = false;
    submitted = false;
    selectedFile: any;

    constructor(
        private formBuilder: FormBuilder,
        private placeService: PlaceService,
        private alertService: AlertService,
        public dialogRef: MatDialogRef<AddPlaceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Place) {
        this.placeForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            address: ['', Validators.required],
            imageFile: ['', [Validators.required]],
        });
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    // convenience getter for easy access to form fields
    get f() { return this.placeForm.controls; }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit() {
        const formData = new FormData();
        this.submitted = true;

        // stop here if form is invalid
        if (this.placeForm.invalid) {
            return;
        }
        this.loading = true;
        formData.set('name', this.placeForm.value.name);
        formData.set('address', this.placeForm.value.address);
        formData.set('description', this.placeForm.value.description);
        formData.set('userId', this.currentUser["_id"]);
        formData.set('imageFile', this.selectedFile);
        this.placeService.add(formData)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Place added successfully', true);
                    this.dialogRef.close();
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onFileChanged(event) {
        this.selectedFile = event.target.files[0];
    }
}
