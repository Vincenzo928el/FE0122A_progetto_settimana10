import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-carrello',
    templateUrl: './carrello.component.html',
    styleUrls: ['./carrello.component.scss'],
})
export class CarrelloComponent implements OnInit {
    productsInCarrello!: Product[];

    totaleCarrello: number = 0;

    prodottoRimosso!: Product;

    constructor(private prodSrv: ProductsService) {
        this.productsInCarrello = this.prodSrv.getProductsInCart();
    }

    ngOnInit(): void {
        var total = 0;
        for(var i = 0; i < this.productsInCarrello.length; i++){
            total += this.productsInCarrello[i].price;
            this.totaleCarrello = total
        }

        var carrello = this.productsInCarrello;
        console.log('IL TUO CARRELLO:');
        console.log(carrello);
    }

    rimuoviProd(id: number){
        this.prodSrv.removeProdToCart(id)

        this.productsInCarrello.find(prodRemoved =>{
          prodRemoved.id == id
          return this.prodottoRimosso = prodRemoved
        })

        var total = 0;
        for (var i=0; i < this.productsInCarrello.length; i++){
        total += this.productsInCarrello[i].price;}
        this.totaleCarrello = total

        console.clear()
        console.log("IL TUO CARRELLO AGGIORNATO:")
        console.table(this.productsInCarrello)
      }

    logIn(form: NgForm) {
        this.productsInCarrello = [];
        this.prodSrv.submit(form)
        form.resetForm();
        this.totaleCarrello = 0;
    }
}
