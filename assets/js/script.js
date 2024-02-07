// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    console.log('JS loaded');

    var mealQueryURL;
    var recipeQueryURL1;
    var recipeQueryURL2;
    var queryKey;
    var ingredient;
    var course;
    var mealType;
    var mealQueryString;
    var healthLabel;
    var starterID;
    var mainID;
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
        fetch(mealQueryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                // Pass the array of meals to the callback function
                callBack(data.meals);
            });
    }



    // TODO: Get recipeID to return the matching ingredients
    function getRecipe(starterID, mainID, dessertID) {
        // Define an array of meal categories to check against
        var mealOptions = [
            'Beef',
            'Chicken',
            'Vegan',
            'Lamb',
            'Miscellaneous',
            'Pasta',
            'Pork',
            'Seafood',
            'Side',
            'Vegetarian',
            'Breakfast',
            'Goat',
            'Starter'
        ];

        var dessertOption = "Dessert";

        // Define the query URLs for the two meals
        var recipeQueryURL1 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${starterID}`;
        var recipeQueryURL2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mainID}`;
        var recipeQueryURL3 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dessertID}`;

        // Fetch data for the first meal
        fetch(recipeQueryURL1)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data.meals);

                // Check if the meal category matches any of the options
                if (mealOptions.includes(data.meals[0].strCategory)) {
                    var meal1 = data.meals[0];
                    var mealCategory = meal1.strCategory;
                    var mealArea = meal1.strArea;

                    $('#starter').find('.save-button').attr('data-meal-id', meal1.idMeal);

                    // Clear existing images and text for starter section
                    $('#starter').find('.meal-thumb').remove();
                    $('#starter').find('#recipe-header').text('');

                    // Output image and name for starter section
                    $('#starter').prepend(`<img class="meal-thumb" src="${meal1.strMealThumb}" alt="${meal1.strMeal}">`);
                    $('#starter').find('#recipe-header').text(meal1.strMeal);

                    if (mealOptions.includes(mealCategory)) {
                        // Update HTML for the starter section with the first meal
                        $('#starter').find('#location').text(mealArea);
                        $('#starter').find('#category').text(mealCategory);
                    } else {
                        $('#error-message').text("No meal found for the starter.");
                        $('.error-container').show();

                    }
                }
            });

        // Fetch data for the second meal
        fetch(recipeQueryURL2)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                // Check if the meal category matches any of the options
                if (mealOptions.includes(data.meals[0].strCategory)) {
                    var meal2 = data.meals[0];
                    var mealCategory = meal2.strCategory;
                    var mealArea = meal2.strArea;

                    $('#main').find('.save-button').attr('data-meal-id', meal2.idMeal);

                    // Clear existing images and text for main section
                    $('#main').find('.meal-thumb').remove();
                    $('#main').find('#recipe-header').text('');

                    // Output image and name for main section
                    $('#main').prepend(`<img class="meal-thumb" src="${meal2.strMealThumb}" alt="${meal2.strMeal}">`);
                    $('#main').find('#recipe-header').text(meal2.strMeal);

                    if (mealOptions.includes(mealCategory)) {
                        // Update HTML for the main section with the second meal
                        $('#main').find('#location').text(mealArea);
                        $('#main').find('#category').text(mealCategory);
                    } else {
                        $('#error-message').text("No meal found for the main.");
                        $('.error-container').show();
                    }
                }
            });

        fetch(recipeQueryURL3)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                if (dessertOption.includes(data.meals[0].strCategory)) {
                    var meal3 = data.meals[0];
                    var mealCategory = meal3.strCategory;
                    console.log(mealCategory);
                    var mealArea = meal3.strArea;

                    $('#dessert').find('.save-button').attr('data-meal-id', meal3.idMeal);


                    $('#dessert').find('.meal-thumb').remove();
                    $('#dessert').find('#recipe-header').text('');

                    $('#dessert').prepend(`<img class="meal-thumb" src="${meal3.strMealThumb}" alt="${meal3.strMeal}">`);
                    $('#dessert').find('#recipe-header').text(meal3.strMeal);

                    $('#dessert').find('#location').text(mealArea);
                    // $('#dessert').find('#category').text(mealCategory);

                    if (mealOptions.includes(mealCategory)) {
                        console.log('hello');
                    } else {
                        $('#error-message').text("No meal found for the dessert");
                        $('.error-container').show();
                    }
                }
            });

    }


    function getDrink(ingredientName) {

        drinkQueryURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(drinkQueryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $('#drink').children('img').remove();
                //randomly choose between fetched recipes
                var randomDrink = data.drinks[Math.floor(Math.random() * data.drinks.length)];
                console.log(randomDrink);
                //pull img from fetched data and set as source for new img element
                drinkImg = $('<img>').attr('src', randomDrink.strDrinkThumb);
                $('#drink').prepend(drinkImg);
                // add fetched recipe title to title element
                $('#drink #recipe-header').text(randomDrink.strDrink);
                $('#drink').find('#location').text(randomDrink.mealArea);
                $('#drink').find('#category').text(randomDrink.mealCategory);

            })

    }


    // Attach a click event listener to the search button to trigger the getRecipe function

    // Attach a click event listener to the search button to trigger the getRecipe function
    // Attach a click event listener to the search button to trigger the getMeals function
    $("#search-button").on('click', function (event) {
        event.preventDefault();
        var inputValue = $('#form-input').val().trim();
        var errorMsg = $('#error-message');

        if (inputValue !== "") {
            errorMsg.text("");
            getMeals(inputValue, function (meals) {
                if (meals && meals.length >= 3) { // Changed condition to check for at least three meals
                    var randomIndexes = [];
                    while (randomIndexes.length < 3) { // Generate three unique random indexes
                        var randomIndex = Math.floor(Math.random() * meals.length);
                        if (!randomIndexes.includes(randomIndex)) {
                            randomIndexes.push(randomIndex);
                        }
                    }
                    var starterID = meals[randomIndexes[0]].idMeal;
                    var mainID = meals[randomIndexes[1]].idMeal;
                    var dessertID = meals[randomIndexes[2]].idMeal;
                    getRecipe(starterID, mainID, dessertID);
                } else {
                    errorMsg.text("Not enough meals found with the provided ingredient");
                }
            });
            getDrink(inputValue);
            $('#form-input').val("");
            $('#recipe-grid').removeClass('hide');
        } else {
            errorMsg.text("Please enter an ingredient");
        }
    });



    // Attach a click event listener to the "View Recipe" button
    $("#view-recipe").on('click', function (event) {
        event.preventDefault();
        // Show the jQuery UI dialog
        $("#recipeModal").dialog("open");
    });

 // Use class selector to target all save buttons
$(".save-button").on('click', function (event) {
    event.preventDefault();
    // Log the data attribute of the clicked button
    var mealId = $(this).attr('data-meal-id');
    console.log("Meal ID:", mealId);
});

    // Initialize jQuery UI dialog
    $("#recipeModal").dialog({
        autoOpen: false, // Dialog is initially hidden
        modal: true, // Make it modal (overlay background)
        width: "60%", // Set width as needed
        buttons: {
            "Close": function () {
                $(this).dialog("close");
            }
        }
    });


});