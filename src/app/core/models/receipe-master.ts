export class RecipeMaster {
    recipeId!: number;
    productId!: number;
    instructions!: string;
    isActive!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
  
    // Related Object (Optional)
    product?: any;  // Replace `any` with the `ProductMaster` model if available
  
    constructor(
      recipeId: number,
      productId: number,
      instructions: string,
      isActive: boolean,
      createdAt: Date,
      updatedAt: Date,
      product?: any
    ) {
      this.recipeId = recipeId;
      this.productId = productId;
      this.instructions = instructions;
      this.isActive = isActive;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.product = product;
    }
  }
  