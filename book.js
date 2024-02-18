<script>

        
        function fetchBooks(url) {
            return fetch(url).then(response => response.json());
        }

        function renderBookList(books) {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';

            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('bookCard');

                const coverId = book.cover_id;
                const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

                bookCard.innerHTML = `
                    <img src="${coverUrl}" alt="Book Cover" class="bookImage">
                    <p><strong>Title:</strong> ${book.title}</p>
                    <p><strong>Author:</strong> ${book.author_name}</p>
                    <p><strong>Published Year:</strong> ${book.first_publish_year}</p>
                    <button class="statusButton ${book.read ? 'green' : ''}" onclick="toggleStatus(${book.id})">
                        ${book.read ? 'Read' : 'Unread'}
                    </button>
                `;

                bookList.appendChild(bookCard);
            });
        }

        function toggleStatus(bookId) {
            const book = books.find(b => b.id === bookId);
            book.read = !book.read;
            renderBookList(books);
        }

       

        // Fetch and render initial book list
        let books = [];
        fetchBooks('https://openlibrary.org/people/mekBot/books/already-read.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.reading_log_entries) {
                    // Assuming reading_log_entries contains book information
                    books = data.reading_log_entries;
                    renderBookList(books);
                } else {
                    console.error('Invalid data format:', data);
                }
            })
            .catch(error => console.error('Error fetching books:', error));

        // Assuming this is your function to fetch books
        function fetchBooks(url) {
            return fetch(url);
        }

        // Assuming this is your function to render the book list
        function renderBookList(books) {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = '';

            books.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.classList.add('bookCard');

                const coverId = book.work.cover_id;
                const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

                bookCard.innerHTML = `
            <img src="${coverUrl}" alt="Book Cover" class="bookImage">
            <p><strong>Title:</strong> ${book.work.title}</p>
            <p><strong>Author:</strong> ${book.work.author_names.join(', ')}</p>
            <p><strong>Published Year:</strong> ${book.work.first_publish_year}</p>
            <button class="statusButton ${book.read ? 'green' : ''}" onclick="toggleStatus('${book.logged_edition}')">
                ${book.read ? 'Read' : 'Unread'}
            </button>
        `;

                bookList.appendChild(bookCard);
            });
        }

       

    function searchBooks() {
        const searchBar = document.getElementById('searchBar');
        const searchResultsContainer = document.getElementById('searchResults');

        if (searchBar && searchBar.value) {
            searchResultsContainer.innerHTML = 'Loading...';

            const searchTerm = searchBar.value.toUpperCase();
            const searchResults = books.filter(book => {
                const title = (book.work.title || '').toUpperCase();
                const authors = (book.work.author_names || []).map(author => author.toUpperCase()).join(', ');

                return title.includes(searchTerm) || authors.includes(searchTerm);
            });

            renderSearchResults(searchResults);
        } else {
            searchResultsContainer.innerHTML = '';
        }
    }

    function renderSearchResults(results) {
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = '';

        results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('resultCard');

            resultCard.innerHTML = `
                <p><strong>Title:</strong> ${result.work.title}</p>
                <p><strong>Author:</strong> ${result.work.author_names.join(', ')}</p>
                <p><strong>Published Year:</strong> ${result.work.first_publish_year}</p>
                <button class="statusButton ${result.read ? 'green' : ''}" onclick="toggleStatus('${result.logged_edition}')">
                    ${result.read ? 'Read' : 'Unread'}
                </button>
            `;

            searchResultsContainer.appendChild(resultCard);
        });
    }

    function toggleStatus(bookId) {
        const book = books.find(b => b.logged_edition === bookId);
        if (book) {
            book.read = !book.read;
            renderSearchResults(books.filter(b => b.read));
        }
    }

    document.getElementById('searchBar').addEventListener('input', searchBooks);

    </script>