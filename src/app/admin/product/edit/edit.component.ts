import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductServiceService } from 'src/app/Services/product-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productForm: FormGroup;
  submitted: boolean = false;
  id: number = 0;
  constructor(
    private fb: FormBuilder,
    private prodService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrService
  ) {
    this.productForm = this.fb.group({
      productID: [0],
      productName: ['', [Validators.required]],
      productDesc: ['', [Validators.required]],
      hsnCode: [''],
      expDate: [''],
      //expDate: [formatDate('', 'dd-MM-yyyy', 'en')],
      price: [],
      productLinks: this.fb.array([
        this.fb.group({
          links: ['', [Validators.required]]
        })
      ])
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params.id);
      if (this.id > 0) {
        this.prodService.GetByID(this.id).subscribe((res: Product) => {
          console.log(res);
          this.productForm.patchValue(res);
          this.pl.clear();
          // this.pl.patchValue(res.productLinks);
          res.productLinks.forEach(t => {
            this.pl.push(this.fb.group({
              links: [t.links, [Validators.required]]
            }));
          });
        });
      }
    })
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
  Update(): any {
    this.submitted = true;
    if (!this.productForm.valid) {
      console.log(this.productForm)
      return;
    }
    else {
      this.prodService.Update(this.productForm.value).subscribe((res) => {
        if (res.statusCode == 1) {
          this.toast.success(res.messgae);
          this.router.navigateByUrl("");
        }
        else {
          this.toast.error(res.messgae);
        }
      });
    }
  }

}
