import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';

import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    baseUrl = 'http://localhost:4201/';
    baseUrlProduct = 'http://localhost:4201/products/';

    //Per chiamare l'elenco prodotti: `${this.baseUrl}/products`
    //Per chiamare il dettaglio prodotto: `${this.baseUrl}/products/${id}`

    private productsInCart: Product[] = [];

    sub = new Subject<number>();

    counter = 0;

    constructor(private http: HttpClient) {}

    get() {
        return this.http.get<Product[]>(this.baseUrlProduct).pipe(
            catchError((err) => {
                return throwError(this.getErrorMess(err.status));
            })
        );
    }

    getProduct(id: number) {
        return this.http.get<Product>(this.baseUrlProduct + id).pipe(
            catchError((err) => {
                return throwError(this.getErrorMess(err.status));
            })
        );
    }

    getProductsInCart() {
        return this.productsInCart;
    }

    addProdInCart(prod: Product) {
        this.productsInCart.push(prod);
    }

    removeProdToCart(idProd: number) {
        this.productsInCart.splice(idProd, 1);
        this.contaMeno();
    }

    conta() {
        this.counter++;
        this.sub.next(this.counter);
    }

    contaMeno(){
        this.counter--;
        this.sub.next(this.counter);
      }

      azzerraConta(){
        this.counter = 0;
        this.sub.next(this.counter);
      }


      submit(form: NgForm){
        console.log(`Grazie per il tuo ordine, ${form.value.nome} ${form.value.cognome}`);
        console.log(form.value);

        this.azzerraConta()

      }

    private getErrorMess(status: number) {
        let mess = '';
        switch (status) {
            case 404:
                mess = 'Risorsa non trovata';
                break;
            case 500:
                mess = 'Errore interno del server';
                break;
            default:
                mess = 'Qualcosa non va';
                break;
        }
        return mess;
    }
}
