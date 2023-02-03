"use strict"

// HIGHLIGHT CURRENT PAGE IN MENU
function highlight_page() {
  if (document.getElementById("home_page")) document.getElementById("current_home").style.color = "#7FC8A9";
  if (document.getElementById("job_page")) document.getElementById("current_job").style.color = "#7FC8A9";
  if (document.getElementById("apply_page")) document.getElementById("current_app").style.color = "#7FC8A9";
  if (document.getElementById("about_page")) document.getElementById("current_about").style.color = "#7FC8A9";
  if (document.getElementById("enhancements1")) document.getElementById("current_enhance").style.color = "#7FC8A9";
  if (document.getElementById("enhancements2")) document.getElementById("current_enhance2").style.color = "#7FC8A9";
}

// SCROLL REVEAL EFFECT
function reveal() {
  var down = document.querySelectorAll(".reveal");
  reveal_properties(down);
  var reveal_left = document.querySelectorAll(".left");
  reveal_properties(reveal_left);
  var reveal_right = document.querySelectorAll(".right");
  reveal_properties(reveal_right);
}

function reveal_properties(style) {
  for(var i = 0; i < style.length; i ++) {
    var windowheight = window.innerHeight;
    var revealTop = style[i].getBoundingClientRect().top;
    var revealpoint = 130;

    if(revealTop < windowheight - revealpoint){
      style[i].classList.add("active");
    }
    else{
      style[i].classList.remove("active");
    }
  }
}

// INITIALIZE
function init2() {
  highlight_page();
  window.addEventListener("scroll", reveal);
}

window.addEventListener("load", init2)
