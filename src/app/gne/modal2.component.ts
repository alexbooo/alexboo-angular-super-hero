import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'modal-content',
    templateUrl: "./modal2.component.html"
})
export class Modal2Component {
    @Input() name;

    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

    open() {
        const modalRef = this.modalService.open(Modal2Component);
        modalRef.componentInstance.name = 'Crual World';
    }
}