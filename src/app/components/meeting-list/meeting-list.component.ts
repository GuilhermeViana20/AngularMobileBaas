import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
	selector: 'app-meeting-list',
	templateUrl: './meeting-list.component.html',
	styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

	displayedColumns	: string[] = ['name', 'subject', 'responsible', 'date', 'time', 'action'];
	meetings 			= [];
	length 				: number;
	totalRecordsPerPage : number = 5;
	meetingNameFind		: string;
	meetingDateFind		: string;

	constructor(
		private service : MeetingService,
		public dialog 	: MatDialog
	) { }

	ngOnInit(): void {
		this.findAll(0, 'date', null);
	}

	findAll(pageNumber : number, sortField : string, filters : string) {
		this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe(meetingsReturn => {
			this.meetings = meetingsReturn['meeting'];
			this.length = meetingsReturn['page'].size;
		}, err => {
			console.log('erro ', err);
			console.log('erro status ', err.status);
			console.log('erro error ', err.error);
			console.log('err headers', err.headers);
		})
	}

	getServerData(event? : PageEvent) {
		this.findAll(event.pageIndex, 'date', null);
	}

	edit(idEdit : string) {
		const dialogRef = this.dialog.open(MeetingFormComponent, {
			width : '500px',
			data : idEdit
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('Diálogo fechado')
		});
	}

}
