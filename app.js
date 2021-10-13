//Pedro and Dan

"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people, people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}


// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person[0]);
    break;
    case "family":
    // TODO: get person's family
    alert("Spouse: "+ alertFirstAndLastName(findSpouse(person, people)) + "\nSiblings: " + alertFirstAndLastName(findSiblings(person, people)) + "\nParents: " + alertFirstAndLastName(findParents(person, people)));
    break;
    case "descendants":
    // TODO: get person's descendants
    alert("Descendants: " + alertFirstAndLastName(findKids(person, people)));
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}


function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// Function to recursively check traits
function recTraits(foundPerson, people, control){
  if(foundPerson.length == 1){
    return foundPerson;
  }
  else if(foundPerson.length == 0){
    alert("No individuals found. Please start again.");
    return searchByTraits(control, control);
  }
  else{
    return searchByTraits(foundPerson , control);
  }
}

// Search by all traits
function searchByTraits(people, control){
  control = control;
  let searchType = prompt("Do you want to search by gender, dob, eye color, parents, occupation, height, weight, or spouse? Type the option you want or 'restart' or 'quit'");
  switch(searchType){
    case "gender":
      displayPeople(searchTraitsGender(people, searchType, control));
      return searchTraitsGender(people, searchType, control);
    case 'dob':
      displayPeople(searchTraitsDob(people, searchType, control));
      return searchTraitsDob(people, searchType, control);
    case 'eye color':
      displayPeople(searchTraitsEye(people, searchType, control));
      return searchTraitsEye(people, searchType, control);
    case 'parents':
      displayPeople(searchTraitsParents(people, searchType));
      return searchTraitsParents(people, searchType);
    case 'occupation':
      displayPeople(searchTraitsOccupation(people, searchType));
      return searchTraitsOccupation(people, searchType);
    case 'height':
      displayPeople(searchTraitsHeight(people, searchType, control));
      return searchTraitsHeight(people, searchType, control);
    case 'weight':
      displayPeople(searchTraitsWeight(people, searchType));
      return searchTraitsWeight(people, searchType);
    case 'spouse':
      displayPeople(searchTraitsSpouse(people, searchType));
      return searchTraitsSpouse(people, searchType);
    case "restart":
    //app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    //return mainMenu(person, people); // ask again
   

  }
  return
}

// Individual trait - gender
function searchTraitsGender(people, searchType, control){
  let gender = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);
  
}

// Individual trait - dob
function searchTraitsDob(people, searchType){
  let dob = prompt(`Enter the person's ${searchType} ? Please use ##/##/####`);
  let foundPerson = people.filter(function(person){
    if(person.dob === dob){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

// Individual trait - eye
function searchTraitsEye(people, searchType, control){
  let eye = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eye){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);
}

// Individual trait - height
function searchTraitsHeight(people, searchType, control){
  let height = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.height == height){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

// Individual trait - weight
function searchTraitsWeight(people, searchType, control){
  let weight = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.weight == weight){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

// Individual trait - parents
function searchTraitsParents(people, searchType, control){
  let parents = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.parents[0] == parents ||person.parents[1] == parents ){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

// Individual trait - spouse
function searchTraitsSpouse(people, searchType, control){
  let spouse = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.currentSpouse == spouse){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

// Individual trait - occupation
function searchTraitsOccupation(people, searchType, control){
  let occupation = prompt(`Enter the person's ${searchType} ?`);
  let foundPerson = people.filter(function(person){
    if(person.occupation == occupation){ 
      return true
    }
    else{
      return false
    }
  });
  return recTraits(foundPerson, people, control);

}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height " + person.height + "\n";
  personInfo += "Weight " + person.weight + "\n";
  personInfo += "Eye color " + person.eyeColor + "\n";
  personInfo += "Occupation " + person.occupation + "\n";
  personInfo += "Parents " + person.parents + "\n";
  personInfo += "Current Spouse " + person.currentSpouse + "\n";
  personInfo += "This is all the information that we have so far."

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function findSpouse(personArray, people){
  let spouse;
  spouse = people.filter(function(el){
    return personArray[0].id === el.currentSpouse
    });
  return spouse;
}


function findKids(personArray, people){
  let allDescendantsBucket = [];
  let descendants;
  for(let i = 0; i < personArray.length; i++){
      descendants = people.filter(function(el){
      return  el.parents.includes(personArray[i].id);
    });
    if(descendants.length > 0){
      for(let i = 0; i < descendants.length; i++){
        allDescendantsBucket.push(descendants[i]);
      }
      descendants = allDescendantsBucket.concat(findKids(descendants, people));
    }
  }
  return descendants;
}

function findSiblings(jill, people){
  let siblingsArray = people.filter(function(si){
    return jill[0].parents.includes(si.parents[0] || si.parents[1]) && si.id !== jill[0].id;
  });
  return siblingsArray;
}

function alertFirstAndLastName(personArray){
  let personString = "";
  if(personArray.length === 0){
    return "\n";
  }
  else{
    for(let i = 0; i < personArray.length; i++){
      if(personArray.length - 1 === i){
        personString += personArray[i].firstName + " " + personArray[i].lastName + "\n";
      }
      else{
        personString += personArray[i].firstName + " " + personArray[i].lastName + ", ";
      }
    }
  }
  return personString;
}

//New Function to merge first and last name.
function fullName(nameArray){
  for(let i = 0; i < nameArray.length-1;i++){
      let fullName = nameArray[i].splice(1,2).join(" ");
      console.log(fullName);
      return nameArray
  }
 }
 

function findParents(personArray, people){
  let parents = people.filter(function(el){
    return personArray[0].parents.includes(el.id);
  });
  return parents;
}
