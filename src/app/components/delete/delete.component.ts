import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
	selector: 'app-delete',
	templateUrl: './delete.component.html',
	styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

	public idDelete : string;

	constructor(
		private service		: MeetingService,
		private formBuilder : FormBuilder,
		public dialogRef	: MatDialogRef<DeleteComponent>,
		private router      : Router,
		@Optional() @Inject(MAT_DIALOG_DATA) public data : string,
	) {
		this.idDelete = data;
	}

	ngOnInit(): void {
	}

	delete() {
		this.service.delete(this.idDelete).subscribe(result => {
			console.log('Excluído com sucesso', result);
		},
		
		err => {
			console.log('Erro', err);
		});
		this.dialogRef.close(true);
		window.location.reload();
	}

	cancel(): void {
		this.dialogRef.close();
	}

}
