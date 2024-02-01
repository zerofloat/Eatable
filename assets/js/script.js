// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
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
var recipeArray;
var searchInput;


    //parameters for API call - present meal options in DOM
    mealType = ['Breakfast', 'Dinner', 'Lunch', 'Snack', 'Teatime'];
    
    mealQueryString = '&mealType=';

    
    $('#submit').on('click' , function () {
        event.preventDefault();
        searchInput = $('search').val().trim();
        log(searchInput);
        

        // API strings
        queryID = 'cf4c29ad';
        // queryKey = '7a8da848a7f9a13b96f5cae45923af90'; commented out to prevent accidental rate-limiting
        queryURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${queryID}&app_key=${queryKey}${mealQueryString}${mealType[2]}`;


    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            recipeArray = [];
            // receipeDiv
            for (let i = 0; i < 1; i++) {
                recipeEach = data.hits[i];                
            }

            recipe = data.hits[0]
            recipeImg = data.hits[0].recipe.images.LARGE.url;

            console.log(data.hits);

        }
        )
    }
    )



function getCocktail() {

    ingredientCocktail = '';
    queryURL = `www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientCocktail}`;
}

// Attach a click event listener to the search button to trigger the displayRecipe function

$("#search-button").on('click', function (event) {
    event.preventDefault();
    console.log('Clicked');
});

// &mealType=Breakfast&mealType=Dinner&mealType=Lunch&mealType=Snack&mealType=Teatime
});

