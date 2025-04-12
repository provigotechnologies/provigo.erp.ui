export class Ingredient {
    ingId!: number;
    recipeId!: number;
    productId!: number;
    unitId!: number;
    quantity!: number;
    description!: string;
  
    // Related Objects (Optional)
    recipe?: any;  // Replace `any` with the `RecipeMaster` model if available
    product?: any;  // Replace `any` with the `ProductMaster` model if available
    unit?: any;     // Replace `any` with the `UnitMaster` model if available
  
    constructor(
      ingId: number,
      recipeId: number,
      productId: number,
      unitId: number,
      quantity: number,
      description: string,
      recipe?: any,
      product?: any,
      unit?: any
    ) {
      this.ingId = ingId;
      this.recipeId = recipeId;
      this.productId = productId;
      this.unitId = unitId;
      this.quantity = quantity;
      this.description = description;
      this.recipe = recipe;
      this.product = product;
      this.unit = unit;
    }
  }
  