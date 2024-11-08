import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ttc-calculator',
  templateUrl: './ttc-calculator.component.html',
  styleUrls: ['./ttc-calculator.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class TtcCalculatorComponent {
  ttcForm: FormGroup;
  totalTTC: number = 0;
  discount: number = 0;
  unitPriceTTC: number = 0;

  constructor(private fb: FormBuilder) {
    this.ttcForm = this.fb.group({
      quantity: [1],
      unitPrice: [0],
      tva: [18],
    });

    this.calculateTTC();

    this.ttcForm.valueChanges.subscribe(() => this.calculateTTC());
  }

  calculateTTC() {
    const { quantity, unitPrice, tva } = this.ttcForm.value;

    let total = quantity * unitPrice;
    this.discount = 0;

    if (quantity >= 10 && quantity <= 15) {
      this.discount = total * 0.2;
    } else if (quantity > 15) {
      this.discount = total * 0.3;
    }

    total -= this.discount;
    this.unitPriceTTC = unitPrice + (unitPrice * tva) / 100;
    this.totalTTC = total + (total * tva) / 100;
  }
}
