// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
    console.log('JS loaded');

    // Call getSavedRecipes when the DOM is ready
    getSavedRecipes();

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
    var mainsRecipes = [];
    var starterRecipes = [];
    var dessertRecipes = [];
    var drinksRecipes = [];
    var mealOptions = [
        'Beef',
        'Chicken',
        'Vegan',
        'Lamb',
        'Pasta',
        'Pork',
        'Seafood',
        'Vegetarian',
        'Goat',
        'Miscellaneous',
        'Side',
        'Breakfast',
        'Starter'

    ];
    var savedMeals = [];
   
    console.log(savedMeals);


    function getMeals(ingredientName, callBack) {
        // console.log(ingredientName);
        mealQueryURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
        fetch(mealQueryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // console.log(data);
                // Pass the array of meals to the callback function
                callBack(data.meals);
            });
    }

    function getStarter(ingredientName, callback) {
        var starterIngURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(starterIngURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var starterIDs = [];

                for (let i = 0; i < data.meals.length; i++) {
                    const meal = data.meals[i];
                    starterIDs.push(meal.idMeal);
                }

                // Map each fetch request to a promise
                var fetchPromises = starterIDs.map(async function (recipe) {
                    var starterRecURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`;

                    const response = await fetch(starterRecURL);
                    const data = await response.json();
                    // Check if the category is dessert
                    if (mealOptions.includes(data.meals[0].strCategory)) {
                        return data.meals[0];
                        // console.log( data.meals[0]);
                    }
                });

                // Wait for all promises to resolve
                return Promise.all(fetchPromises);
            })
            .then(function (mains) {
                // Filter out undefined values and add to dessertRecipes
                starterRecipes.push(...mains.filter(recipe => recipe !== undefined));
                // console.log("Mains Recipes:", mainsRecipes);
                callback();
            });
    }




    function getMain(ingredientName, callback) {
        var mainIngURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(mainIngURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var mainsIDs = [];

                for (let i = 0; i < data.meals.length; i++) {
                    const meal = data.meals[i];
                    mainsIDs.push(meal.idMeal);
                }

                // Map each fetch request to a promise
                var fetchPromises = mainsIDs.map(async function (recipe) {
                    var mainRecURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`;

                    const response = await fetch(mainRecURL);
                    const data = await response.json();
                    // Check if the category is dessert
                    if (mealOptions.includes(data.meals[0].strCategory)) {
                        return data.meals[0];
                        // console.log( data.meals[0]);
                    }
                });

                // Wait for all promises to resolve
                return Promise.all(fetchPromises);
            })
            .then(function (mains) {
                // Filter out undefined values and add to dessertRecipes
                mainsRecipes.push(...mains.filter(recipe => recipe !== undefined));
                // console.log("Mains Recipes:", mainsRecipes);
                callback();
            });
    }


    function getDessert(ingredientName, callback) {
        var dessertIngURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(dessertIngURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var dessertIDs = [];

                for (let i = 0; i < data.meals.length; i++) {
                    const meal = data.meals[i];
                    dessertIDs.push(meal.idMeal);
                }

                // Map each fetch request to a promise
                var fetchPromises = dessertIDs.map(async function (recipe) {
                    var dessertRecURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe}`;

                    const response = await fetch(dessertRecURL);
                    const data = await response.json();
                    // Check if the category is dessert
                    if (data.meals[0].strCategory === "Dessert") {
                        return data.meals[0];
                    }
                });

                // Wait for all promises to resolve
                return Promise.all(fetchPromises);
            })
            .then(function (desserts) {
                // Filter out undefined values and add to dessertRecipes
                dessertRecipes.push(...desserts.filter(recipe => recipe !== undefined));
                // console.log(dessertRecipes);
                callback();
            });
    }



    function getDrink(ingredientName, callback) {

        var drinkQueryURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

        fetch(drinkQueryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                var drinkIDs = [];

                for (let i = 0; i < data.drinks.length; i++) {
                    const drink = data.drinks[i];
                    // console.log(drink);
                    drinkIDs.push(drink.idDrink);
                }

                // Map each fetch request to a promise
                var fetchPromises = drinkIDs.map(async function (recipe) {
                    var drinkRecURL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipe}`;

                    const response = await fetch(drinkRecURL);
                    const data = await response.json();

                    // console.log(data.drinks[0]);
                    return data.drinks[0];

                });

                // Wait for all promises to resolve
                return Promise.all(fetchPromises);
            })
            .then(function (drinks) {
                // Filter out undefined values and add to dessertRecipes
                drinksRecipes.push(...drinks.filter(recipe => recipe !== undefined));
                // console.log(dessertRecipes);
                callback();
            });

    }



    function displayMeals() {

        // Display starter
        var randomStarter = starterRecipes[Math.floor(Math.random() * starterRecipes.length)];
        console.log('random starter ', randomStarter);
        if (randomStarter) {
            $('#starter').find('.save-button').attr({
                'data-meal-id': randomStarter.idMeal,
                'data-meal-category': randomStarter.strCategory
            });
            $('#starter').find('.meal-thumb').remove();
            $('#starter').find('#recipe-header').text('');
            var starterImage = $('<img class="meal-thumb">').attr({
                src: randomStarter.strMealThumb,
                alt: randomStarter.strMeal,
            });
            $("#starter").prepend(starterImage);
            $("#starter #recipe-header").text(randomStarter.strMeal);
            $("#starter #location").text(randomStarter.strArea);

            var viewRecipeButton = $('#starter').find('#view-recipe');

            if (randomStarter.strYoutube.trim() !== '' || randomStarter.strSource.trim() !== '') {
                viewRecipeButton.attr({
                    'href': randomStarter.strYoutube.trim() !== '' ? randomStarter.strYoutube : randomStarter.strSource,
                    'target': '_blank'
                });
            } else {
                viewRecipeButton.text('Coming Soon').prop('disabled', true);
            }


        }


        // Display main
        var randomMain = mainsRecipes[Math.floor(Math.random() * mainsRecipes.length)];
        console.log('random main: ', randomMain);
        if (randomMain) {
            $('#main').find('.save-button').attr({
                'data-meal-id': randomMain.idMeal,
                'data-meal-category': randomMain.strCategory
            });
            $('#main').find('.meal-thumb').remove();
            $('#main').find('#recipe-header').text('');
            var mainImage = $('<img class="meal-thumb">').attr({
                src: randomMain.strMealThumb,
                alt: randomMain.strMeal,
            });
            $("#main").prepend(mainImage);
            $("#main #recipe-header").text(randomMain.strMeal);
            $("#main #location").text(randomMain.strArea);


            var viewRecipeButton = $('#main').find('#view-recipe');

            if (randomMain.strYoutube.trim() !== '' || randomMain.strSource.trim() !== '') {
                viewRecipeButton.attr({
                    'href': randomMain.strYoutube.trim() !== '' ? randomMain.strYoutube : randomMain.strSource,
                    'target': '_blank'
                });
            } else {
                viewRecipeButton.text('Coming Soon').prop('disabled', true);
            }


        }

        // Display dessert
        var randomDessert = dessertRecipes[Math.floor(Math.random() * dessertRecipes.length)];
        if (randomDessert) {
            $('#dessert').find('.save-button').attr({
                'data-meal-id': randomDessert.idMeal,
                'data-meal-category': randomDessert.strCategory
            });
            $('#dessert').find('.meal-thumb').remove();
            $('#dessert').find('#recipe-header').text('');
            var dessertImage = $('<img class="meal-thumb">').attr({
                src: randomDessert.strMealThumb,
                alt: randomDessert.strMeal,
            });
            $("#dessert").prepend(dessertImage);
            $("#dessert #recipe-header").text(randomDessert.strMeal);
            $("#dessert #location").text(randomDessert.strArea);

            var viewRecipeButton = $('#dessert').find('#view-recipe');

            if (randomDessert.strYoutube.trim() !== '' || randomDessert.strSource.trim() !== '') {
                viewRecipeButton.attr({
                    'href': randomDessert.strYoutube.trim() !== '' ? randomDessert.strYoutube : randomDessert.strSource,
                    'target': '_blank'
                });
            } else {
                viewRecipeButton.text('Coming Soon').prop('disabled', true);
            }

        }
        // Display drinks

        var randomDrink = drinksRecipes[Math.floor(Math.random() * drinksRecipes.length)];
        console.log(randomDrink);
        if (randomDrink) {
            $('#drink').find('.save-button').attr({
                'data-meal-id': randomDrink.idDrink
            });
            $('#drink').find('.drink-thumb').remove();
            $('#drink').find('#recipe-header').text('');
            var drinkImage = $('<img class="drink-thumb">').attr({
                src: randomDrink.strDrinkThumb,
                alt: randomDrink.strDrink,
            });
            $("#drink").prepend(drinkImage);
            $("#drink #recipe-header").text(randomDrink.strDrink);
            $("#drink #location").text(randomDrink.strAlcoholic);

            var viewRecipeButton = $('#drink').find('#view-recipe');

    
            var instructions = randomDrink.strInstructions;
            var steps = instructions.split(/\.\s*/); // Split instructions by full stop with optional following whitespace

            // Format each step with a numbered list
            var formattedInstructions = '<ol>';
            for (var i = 0; i < steps.length; i++) {
                if (steps[i].trim() !== '') { // Exclude empty lines
                    formattedInstructions += '<li>' + steps[i].trim() + '</li>';
                }
            }
            formattedInstructions += '</ol>';
            $('#modal-image').attr('src', randomDrink.strDrinkThumb);
            $('#modal-image').attr('style', 'width: 350px;');
            $("#dialog").dialog("option", "title", `${randomDrink.strDrink} - ${randomDrink.strAlcoholic} `);
            $('#modal-recipe').html(formattedInstructions); // Set the formatted instructions


            $('#modal-ing').empty(); // Clear previous ingredients (if any)

            for (var i = 1; i <= 15; i++) { // Loop through each ingredient (assuming maximum 15 ingredients)
                var ingredient = randomDrink['strIngredient' + i];
                if (ingredient !== null && ingredient.trim() !== '') { // Check if ingredient exists and is not empty
                    $('#modal-ing').append('<b>' + i + '.</b> ' + ingredient + '<br>'); // Append the ingredient with its number to the modal paragraph
                }
            }

        }
    }

    $("#dialog").dialog({
        autoOpen: false,
        modal: true,
        width: '40%'
    });

    $('#drink #view-recipe').on('click', function() {
      console.log('hello');
        $("#dialog").dialog("open");
    });



    // Attach a click event listener to the search button to trigger the getMeals function
    $("#search-button").on('click', function (event) {
        event.preventDefault();
        var inputValue = $('#form-input').val().trim();
        var errorMsg = $('#error-message');

        if (inputValue !== "") {
            errorMsg.text("");

            // Clear previously saved buttons
            $(".save-button").removeClass('saved-button');
            $(".save-button").text('Save');

            // Call getMeals first
            getMeals(inputValue, function (meals) {
                // Call other functions after getMeals completes
                getDrink(inputValue);
                getDessert(inputValue, function () {
                    displayMeals();
                });
                getMain(inputValue, function () {
                    displayMeals();
                });
                getStarter(inputValue, function () {
                    displayMeals();
                });
                getDrink(inputValue, function () {
                    displayMeals();
                });
            });

            $('#form-input').val("");
            $('#recipe-grid').removeClass('hide');
        } else {
            errorMsg.text("Please enter an ingredient");
        }
    });



    // Use class selector to target all save buttons
    $("#drink .save-button").on('click', function (event) {
        event.preventDefault();

        console.log('hello');
    });




    // Use class selector to target all save buttons
    $(".save-button").on('click', function (event) {
        event.preventDefault();
        // Log the data attribute of the clicked button
        var mealId = $(this).attr('data-meal-id');
        var mealCat = $(this).attr('data-meal-category');

        // Check the current text of the button
        if ($(this).text() === 'Save') {
            // If current text is "Save", change it to "Saved"
            $(this).text('Saved');
            $(this).addClass('saved-button');
            savedMeals.push({ mealId: mealId, mealCat: mealCat });
            console.log("Meal ID:", mealId, "saved");
            console.log(savedMeals);

            // Save the updated savedMeals array to local storage
            localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
        } else {
            // If current text is "Saved", change it back to "Save"
            $(this).text('Save');
            $(this).removeClass('saved-button');
            console.log("Meal ID:", mealId, "unsaved");

            // Find the index of mealId in savedMeals array
            var index = savedMeals.findIndex(function (item) {
                return item.mealId === mealId;
            });

            //if value is not found -1 is always returned so make sure index is != -1 to continue
            if (index !== -1) {
                // Remove the mealId from the savedMeals array, 1 is the number of elements to remove starting from index
                savedMeals.splice(index, 1);
                console.log("Meal ID:", mealId, "removed from savedMeals");
                console.log(savedMeals);
                // Save the updated savedMeals array to local storage
                localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
            } else {
                console.log("Meal ID:", mealId, "not found in savedMeals");
            }
        }
    });


    function getSavedRecipes(params) {
        var savedRecipes = localStorage.getItem("savedMeals");
    
        // Check if savedRecipes is truthy
        if (savedRecipes) {
            savedRecipes = JSON.parse(savedRecipes);
    
            for (let k = 0; k < savedRecipes.length; k++) {
                const element = savedRecipes[k];
                console.log(element);
    
                savedQueryURL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${element.mealId}`;
    
                fetch(savedQueryURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
    
                        if (element.mealCat === "Dessert") {
                            console.log('hello', element.mealId);
    
                            $('.my-desserts .card-h4').text('My Desserts');
    
                            $('.my-desserts .recipe-cards').append(`
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${data.meals[0].strMealThumb}" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                        <p class="card-text">${data.meals[0].strArea}</p>
                                        ${
                            //check if data.meals[0].strYoutube is not an empty string. If it's not empty, we use it as the link for the "View Recipe" button
                            data.meals[0].strYoutube !== "" ?
                                `<a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                (data.meals[0].strSource !== "" ?
                                    `<a href="${data.meals[0].strSource}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                    `<button class="btn btn-primary" disabled>Coming Soon</button>`)
                            }
                                    </div>
                                </div>
                            `);
                        } else if (element.mealCat === "Side" || element.mealCat === "Starter" || element.mealCat === "Miscellaneous" || element.mealCat === "Breakfast") {
                            $('.my-starters .card-h4').text('My Starters');
    
                            $('.my-starters .recipe-cards').append(`
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMealThumb}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                        <p class="card-text">${data.meals[0].strArea}</p>
                                        ${data.meals[0].strYoutube !== "" ?
                                `<a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                (data.meals[0].strSource !== "" ?
                                    `<a href="${data.meals[0].strSource}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                    `<button class="btn btn-primary" disabled>Coming Soon</button>`)
                            }
                                    </div>
                                </div>
                            `);
                        } else {
                            $('.my-mains .card-h4').text('My Mains');
    
                            $('.my-mains .recipe-cards').append(`
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMealThumb}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                        <p class="card-text">${data.meals[0].strArea}</p>
                                        ${data.meals[0].strYoutube !== "" ?
                                `<a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                (data.meals[0].strSource !== "" ?
                                    `<a href="${data.meals[0].strSource}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                    `<button class="btn btn-primary" disabled>Coming Soon</button>`)
                            }
                                    </div>
                                </div>
                            `);
                        }
                    })
            }
        } else {
            console.log("No saved recipes found.");
        }
    }
    

    getSavedRecipes()

});