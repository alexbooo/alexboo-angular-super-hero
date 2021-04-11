import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

@Component({
    selector: 'app-gne',
    templateUrl: './gne.component.html'
})
export class GneComponent implements OnInit {
    closeResult: string;

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }
    
    open() {
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.name = 'World 1';
    }
}
