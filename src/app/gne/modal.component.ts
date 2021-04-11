import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal2Component } from './modal2.component';

@Component({
    selector: 'modal-content',
    templateUrl: "./modal.component.html"
})
export class ModalComponent {
    @Input() name;

    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

    open() {
        const modalRef = this.modalService.open(Modal2Component);
        modalRef.componentInstance.name = 'World 2';
    }
}