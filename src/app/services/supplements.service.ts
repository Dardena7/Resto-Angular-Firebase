import { Injectable } from '@angular/core'
import { DataStorageService } from './data-storage.service';
import { Supplement } from '../model/supplement.model';
import { Subject } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root'})
export class SupplementsService {

    private collection: string = "supplements";

    supplements: Supplement[] = [];
    supplementsSubject = new Subject<Supplement[]>();

    constructor(
        private dataStorageService: DataStorageService,
        private productsService: ProductsService) {}

    getSupplements() {
        this.dataStorageService.getAll(this.collection).subscribe(
            supplements => {
                if (supplements) {
                    this.supplements = this.treatDatas(supplements);
                    this.sortAlphaAsc(this.supplements);
                }
                else {
                    this.supplements = [];
                }
                this.supplementsSubject.next(this.supplements.slice());
            }
        ); 
    }

    postSupplement(supplement: Supplement) {
        this.dataStorageService.post(this.collection, supplement).subscribe(
            response => { this.getSupplements();}
        );
    }

    deleteSupplement(id: string) {
        this.dataStorageService.delete(this.collection, id).subscribe(
            response => {
                this.productsService.deleteSupplement(id);
                this.getSupplements(); 
            }
        );
    }

    updateSupplement(supplement: Supplement) {
        this.dataStorageService.patch(this.collection, supplement).subscribe(
            response => { 
                this.productsService.updateSupplement(supplement);
                this.getSupplements();
            }
        );
    }

    sortAlphaAsc(supplements: Supplement[]) {
        this.supplements.sort(this.compare);
    }

    private compare(a,b) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        return 0;
    }

    private treatDatas(supplements: Object) {
        const result = [];
        if (!supplements)
            return result;
        for (const [key, value] of Object.entries(supplements)) {
            value.id = key;
            result.push(value);
        }
        return result;
    }

}