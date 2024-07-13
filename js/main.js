let rowData = document.getElementById("Data");
let searchContainer = document.getElementById("search");
let sideNav = $('.side-nav-menu')
let openClose = $(".open-close-icon")
let submitBtn;

//open side nav
function openSideNav() {
    sideNav.animate({ left: 0 }, 800)
    openClose.removeClass("fa-align-justify");
    openClose.addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({ top: 0 }, (i + 10) * 100)
    }
}

//close side nav
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    sideNav.animate({ left: -boxWidth }, 500)
    openClose.addClass("fa-align-justify");
    openClose.removeClass("fa-x");
    $(".links li").animate({ top: 400 }, 600)
}
closeSideNav()
$(".side-nav-menu i.open-close-icon").on('click', function () {
    if (sideNav.css("left") == "0px") {
        closeSideNav()
    }
    else {
        openSideNav()
    }
})

//show loader before loading
$(document).ready(function () {
    searchByName("").then(function () {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
//Get data
async function getCategories() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}
//Get Area
async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}
//get category
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
//get meals of Area
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
//get ingredients meals
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
//get details of meal
async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}
// get ingrediants
async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

//display meals
function displayMeals(meal) {
    let box = "";
    for (let i = 0; i < meal.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${meal[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}

//display categories
function displayCategories(meal) {
    let box = "";

    for (let i = 0; i < meal.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${meal[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${meal[i].strCategory}</h3>
                        <p>${meal[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}
//Dispaly Area
function displayArea(meal) {
    let box = "";

    for (let i = 0; i < meal.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${meal[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${meal[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}

//Display ingredients
function displayIngredients(meal) {
    let box = "";

    for (let i = 0; i < meal.length; i++) {
        box += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${meal[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${meal[i].strIngredient}</h3>
                        <p>${meal[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = box
}

//display details of meal
function displayMealDetails(meal) {
    searchContainer.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let box = `
    <p class='text-white fs-5 position-relative' onclick='closeDetails()' id='closeBtn'><i class="fa-solid fa-close position-absolute start-100 cursor-pointer"></i></p>
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = box
}
// close details page
function closeDetails() {
    window.location = './index.html'
}
//search

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(i) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(i) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    i == "" ? i = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${i}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

function showContacts() {
    searchContainer.innerHTML = ''
    rowData.innerHTML =
        `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="name" name="name" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100  d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" name="email" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100  d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" name="phone" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100  d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" name="age" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100  d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" name="password" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100  d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" name="repassword" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100  d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-warning px-2 mt-3">Submit</button>
    </div>
</div> `
const containsSpecialCharactersOrNumbers = (value) => {
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const containsSpecialChars = pattern.test(value);
    const containsNumbers = /\d/.test(value);
    return containsSpecialChars || containsNumbers;
};

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
};

const isValidAge = (age) => {
    return age >= 18 && age <= 70;
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

const passwordsMatch = (password, repassword) => {
    return password === repassword;
};

$("#name").keyup(function () {
    const value = $(this).val();
    const containsSpecialCharsOrNumbers =
        containsSpecialCharactersOrNumbers(value);
    $("#nameAlert").toggleClass(
        "d-none",
        !containsSpecialCharsOrNumbers
    );
});

$("#email").keyup(function () {
    const value = $(this).val();
    const validEmail = isValidEmail(value);
    $("#emailAlert").toggleClass("d-none", validEmail);
});

$("#phone").keyup(function () {
    const value = $(this).val();
    const validPhoneNumber = isValidPhoneNumber(value);
    $("#phoneAlert").toggleClass("d-none", validPhoneNumber);
});

$("#age").keyup(function () {
    const value = $(this).val();
    const validAge = isValidAge(value);
    $("#ageAlert").toggleClass("d-none", validAge);
});

$("#password").keyup(function () {
    const value = $(this).val();
    const validPassword = isValidPassword(value);
    $("#passwordAlert").toggleClass("d-none", validPassword);
});

$("#repassword").keyup(function () {
    const passwordsMatch = $("#password").val() === $(this).val()

    $("#repasswordAlert").toggleClass("d-none", passwordsMatch);
});

const areAllFieldsValid = () => {
    const nameValid = !containsSpecialCharactersOrNumbers(
        $("#name").val()
    );
    const emailValid = isValidEmail($("#email").val());
    const phoneValid = isValidPhoneNumber($("#phone").val());
    const ageValid = isValidAge($("#age").val());
    const passwordValid = isValidPassword($("#password").val());
    const repasswordValid = passwordsMatch(
        $("#password").val(),
        $("#repassword").val()
    );

    return (
        nameValid &&
        emailValid &&
        phoneValid &&
        ageValid &&
        passwordValid &&
        repasswordValid
    );
};

const toggleSubmitButton = () => {
    $("#submitBtn").prop("disabled", !areAllFieldsValid());
};

$("#name, #email, #phone, #age, #password, #repassword").keyup(
    function () {
        toggleSubmitButton();
    }
);

loader.fadeOut(300);
};

$("#contact-us").on("click", function () {
adContactForm();
});

