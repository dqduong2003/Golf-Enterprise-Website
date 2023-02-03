"use strict";

function storeNumber(num) {
  localStorage.re_number = num;
}

function init() {
  var firstjob = document.getElementById("apply_cloud");
  firstjob.addEventListener('click', function(){
    storeNumber("AD034")})
  var secondjob = document.getElementById("apply_software");
  secondjob.addEventListener('click', function(){
    storeNumber("SE023")})
}

window.onload = init;
