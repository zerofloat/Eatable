console.log('JS loaded');

var queryURL;
var queryKey;
var queryID;
var ingredient;
var course;
var mealType;
var mealQueryString;
var healthLabel;
var recipe;
var recipeImg;

function getRecipe() {

    queryID = 'cf4c29ad';
    // queryKey = '7a8da848a7f9a13b96f5cae45923af90';
    // mealType array values to be selected by dropdown/checkboxes
    mealType = ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'];
    ingredient = 'bok choi';
    mealQueryString = '&mealType=';



    queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredient}&app_id=${queryID}&app_key=${queryKey}${mealQueryString}${mealType[2]}`;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // randomise which recipes are selected from the response with pseudorandom number gen

            recipeImg = data.hits[0].recipe.images.LARGE.url;
            // console.log(recipeImg);
            console.log(data.hits);

        }
        )
}


function getCocktail() {

    ingredientCocktail = '';
    queryURL = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientCocktail}`;
}


// &mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime