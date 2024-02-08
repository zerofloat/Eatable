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
        }


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
            });

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

    function getSavedRecipes(params) {
        var savedRecipes = JSON.parse(localStorage.getItem("savedMeals"));
        // console.log(savedRecipes[0].mealCat);
        console.log(savedRecipes);

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

                    } else if (element.mealCat === "Side" || element.mealCat === "Starter" || element.mealCat === "Miscellaneous"  || element.mealCat === "Breakfast"  ) {
                        $('.my-starters .card-h4').text('My Starters');

                        $('.my-starters .recipe-cards').append(`
                        
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMealThumb}">
                            <div class="card-body">
                                <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                <p class="card-text">${data.meals[0].strArea}</p>
                                ${
                                    data.meals[0].strYoutube !== "" ? 
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
                                ${
                                    data.meals[0].strYoutube !== "" ? 
                                    `<a href="${data.meals[0].strYoutube}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                    (data.meals[0].strSource !== "" ?
                                    `<a href="${data.meals[0].strSource}" target="_blank" class="btn btn-primary">View Recipe</a>` :
                                    `<button class="btn btn-primary" disabled>Coming Soon</button>`)
                                }
                            </div>
                        </div>
                        </div>
                    `);
                    }
                   

                })

        }
    }

    getSavedRecipes()

});