export class PriceCatalog {
    priceCatelogId!: number;
    productId!: number;
    retail?: number;       // Optional property
    agent?: number;        // Optional property
    wholeSale?: number;    // Optional property
  
    // Related Object (Optional)
    product?: any;         // Replace `any` with the `ProductMaster` model if available
  
    constructor(
      priceCatelogId: number,
      productId: number,
      retail?: number,
      agent?: number,
      wholeSale?: number,
      product?: any
    ) {
      this.priceCatelogId = priceCatelogId;
      this.productId = productId;
      this.retail = retail;
      this.agent = agent;
      this.wholeSale = wholeSale;
      this.product = product;
    }
  }
  