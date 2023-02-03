"use strict";

function validate() {
  var result = true;
  var fname = document.getElementById("fname").value.trim();
  var lname = document.getElementById("lname").value.trim();
  var birth = document.getElementById("birth").value.trim();
  var gender = "";
  if (document.getElementById("male").checked)
    gender = "M";
  else if (document.getElementById("female").checked)
    gender = "F";
  else if (document.getElementById("nb").checked)
    gender = "non_bin";
  else if (document.getElementById("no_say").checked)
    gender = "no_say";
  var address = document.getElementById("address").value;
  var town = document.getElementById("town").value;
  var pcode = document.getElementById("pcode").value.trim();
  var email = document.getElementById("mail").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var state = document.getElementById("state").value;
  // skills
  var skills = [];
  if (document.getElementById("math").checked) skills.push("math");
  if (document.getElementById("organ").checked) skills.push("organise");
  if (document.getElementById("problem").checked) skills.push("problem");
  if (document.getElementById("accu").checked) skills.push("accuracy");
  if (document.getElementById("team").checked) skills.push("team");
  var other = document.getElementById("ot").checked;
  if (other) skills.push("other");
  var o_skill = document.getElementById("o_skill").value;


  // validate birth
  if (!birth.match(/^[0-3][0-9]\/[0-1][0-9]\/[1-2][0-9][0-9][0-9]$/)) {
    document.getElementById("birth_err").textContent = "* Date of birth must be in dd/mm/yyyy format.";
    result = false;
  }

  //calculate AGE
  var dateParts = birth.split("/");
  var dob = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  var today = new Date();
  var age = today.getFullYear() - dob.getFullYear();
  var m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
  }
  if (age <= 15 || age >= 80) {document.getElementById("birth_err").textContent = "* Your age must be between 15 and 80.", result = false;}

  // validate postcode
  var pcode_err = document.getElementById("pcode_err");
  if (state == "vic") {
    if (!/[38]/.test(pcode.charAt(0))) {
      pcode_err.textContent = "* The postcode should start with 3 or 8.";
      result = false;
    }
  } else if (state == "nsw") {
    if (!/[12]/.test(pcode.charAt(0))) {
      pcode_err.textContent = "* The postcode should start with 1 or 2.";
      result = false;
    }
  } else if (state == "qld") {
    if (!/[49]/.test(pcode.charAt(0))) {
      pcode_err.textContent = "* The postcode should start with 4 or 9.";
      result = false;
    }
  } else if (state == "nt") {
    if (pcode.charAt(0) != 0) {
      pcode_err.textContent = "* The postcode should start with 0.";
      result = false;
    }
  } else if (state == "wa") {
    if (pcode.charAt(0) != 6) {
      pcode_err.textContent = "* The postcode should start with 6.";
      result = false;
    }
  } else if (state == "sa") {
    if (pcode.charAt(0) != 5) {
      pcode_err.textContent = "* The postcode should start with 5.";
      result = false;
    }
  } else if (state == "tas") {
    if (pcode.charAt(0) != 7) {
      pcode_err.textContent = "* The postcode should start with 7.";
      result = false;
    }
  } else if (state == "act") {
    if (pcode.charAt(0) != 0) {
      pcode_err.textContent = "* The postcode should start with 0.";
      result = false;
    }
  }

  // validate other skill text area
  if (other) {
    if (o_skill == "") {
      document.getElementById("o_skill_err").textContent = "* Other Skill must be filled.";
      result = false;
    }
  }

  if (result) {
    storeInfo(fname, lname, birth, gender, address, town, pcode, email, phone, state, skills, o_skill);
    localStorage.clear();
  }

  return result;
}

function init() {
  if (typeof(Storage) !== "undefined") {
    if (localStorage.getItem("re_number") !== null) {
      var re_number = document.getElementById("r_number");
      re_number.value = localStorage.re_number;
      re_number.readOnly = true;
    }
    if (sessionStorage.length != 0) {
      returnInfo()
    }
  }
  var regForm = document.getElementById("regform");
  regForm.onsubmit = validate;
}

function storeInfo(fname, lname, birth, gender, address, town, pcode, email, phone, state, skills, o_skill) {
  sessionStorage.firstname = fname;
  sessionStorage.lastname = lname;
  sessionStorage.birth = birth;
  sessionStorage.gender = gender;
  sessionStorage.address = address;
  sessionStorage.town = town;
  sessionStorage.postcode = pcode;
  sessionStorage.email = email;
  sessionStorage.phone = phone;
  sessionStorage.state = state;
  sessionStorage.skills = JSON.stringify(skills);
  sessionStorage.other_skill = o_skill;
}

function returnInfo() {
  document.getElementById("fname").value = sessionStorage.firstname;
  document.getElementById("lname").value = sessionStorage.lastname;
  document.getElementById("birth").value = sessionStorage.birth;
  var gender = sessionStorage.gender;
  if (gender == "M")
    document.getElementById("male").checked = true;
  else if (gender == "F")
    document.getElementById("female").checked = true;
  else if (gender == "non_bin")
    document.getElementById("nb").checked = true;
  else if (gender == "no_say")
    document.getElementById("no_say").checked = true;
  document.getElementById("address").value = sessionStorage.address;
  document.getElementById("town").value = sessionStorage.town;
  document.getElementById("pcode").value = sessionStorage.postcode;
  document.getElementById("mail").value = sessionStorage.email;
  document.getElementById("phone").value = sessionStorage.phone;
  document.getElementById("state").value = sessionStorage.state;
  document.getElementById("o_skill").value = sessionStorage.other_skill;
  var skills = JSON.parse(sessionStorage.skills);
  document.getElementById("math").checked = (skills.indexOf("math") != -1);
  document.getElementById("organ").checked = (skills.indexOf("organise") != -1);
  document.getElementById("problem").checked = (skills.indexOf("problem") != -1);
  document.getElementById("accu").checked = (skills.indexOf("accuracy") != -1);
  document.getElementById("team").checked = (skills.indexOf("team") != -1);
  document.getElementById("ot").checked = (skills.indexOf("other") != -1);
}
window.onload = init;
