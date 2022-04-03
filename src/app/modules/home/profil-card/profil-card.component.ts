import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { imageProfile, projectPages, resumeTopicsPages } from '@core/inputs';
import { ResumeService } from 'src/app/services/resume.service';

import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;
  imageProfile: string = imageProfile;

  generalData!: any;

  generalDataSubscription!: Subscription;

  cardClosed: boolean = false;


  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private resumeService: ResumeService
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
  }

}

