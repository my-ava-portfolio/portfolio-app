import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input() profilData: any;
  
  inputProfilData: any;

  activityTypes = ["Entreprises", "Projets personnels", "Bénévolat"]

  constructor() { }

  ngOnInit(): void {
    this.inputProfilData = this.profilData

  }

}
