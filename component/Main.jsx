import React from "react"
import ClaudeRecipe from "./ClaudeRecipe.jsx"
import IngredientsList from "./IngredientsList.jsx"
import { getRecipeFromMistral } from "../api/AI.js"

export default function Main(){

const [ingredients, setIngredients] = React.useState([])

const [recipe, setRecipe] = React.useState("")

async function getRecipe(){
    const generatedRecipe = await getRecipeFromMistral(ingredients)
    setRecipe(generatedRecipe)
}

    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        
        setIngredients(preIngredient => [
            ...preIngredient, 
            newIngredient]
        )
    }

    
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    name="ingredient"
                    type="text" 
                    placeholder="e.g oregano" 
                    aria-label="Add ingredient" />
                <button>+ Add ingredient</button>
            </form>
        
            <IngredientsList 
                ingredients = {ingredients}
                getRecipe={getRecipe}
            />
            {recipe && <ClaudeRecipe recipe={recipe}/> }
            
        </main>
    )
}