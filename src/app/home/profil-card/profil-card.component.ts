import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { imageProfile, projectPages, resumeTopicsPages } from 'src/app/core/inputs';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit {
  @Input() isActive!: any;
  // @Output() cardClosedEmit = new EventEmitter<boolean>();

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;
  imageProfile: string = imageProfile;

  generalData!: any;

  generalDataSubscription!: Subscription;

  cardClosed: boolean = false;

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

  // cardClosedAction(): void {
  //   this.cardClosed = !this.cardClosed
  //   this.cardClosedEmit.emit(this.cardClosed);
  // }

}

