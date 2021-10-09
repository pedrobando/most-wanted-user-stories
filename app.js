//Pedro and Dan

"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

let kidNameArray = [];
let siblingsArray = [];

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
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
    alert(displayPerson(person[0]));
    break;
    case "family":
    // TODO: get person's family
    alert("Spouse: "/*+ findSpouse(person, people)*/ + "\n" + "Siblings: " + findSiblings(person, people));
    
    break;
    case "descendants":
    // TODO: get person's descendants
    alert("Descendants: " + findKids(person, people));
    kidNameArray = [];
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
  
  if(spouse.length === 0){
    return "";
  }
  else{
    return spouse[0].firstName + " " + spouse[0].lastName;
  }

}


function findKids(personArray, people){
  let descendants = people.filter(function(el){

    return  el.parents.includes(personArray[0].id);
     
  });
  
  // if(descendants.length > 0){
  //   for(let i = 0; i < descendants.length; i++){
  //     if(i == descendants.length - 1){
  //       kidNameArray += descendants[i].firstName + " " + descendants[i].lastName + ".";
  //     }
  //     else{
  //       kidNameArray += descendants[i].firstName + " " + descendants[i].lastName + ", ";
  //     }
  //   }
  //   return findKids(descendants, people);
  // }
  // else{
 
  //   return kidNameArray;
  // }
  return descendants;
}

function findSiblings(jill, people){
  let returnString = "";
  siblingsArray = people.filter(function(si){
    return si.parents.includes((jill[0].parents[0] || jill[0].parents[1]) && jill[0].id !== si.id);




    // for( let i = 0; i < si.parents.length; i++ ){
    //    if(jill[0].parents[i] == si.parents[0] && jill[0].id !== si.id){
    //     returnString += si.firstName + " " + si.lastName;
    //    }
    // } 
  });
  return siblingsArray;
}
