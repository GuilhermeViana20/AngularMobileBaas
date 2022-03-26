import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

	public meetingForm 	: FormGroup;
	public idEdit 		: string;

	constructor(
		private service 	: MeetingService,
		private formBuilder : FormBuilder,
		public dialogRef 	: MatDialogRef<MeetingFormComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data : string,
	) {
		this.idEdit = data;
	}
	
	ngOnInit(): void {
		this.meetingForm = this.formBuilder.group({
			id			: [null],
			name		: ['', Validators.required],
			subject		: ['', Validators.required],
			responsible	: ['', Validators.required],
			date		: ['', Validators.required],
			time		: ['', Validators.required],
		});

		if(this.idEdit != null) {
			this.getById();
		}
	}

	getById() {
		this.service.getById(this.idEdit).subscribe(result => {
			this.meetingForm = this.formBuilder.group({
				id			: [result['id'], Validators.required],
				name		: [result['name'], Validators.required],
				subject 	: [result['subject'], Validators.required],
				responsible : [result['responsible'], Validators.required],
				date		: [result['date'], Validators.required],
				time 		: [result['time'], Validators.required]
			});
		},
		err => {
			console.log('Err', err);
		});
	}

	cancel(): void {
		this.dialogRef.close();
	}

	save() {
		if(this.meetingForm.value.id == null) {
			this.create();
		} else {
			this.update();
		}
	}

	create() {
		this.service.insert(this.meetingForm.value).subscribe(
		result => {
			console.log('Reunião adicionada', result)
		},
		err => {
			console.log('Erro', err)
		});
		this.dialogRef.close(true);
		this.meetingForm.reset();
		window.location.reload();
	}

	update() {
		this.service.update(this.meetingForm.value).subscribe(
		result => {
			console.log('Reunião atualizada', result)
		},
		err => {
			console.log('Erro', err)
		});
		this.dialogRef.close(true);
		this.meetingForm.reset();
		window.location.reload();
	}
}
