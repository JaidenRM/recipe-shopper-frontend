export interface IRecipe {
    id: number
    name: string
    description: string
    totalPrice: number
    servings: number
    durationMinutes: number
    tags: string
    ingredients: IIngredient[]
    instructions: IInstruction[]
}

export interface IInstruction {
    id: number
    order: number
    description: string
}

export interface IIngredient {
    id: number
    name: string
    quantity: number
    unit: string
    product?: IProduct
}

export interface IProduct {
    id: number
    supermarketId: number
    name: string
}