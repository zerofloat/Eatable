// will only run once the page (DOM) is ready for JavaScript code to execute
$(document).ready(function () {
  console.log("JS loaded");

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
        var randomMeals = [];
        var sectionIds = ["starter", "main"];

        // Clear existing images
        $(".meal-thumb").remove();

        // Clear existing meal names
        $(".recipe-header").remove();

        // Clear existing meal names
        $(".recipe-description").remove();

        // Generate two random indices
        var randomIndex1 = Math.floor(Math.random() * data.meals.length);
        var randomIndex2 = Math.floor(Math.random() * data.meals.length);
        // Make sure the two indices are not the same
        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * data.meals.length);
        }
        // Retrieve the meals at the random indices
        randomMeals.push(data.meals[randomIndex1]);
        randomMeals.push(data.meals[randomIndex2]);
        console.log(randomMeals[0]);

        // Add the image element to the specified section and set the src attribute
        $("#starter").prepend(
          `<img class="meal-thumb" src="${randomMeals[0].strMealThumb}" alt="${randomMeals[0].strMeal}">`
        );
        $("#main").prepend(
          `<img class="meal-thumb" src="${randomMeals[1].strMealThumb}" alt="${randomMeals[1].strMeal}">`
        );

        // Add meal name to the specified section
        // $('#starter'  + ' .container').prepend(`<h4 class="recipe-header"> ${randomMeals[0].strMeal} </h4>`);
        $("#starter").find("#recipe-header").text(randomMeals[0].strMeal);
        $("#main").find("#recipe-header").text(randomMeals[1].strMeal);
        // $('#main' + ' .container').prepend(`<h4 class="recipe-header"> ${randomMeals[1].strMeal} </h4>`);

        callBack(randomMeals[0].idMeal, randomMeals[1].idMeal);
      });
  }

  // TODO: Get recipeID to return the matching ingredients
  function getRecipe(starterID, mainID) {
    recipeQueryURL1 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${starterID}`;
    recipeQueryURL2 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mainID}`;

    fetch(recipeQueryURL1)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.meals[0]);
        $("#starter").find("#location").text(data.meals[0].strArea);
        $("#starter").find("#category").text(data.meals[0].strCategory);

        // Set modal content
        $("#recipeModal").html(`
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            <p>${data.meals[0].strInstructions}</p>
        `);
         // checks if meals property exists and is not null
         if (data.meals && data.meals.length > 0) {
          //storing meal category in var
          var mealCategory = data.meals[0].strCategory;
          console.log(mealCategory);

          // condition to extract if it is a dessert
          if (mealCategory === "Dessert") {
            // clear existing content in #dessert container
            $("#dessert").children('img').remove();
            // updating HTML
            dessertImage = $("<img>");
            dessertImage.attr({
              src: data.meals[0].strMealThumb,
              alt: 'Dessert'
            });
            $("#dessert").prepend(dessertImage);
            $("#dessert #recipe-header").text(data.meals[0].strMeal);
          } else {
            console.log(
              "Keep searching and find me a recipe with that ingredient !! >_<");
            // call getMeals function again to search for more desserts with the same ingredient
            getMeals($("#form-input").val().trim(), getRecipe);
          }
        }
      });

    fetch(recipeQueryURL2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        $("#main").find("#location").text(data.meals[0].strArea);
        $("#main").find("#category").text(data.meals[0].strCategory);
      });
  }

  function getDrink(ingredientName) {
    drinkQueryURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;

    fetch(drinkQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#drink").children("img").remove();
        //randomly choose between fetched recipes
        var randomDrink =
          data.drinks[Math.floor(Math.random() * data.drinks.length)];
        console.log(randomDrink);
        //pull img from fetched data and set as source for new img element
        drinkImg = $("<img>").attr({
          src: randomDrink.strDrinkThumb,
          width: 300,
          height: 300,
        });
        $("#drink").prepend(drinkImg);
        // add fetched recipe title to title element
        $("#drink #recipe-header").text(randomDrink.strDrink);
      });
  }

  // Attach a click event listener to the search button to trigger the getRecipe function

  // Attach a click event listener to the search button to trigger the getRecipe function
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var inputValue = $("#form-input").val().trim();
    var errorMsg = $("#error-message");

    if (inputValue !== "") {
      // Check if input is not empty
      errorMsg.text("");
      getMeals(inputValue, getRecipe);
      getDrink(inputValue);
      $("#form-input").val("");

      // Remove the "hide" class from the recipe grid
      $("#recipe-grid").removeClass("hide");
    } else {
      errorMsg.text("Input value is empty. Please enter an ingredient.");
    }
  });

  $("#save-button").on("click", function (event) {
    event.preventDefault();

    console.log("save clicked");
  });

  // Attach a click event listener to the "View Recipe" button
  $("#view-recipe").on("click", function (event) {
    event.preventDefault();
    // Show the jQuery UI dialog
    $("#recipeModal").dialog("open");
  });

  // Initialize jQuery UI dialog
  $("#recipeModal").dialog({
    autoOpen: false, // Dialog is initially hidden
    modal: true, // Make it modal (overlay background)
    width: "60%", // Set width as needed
    buttons: {
      Close: function () {
        $(this).dialog("close");
      },
    },
  });
});
