import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

	public meetingForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<MeetingFormComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }
	
	ngOnInit(): void {
		this.meetingForm = this.formBuilder.group({
			id: [null],
			name: ['', Validators.required],
			subject: ['', Validators.required],
			responsible: ['', Validators.required],
			date: ['', Validators.required],
			time: ['', Validators.required],
		})
	}

	cancel(): void {
		this.dialogRef.close();
	}
}
