interface IUser{
    email: string;
    password: string
}


interface IUserRegistrationDetails{
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

interface IUserModel{
    name: string;
    email: string;
    password: string;
    created_At: Date;
    updated_At: Date
}

interface IIngredientsData{
    name: string,
    price: number
}

interface IRecipeData{
    title: string;
    meal_type: string;
    difficulty_level: string;
    ingredients: [IIngredientsData];
    preparation: string
}

interface IRecipe{
    title: string;
    meal_type: string;
    difficulty_level: string;
    ingredients: [IIngredientsData];
    preparation: string;
    created_At: Date;
    updated_At: Date
}