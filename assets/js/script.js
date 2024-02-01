// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
console.log('JS loaded');

var queryURL;
var queryKey;
var ingredient;
var course;
var mealType;
var mealQueryString;
var healthLabel;
var recipe;
var recipeImg;
var recipeArray;

function getRecipe(ingredientName) {

    console.log(ingredientName);
    queryURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${ingredientName}`;
    // queryURL = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
    


    // mealType array values to be selected by dropdown/checkboxes

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);})





        }


function getCocktail() {

    ingredientCocktail = '';
    queryURL = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientCocktail}`;
}

function getRec(params) {
    
}

// Attach a click event listener to the search button to trigger the getRecipe function

$("#search-button").on('click', function (event) {
    event.preventDefault();
    getRecipe($('#form-input').val().trim());

    $('#form-input').val("");
});



// &mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime
})


    //         recipeArray = [];
    //         // receipeDiv
    //         for (let i = 0; i < 1; i++) {
    //             recipeEach = data.hits[i];                
    //         }

    //         recipe = data.hits[0]
    //         recipeImg = data.hits[0].recipe.images.LARGE.url;

    //         console.log(data.hits);

    //     }
    //     )
    // }
    // )
