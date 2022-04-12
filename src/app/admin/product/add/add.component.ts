import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  productForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private prodService: ProductServiceService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      productID: [0],
      productName: ['', [Validators.required]],
      productDesc: ['', [Validators.required]],
      hsnCode: [''],
      expDate: [],
      price: [],
      productLinks: this.fb.array([
        this.fb.group({
          links: ['', [Validators.required]]
        })
      ])
    });
  }


  ngOnInit(): void {
  }

  get f() {
    return this.productForm.controls;
  }

  get pl() {
    return this.productForm.get('productLinks') as FormArray;
  }

  addLinks() {
    this.pl.push(this.fb.group({
      links: ['', [Validators.required]]
    }));
  }

  removeLinks(i: number) {
    if (this.pl.length > 1) {
      this.pl.removeAt(i);
    }
  }

  submit(): any {
    this.submitted = true;
    if (!this.productForm.valid) {
      console.log(this.productForm)
      return false;
    }
    else {
      this.prodService.Save(this.productForm.value).subscribe((res) => {
        if (res.statusCode == 1) {
          console.log('Saved - ' + res.Messgae);
          this.router.navigateByUrl("");
        }
        else {
          console.log('Eoor -' + res.Messgae);

        }
      });
      console.log(this.productForm.value)
    }
  }

}
