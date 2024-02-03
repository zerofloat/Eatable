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
    var recipeStr;
    var recipeInstr;
    var recipeArray;
    var drinkImg;
    var drinkQueryURL;
    var drinkInstr;

    function getMeals(ingredientName, callBack) {

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
                callBack(recipeID);
                // return recipeID;
            })
    }


    // TODO: Get recipeID to return the matching ingredients
    function getRecipe(recipeID) {
        // event.preventDefault();
        recipeQueryURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`;

        fetch(recipeQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < 4; i++) {
                // console.log(data.meals[i].strMealThumb);
                // console.log(data.meals[i].strInstructions);
                // recipeInstr = $('<p>').text(data.meals[i].strInstructions);
                
                recipeImg = $('<img>').attr({
                    src: data.meals[i].strMealThumb,
                    width: 300,
                    height: 300
                });
  
            }
     
        
        })
    }

  getRecipe();

    function getDrink(ingredientName) {


        drinkQueryURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(drinkQueryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#drink').children('img').remove();
            //randomly choose between fetched recipes
            var randomDrink = data.drinks[Math.floor(Math.random()*data.drinks.length)];
            console.log(randomDrink);
            //pull img from fetched data and set as source for new img element
            drinkImg = $('<img>').attr({
                src: randomDrink.strDrinkThumb,
                width: 300,
                height: 300,
            });
        $('#drink').prepend(drinkImg);
        // add fetched recipe title to title element
        $('#drink #recipe-header').text(randomDrink.strDrink);
            
            

        })



    }


    // Attach a click event listener to the search button to trigger the getRecipe function

    $("#search-button").on('click', function (event) {
        event.preventDefault();
        getMeals($('#form-input').val().trim(), getRecipe);
        getDrink($('#form-input').val().trim());

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
