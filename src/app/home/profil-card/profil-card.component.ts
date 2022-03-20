import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { imageProfile, projectPages, resumeTopicsPages } from 'src/app/core/inputs';
import { ResumeService } from 'src/app/services/resume.service';

import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {
  @Output() pointEditorEmit = new EventEmitter<boolean>();

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;
  imageProfile: string = imageProfile;

  generalData!: any;

  generalDataSubscription!: Subscription;

  cardClosed: boolean = false;


  pointEditorStatus: boolean = false;

  constructor(
    private resumeService: ResumeService
  ) {

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
  }



  pointsEditorAction(event: any): void {
    this.pointEditorEmit.emit(event.target.checked);
  }

}

