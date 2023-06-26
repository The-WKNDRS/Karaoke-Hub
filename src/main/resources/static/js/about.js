let description = document.querySelector(".matt-text");
let description2 = document.querySelector(".isaac-text");
let description3 = document.querySelector(".joe-text");
let description4 = document.querySelector(".nick-text");

let headshotMatt = document.querySelector(".headshot-matt");
let headshotIsaac = document.querySelector(".headshot-isaac");
let headshotJoe = document.querySelector(".headshot-joe");
let headshotNick = document.querySelector(".headshot-nick");


// Make description appear when hovering over Matt's headshot
headshotMatt.addEventListener("mouseenter", function() {
    description.style.display = "block";
    headshotMatt.style.opacity = "0.2";
});

// Make description appear when hovering over Joe's headshot
headshotJoe.addEventListener("mouseenter", function() {
    description3.style.display = "block";
    headshotJoe.style.opacity = "0.2";
});

// Make description appear when hovering over Isaac's headshot
headshotIsaac.addEventListener("mouseenter", function() {
    description2.style.display = "block";
    headshotIsaac.style.opacity = "0.2";
});

// Make description appear when hovering over Nick's headshot
headshotNick.addEventListener("mouseenter", function() {
    description4.style.display = "block";
    headshotNick.style.opacity = "0.2";
});

// Make description disappear when mouse leaves Matt's headshot
description.addEventListener("mouseenter", function() {
    description.style.display = "block";
    headshotMatt.style.opacity = "0.2";
});

// Make description appear when mouse leaves Joe's headshot
description3.addEventListener("mouseenter", function() {
    description3.style.display = "block";
    headshotJoe.style.opacity = "0.2";
});

description2.addEventListener("mouseenter", function() {
    description2.style.display = "block";
    headshotIsaac.style.opacity = "0.2";
});

description4.addEventListener("mouseenter", function() {
    description4.style.display = "block";
    headshotNick.style.opacity = "0.2";
});

// Make description disappear when mouse leaves Matt's headshot
headshotMatt.addEventListener("mouseleave", function() {
    description.style.display = "none";
    headshotMatt.style.opacity = "1";
});

// Make description disappear when mouse leaves Joe's headshot
headshotJoe.addEventListener("mouseleave", function() {
    description3.style.display = "none";
    headshotJoe.style.opacity = "1";
});

// Make description disappear when mouse leaves Isaac's headshot
headshotIsaac.addEventListener("mouseleave", function() {
    description2.style.display = "none";
    headshotIsaac.style.opacity = "1";
});

// Make description disappear when mouse leaves Nick's headshot
headshotNick.addEventListener("mouseleave", function() {
    description4.style.display = "none";
    headshotNick.style.opacity = "1";
});
