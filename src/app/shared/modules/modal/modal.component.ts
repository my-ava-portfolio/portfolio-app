import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core'
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'set-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title!: string
  @Input() size: 'sm' | 'lg' | 'xl' = 'lg';

  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>

  private _modalRef!: NgbModalRef

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }

  open(): Promise<boolean> {
    const options: NgbModalOptions = {
      backdrop: 'static',
      scrollable: true,
      size: this.size
    }
    return new Promise<boolean>(resolve => {
      this._modalRef = this.modalService.open(
        this.modalContent,
        options
      )
      this._modalRef.result.then(resolve, resolve)
    })
  }

  async close(): Promise<void> {
      this._modalRef.close(true)
  }

  async dismiss(): Promise<void> {
      this._modalRef.dismiss(true)
    }
}
