const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(link => link.classList.remove("active"));
    link.classList.add("active");
  });
});

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResults = document.querySelector('#search-results');

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const searchTerm = searchInput.value.toLowerCase().trim();
  const elementsToSearch = document.querySelectorAll('*');

  let matchingElements = [];
  elementsToSearch.forEach(function(element) {
    const elementText = element.textContent.toLowerCase();
    if (elementText.includes(searchTerm)) {
      matchingElements.push(element);
    }
  });

  displaySearchResults(matchingElements);
});

searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  const elementsToSearch = document.querySelectorAll('*');

  let matchingElements = [];
  elementsToSearch.forEach(function(element) {
    const elementText = element.textContent.toLowerCase();
    if (elementText.includes(searchTerm)) {
      matchingElements.push(element);
    }
  });

  displaySearchResults(matchingElements);
});

function displaySearchResults(matchingElements) {
  searchResults.innerHTML = '';

  if (matchingElements.length === 0) {
    const noResultsMessage = document.createElement('p');
    noResultsMessage.textContent = 'No results found.';
    searchResults.appendChild(noResultsMessage);
  } else {
    const resultList = document.createElement('ul');

    matchingElements.forEach(function(element) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="#${element.id}">${element.textContent}</a>`;
      resultList.appendChild(listItem);
    });

    searchResults.appendChild(resultList);
  }
}

// Style the search bar
const nav = document.querySelector('nav');
const searchButton = document.querySelector('#search-form button');

nav.style.display = 'flex';
nav.style.justifyContent = 'space-between';
searchForm.style.display = 'flex';
searchForm.style.alignItems = 'center';
searchInput.style.padding = '10px';
searchInput.style.marginRight = '10px';
searchInput.style.border = 'none';
searchInput.style.borderRadius = '5px';
searchInput.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
searchInput.style.fontSize = '16px';
searchInput.style.fontFamily = 'Arial';
searchInput.style.width = '250px';
searchButton.style.padding = '10px';
searchButton.style.border = 'none';
searchButton.style.borderRadius = '5px';
searchButton.style.backgroundColor = '#4CAF50';
searchButton.style.color = 'white';
searchButton.style.cursor = 'pointer';
searchButton.style.fontSize = '16px';
searchButton.style.fontFamily = 'Arial';
searchResults.style.marginTop = '10px';
searchResults.style.maxHeight = '200px';
searchResults.style.overflowY = 'auto';
searchResults.style.border = '1px solid #ccc';

function copyToClipboard(elementId) {
  var copyText = document.getElementById(elementId).innerText;
  var textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("Copy");
  textArea.remove();
  alert("Copied: " + copyText); // This line is optional, it's just to give immediate feedback
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



