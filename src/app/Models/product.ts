export class Product {
  productID: number = 0;
  productName: string = '';
  productDesc: string = '';
  hsnCode: string = '';
  expDate: Date = new Date();
  price: number = 0;
  productLinks: Array<ProductLink> = [];
}

export class ProductLink {
  links: string = '';
}
