function libraryManagement() {
    let searchInputEl = document.getElementById("searchInput");
    let searchResultsEl = document.getElementById("searchResults");
    let spinnerEl = document.getElementById("spinner");

    function createAndAppendSearch(result) {
        let link = result.imageLink;
        let poet = result.author;
        let imageEl = document.createElement("img");
        imageEl.setAttribute("src", link);
        searchResultsEl.appendChild(imageEl);
        let breakEl = document.createElement("br");
        searchResultsEl.appendChild(breakEl);
        let titleEl = document.createElement("p");
        titleEl.textContent = poet;
        searchResultsEl.appendChild(titleEl);
    }

    function displayResults(search_results) {
        spinnerEl.classList.add("d-none");
        let headingEl = document.createElement("h1");
        searchResultsEl.appendChild(headingEl);
        if (search_results.length === 0) {
            headingEl.textContent = "No results found";
        } else {
            headingEl.textContent = "Popular Books";
            for (let result of search_results) {
                createAndAppendSearch(result);
            }
        }
    }

    function searchResults(Event) {
        if (event.key === "Enter") {
            spinnerEl.classList.remove("d-none");
            searchResultsEl.textContent = "";
            let options = {
                method: "GET"
            }
            let item = searchInputEl.value;
            let url = "https://apis.ccbp.in/book-store?title=" + item;
            fetch(url, options)
                .then(function(response) {
                    return response.json()
                })
                .then(function(jsonData) {
                    let {
                        search_results
                    } = jsonData;
                    displayResults(search_results);
                });
        }

    }
    searchInputEl.addEventListener("keydown", searchResults);
}