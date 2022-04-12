import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/Models/product';
import { ProductServiceService } from 'src/app/Services/product-service.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  prod: Product[] = [];

  constructor(private prodService: ProductServiceService
    , private toast: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.LoadProducts();
    this.primengConfig.ripple = true;
  }

  LoadProducts() {
    this.prodService.GetAll().subscribe((res) => {
      this.prod = res
    });
  }

  // Delete(id: number) {
  //   if (id > 0) {
  //     this.prodService.Delete(id).subscribe((res) => {
  //       if (res.statusCode == 1) {
  //         this.toast.success(res.messgae);
  //         this.LoadProducts();
  //       }
  //       else {
  //         this.toast.error(res.messgae);
  //       }
  //     });
  //   }
  // }

  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      //target: event.target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (id > 0) {
          this.prodService.Delete(id).subscribe((res) => {
            if (res.statusCode == 1) {
              this.toast.success(res.messgae);
              this.LoadProducts();
            }
            else {
              this.toast.error(res.messgae);
            }
          });
        }

      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }

}
