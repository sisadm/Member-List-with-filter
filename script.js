
let allStudentList = document.querySelectorAll('.student-list li');
let numberOfList= 10;



function showPage(items, page) {
   const startIndex = (page * numberOfList)-numberOfList;
   const endIndex = page * numberOfList;
   for(let i = 0; i<items.length; i++) {
       if(i>=startIndex && i<endIndex) { 
           items[i].style.display = '';
       }
       else {
           items[i].style.display = 'none';
       }
   }
}

// create div which will hold the list items
function createDiv() {
   let page = document.querySelector('.page');
   let div = document.createElement('div');
   div.className = "pagination";
   page.appendChild(div);
   let ul = document.createElement('ul');
   div.appendChild(ul);
}

// function to create li tags and add to the ul
function createLists(pageNumber, liTag, ul) {
   liTag = document.createElement("li");
   let a = document.createElement('a');
   a.setAttribute('href', '#');   
   a.innerHTML = pageNumber;
   liTag.appendChild(a);
   ul.appendChild(liTag);
}

// main append page function

function appedPageLinks(list) {
   let createLi;
   let numberOfLi = Math.ceil(list.length / numberOfList);
   createDiv();
   let ul = document.querySelector('.pagination ul');
   for(let i = 1; i <= numberOfLi; i++) {
      createLists(i, createLi, ul);
   }

   // add class the first a tag.
   if(list.length > 0) {
      let firstLiA = document.querySelector(".pagination ul").firstElementChild.firstElementChild;
      if(firstLiA.innerHTML == 1) {
         firstLiA.classList.add("active");      
      } 
   } else {
      noResult(list);
   }
   


   // add event listener to A tags
   ul.addEventListener('click', (e)=> {
      if(e.target.tagName = "a" ) {
         let a = document.querySelectorAll(".pagination li a");
         for(let i = 0; i < a.length; i++) {
            a[i].classList.remove("active");
         }
         let targetInner = e.target;
         targetInner.classList.add("active");
         targetInner = targetInner.innerHTML;
         showPage(list, targetInner);
      }
   });
}


// all function to refresh the list

function callFunction(list, number) {
   appedPageLinks(list);
   showPage(list, number);
   deleteResult();      // delete the result befor check the new
   noResult(list);
}


// if nothing pop up new message pop up.
function noResult(list) {
   if(list.length === 0) {
       const pNoResults = document.createElement('p');
       pNoResults.className = 'result';
       pNoResults.textContent = 'Sorry we dont have Match to this Name.';
       let noResult = document.querySelector(".result");
       if(!noResult) {
         allStudentList[0].parentNode.appendChild(pNoResults);
       } 
   }
}
// delete the result 
function deleteResult() {
   let noResult = document.querySelector(".result");
   if(noResult) {
      noResult.remove();
   }
}


// remove pagination
function removePagination() {
   const divPagination = document.querySelector('.pagination');
   if(divPagination) {
   divPagination.parentNode.removeChild(divPagination);
   }
}

// search bar 

function addSearchBar() {
   // creat the search bar
   let pageHeader = document.querySelector(".page-header");
   let div = document.createElement("div");
   let input = document.createElement("input");
   let button = document.createElement("button");
   div.classList.add("student-search");
   input.setAttribute("placeholder", "Search for students...");
   button.innerHTML = "Search";
   div.appendChild(button);
   div.appendChild(input);
   pageHeader.appendChild(div);

   // using search option between names 
   let searchInput = document.querySelector(".student-search input");
   let h3 = document.querySelectorAll(".student-details h3");
   let h3Array = [];
   for(let i = 0; i < h3.length; i++) {
      h3Array.push(h3[i].innerHTML);
   }
   searchInput.addEventListener("keyup", () => {
      let value = searchInput.value.toLowerCase();
      let newListOfStudent = [];
      if(value == "") {
         removePagination();
         callFunction(allStudentList, 1);
         deleteResult();
      } else {
         for(let i = 0; i < h3Array.length; i++) {
            allStudentList[i].style.display = "none";
            if(h3Array[i].indexOf(value) !== -1) {
               allStudentList[i].style.display = "";
               newListOfStudent.push(allStudentList[i]);
            }
         }
         newLiLength = newListOfStudent.length / 10;      
         removePagination();
         callFunction(newListOfStudent, newLiLength);
      }
      
   });


}


// call the functions.

addSearchBar();
callFunction(allStudentList, 1);



