import { Injectable, EventEmitter } from '@angular/core'
import { DataStorageService } from './data-storage.service';
import { Sidedish } from '../model/sidedish.model';
import { Subject } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root'})
export class SidedishesService {

    private collection: string = "sidedishes";

    sidedishes: Sidedish[] = [];
    sidedishesSubject = new Subject<Sidedish[]>();

    constructor(
        private dataStorageService: DataStorageService,
        private productsService: ProductsService) {}

    getSidedishes() {
        this.dataStorageService.getAll(this.collection).subscribe(
            sidedishes => {
                if (sidedishes) {
                    this.sidedishes = this.treatDatas(sidedishes);
                    this.sortAlphaAsc(this.sidedishes);
                }
                else {
                    this.sidedishes = [];
                }
                this.sidedishesSubject.next(this.sidedishes.slice());
            }
        ); 
    }

    postSidedish(sidedish: Sidedish) {
        this.dataStorageService.post(this.collection, sidedish).subscribe(
            response => { this.getSidedishes();}
        );
    }

    deleteSidedish(id: string) {
        this.dataStorageService.delete(this.collection, id).subscribe(
            response => {
                this.productsService.deleteSidedish(id);
                this.getSidedishes(); 
            }
        );
    }

    updateSidedish(sidedish: Sidedish) {
        this.dataStorageService.patch(this.collection, sidedish).subscribe(
            response => { 
                this.productsService.updateSidedish(sidedish);
                this.getSidedishes();
            }
        );
    }

    sortAlphaAsc(sidedishes: Sidedish[]) {
        this.sidedishes.sort(this.compare);
    }

    private compare(a,b) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        return 0;
    }

    private treatDatas(sidedishes: Object) {
        const result = [];
        if (!sidedishes)
          return result;
        for (const [key, value] of Object.entries(sidedishes)) {
            value.id = key;
            result.push(value);
        }
        return result;
    }

}