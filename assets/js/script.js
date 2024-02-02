// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    console.log('JS loaded');

    var mealQueryURL;
    var recipeQueryURL;
    var queryKey;
    var ingredient;
    var course;
    var mealType;
    var mealQueryString;
    var healthLabel;
    var recipeID;
    var recipeImg;
    var recipeArray;

    function getMeals(ingredientName) {

        console.log(ingredientName);

        mealQueryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
        // queryURL = `www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(mealQueryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var randomMeal = data.meals[Math.floor(Math.random()*data.meals.length)];
                console.log(randomMeal);
                recipeID = randomMeal.idMeal;
                return recipeID;
            })
    }

    console.log(recipeID);

    // TODO: Get recipeID to return the matching ingredients
    function getRecipe() {
        // event.preventDefault();
        recipeQueryURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

        fetch(recipeQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        
        })
    }

  getRecipe();

    function getCocktail() {

        ingredientCocktail = '';
        queryURL = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ingredientCocktail}`;
    }

    function getRec(params) {

    }

    // Attach a click event listener to the search button to trigger the getRecipe function

    $("#search-button").on('click', function (event) {
        event.preventDefault();
        getMeals($('#form-input').val().trim());

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
