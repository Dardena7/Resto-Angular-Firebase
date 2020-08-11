import { Component, OnInit } from '@angular/core';
import { Sidedish } from 'src/app/model/sidedish.model';
import { NgForm } from '@angular/forms';
import { SidedishesService } from '../../services/sidedishes.service';

@Component({
  selector: 'app-sidedishes-admin',
  templateUrl: './sidedishes.component.html',
  styleUrls: ['./sidedishes.component.css']
})
export class SidedishesAdminComponent implements OnInit {

  sidedishes: Sidedish[];
  editMode: boolean = false;
  selectedSidedish: Sidedish = null;

  constructor(private sidedishesService: SidedishesService) { }

  ngOnInit(): void {
    this.sidedishesService.getSidedishes();
    this.sidedishesService.sidedishesSubject.subscribe(
      sidedishes => { this.sidedishes = sidedishes }
    );
  }

  onSubmitAdd(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.sidedishesService.postSidedish(new Sidedish("",form.value.name, form.value.price, true));
  }

  onSubmitEdit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const active = form.value.active === 'true' ? true : false;
    this.sidedishesService.updateSidedish(new Sidedish(this.selectedSidedish.id,form.value.name,form.value.price, active));
    this.selectedSidedish = null;
    this.editMode = false;
  }

  onEdit(sidedish: Sidedish) {
    this.editMode = true;  
    this.selectedSidedish= new Sidedish(sidedish.id, sidedish.name, sidedish.price, sidedish.active);
  }

  onDelete(id: string) {
    console.log(id);
    
    this.sidedishesService.deleteSidedish(id);
  }

  onBack() {
    this.editMode = false;
    this.selectedSidedish = null;
  }
}
