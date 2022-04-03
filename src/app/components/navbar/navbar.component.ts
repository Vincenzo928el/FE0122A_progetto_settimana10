import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    totaleProdottiCarrello: number = 0;

    constructor(private prodSrv: ProductsService) {}

    ngOnInit(): void {
        this.prodSrv.sub.subscribe((conta) => {
            this.totaleProdottiCarrello = conta;
        });
    }
}
