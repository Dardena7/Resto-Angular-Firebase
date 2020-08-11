import { Component, OnInit } from '@angular/core';
import { Supplement } from 'src/app/model/supplement.model';
import { NgForm } from '@angular/forms';
import { SupplementsService } from '../../services/supplements.service';

@Component({
  selector: 'app-supplements-admin',
  templateUrl: './supplements.component.html',
  styleUrls: ['./supplements.component.css']
})
export class SupplementsAdminComponent implements OnInit {

  supplements: Supplement[];
  editMode: boolean = false;
  selectedSupplement: Supplement = null;

  constructor(private supplementsService: SupplementsService) { }

  ngOnInit(): void {
    this.supplementsService.getSupplements();
    this.supplementsService.supplementsSubject.subscribe(
      supplements => { this.supplements = supplements }
    );
  }

  onSubmitAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.supplementsService.postSupplement(new Supplement("",form.value.name, form.value.price, true));
  }

  onSubmitEdit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const active = form.value.active === 'true' ? true : false;
    this.supplementsService.updateSupplement(new Supplement(this.selectedSupplement.id,form.value.name,form.value.price, active));
    this.selectedSupplement = null;
    this.editMode = false;
  }

  onEdit(supplement: Supplement) {
    this.editMode = true;  
    this.selectedSupplement= new Supplement(supplement.id, supplement.name, supplement.price, supplement.active);
  }

  onDelete(id: string) {
    this.supplementsService.deleteSupplement(id);
  }

  onBack() {
    this.editMode = false;
    this.selectedSupplement = null;
  }
}

