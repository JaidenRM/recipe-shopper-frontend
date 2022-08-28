export interface IRecipe {
  id: number;
  name: string;
  description: string;
  totalPrice: number;
  servings: number;
  durationMinutes: number;
  tags: string;
  ingredients: IIngredient[];
  instructions: IInstruction[];
}

export interface IInstruction {
  id: number;
  order: number;
  description: string;
}

export interface IIngredient {
  id: number;
  name: string;
  quantity: number;
  measurementUnit: string;
  linkingProduct?: IProduct;
}

export interface IProduct {
  id: number;
  name: string;
  fullPrice: number;
  currentPrice: number;
  supermarketId: number;
  supermarketName: string;
  imageUrls: {
    small: string;
    medium: string;
    large: string;
  };
}
