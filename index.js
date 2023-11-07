/*
 * Copyright © 2023 Joe Smullen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

// in order - fruit & veg, carbs, dairy, protein, fats, and sugary foods
// recommended servings are based roughly on hse guidelines
const servings = [ 0, 0, 0, 0, 0, 0 ];
let recommended = [ 7, 5, 3, 2, 0, 0 ];

// extra credit - heights of each shelf in pixels, from bottom to top
const heights = [ 100, 90, 80, 70, 60, 50 ];

/**
 * Update the number of servings in a given shelf.
 *
 * @param {string} button Whether the user has clicked the increase or decrease button.
 * @param {number} num The array index, ranging from 0 (fruit & veg) to 5 (sugary foods).
 */
function changeCount(button, num) {
    if (button === "inc") {
        servings[num]++;
        changeHeights(button, num);
    }
    else if (button === "dec") {
        servings[num]--;
        changeHeights(button, num);

        // prevent the number from going below 0
        if (servings[num] < 0) {
            servings[num] = 0;
        }
    }

    // quick hack to access the count{num} <p> elements (gotta love dynamic typing!)
    const countnum = "count" + num;
    const count = document.getElementById(countnum);

    // extra credit - change the colour (and weight) of the count if over the recommended amount
    count.style.color = (servings[num] > recommended[num]) ? "maroon" : "black";
    count.style.fontWeight = (servings[num] > recommended[num]) ? "bold" : "normal";

    // update the count onscreen
    count.innerText = servings[num];
}

/**
 * Extra credit - update the heights of the shelves in accordance with the number of servings.
 *
 * @param {string} button Whether the user has clicked the increase or decrease button.
 * @param {number} num The array index, ranging from 0 (fruit & veg) to 5 (sugary foods).
 */
function changeHeights(button, num) {
    let el = "";
    switch (num) {
        case 0: el = "fruits"; break;
        case 1: el = "carbs"; break;
        case 2: el = "dairy"; break;
        case 3: el = "protein"; break;
        case 4: el = "fats"; break;
        case 5: el = "sugary"; break;
    }

    const shelf = document.getElementById(el);

    if (button === "inc") {
        const height = `${shelf.offsetHeight + 10}px`;
        shelf.style.height = height;
    }
    else if (button === "dec") {
        const height = `${shelf.offsetHeight - 10}px`;
        shelf.style.height = height;

        // prevent the shelf from shrinking below its original height
        if (servings[num] <= 0) {
            shelf.style.height = `${heights[num]}px`;
        }
    }
}

/**
 * Extra credit - change between the recommendations for children aged 1-4 and people over 5.
 *
 * Takes effect upon updating the count; so if you set the servings of fruit & veg to 7
 * (recommended for over 5's) and then change to under 5's, the colour and weight of the count
 * won't change until you increase or decrease the count.
 *
 * @param {number} num 0 = under 5's, any other number = over 5's.
 */
function changeAges(num) {
    const button1 = document.getElementById("under5");
    const button2 = document.getElementById("over5");

    button1.style.outline = (num === 0) ? "4px solid black" : "2px solid black";
    button2.style.outline = (num !== 0) ? "4px solid black" : "2px solid black";

    recommended = (num === 0) ? [ 5, 6, 3, 4, 0, 0 ] : [ 7, 5, 3, 2, 0, 0 ];
}

/**
 * Take today's date as input from the user.
 * Extra credit - validate it and print it to the screen if it's entered correctly.
 */
function getDate() {
    const input = document.getElementById("dateBox").value;
    
    if (input.length !== 10) {
        alert("Date must be in the DD/MM/YYYY format.");
        document.getElementById("date").innerText = "";
    } else {
        const date = new Date();
        let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        // if the month is before october, prepend a 0 so the two strings can be of equal length
        if (date.getMonth() < 9) {
            dateString = `${date.getDate()}/0${date.getMonth() + 1}/${date.getFullYear()}`;
        }

        if (input === dateString) {
            document.getElementById("date").innerText = input;
        } else {
            alert("That's not today's date! Try again.");
            document.getElementById("date").innerText = "";
        }
    }
}
