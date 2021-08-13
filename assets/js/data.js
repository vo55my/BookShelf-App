function insertData(book) {
    let bookData = [];

    if (!localStorage.getItem(localStorageKey)) {
        alert('Buku gagal ditambahkan');
        localStorage.setItem(localStorageKey, 0);
    } else {
        alert('Buku berhasil ditambahkan');
        bookData = JSON.parse(localStorage.getItem(localStorageKey));
    }

    bookData.unshift(book);
    localStorage.setItem(localStorageKey,JSON.stringify(bookData));

    showData(getData());
}

function getData() {
    return JSON.parse(localStorage.getItem(localStorageKey)) || [];
}

function showData(books = []) {
    const inCompleted = document.querySelector("#incompleteBookshelfList");
    const completed = document.querySelector("#completeBookshelfList");

    inCompleted.innerHTML = '';
    completed.innerHTML = '';

    books.forEach(book => {
        if (book.isCompleted == false) {
            let el = `
            <article class="book_item">
                <h3 style="text-align: justify; color: white;">${book.title}</h3>
                <p style="text-align: justify; color: white;">Penulis Buku : ${book.author}</p>
                <p style="color: white;">Tahun Penerbit : ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green" onclick="readedBook('${book.id}')">
                        <span>Selesai dibaca</span>
                    </button>
                    <button class="red" onclick="deleteBook('${book.id}')">
                        <span>Hapus buku</span>
                    </button>
                </div>
            </article>
            `

            inCompleted.innerHTML += el;
        } else {
            let el = `
            <article class="book_item">
                <h3 style="text-align: justify; color: white;">${book.title}</h3>
                <p style="text-align: justify; color: white;">Penulis Buku : ${book.author}</p>
                <p style="color: white;">Tahun Penerbit : ${book.year}</p>

                <div class="action" style="margin-top: 30px;">
                    <button class="green" onclick="unreadedBook('${book.id}')"> 
                        <span>Belum selesai dibaca</span>
                    </button>
                    <button class="red" onclick="deleteBook('${book.id}')">
                        <span>Hapus buku</span>
                    </button>
                </div>
            </article>
            `
            completed.innerHTML += el;
        }
    });
}

function deleteBook(id) {
    let cfm = confirm("Anda yakin akan menghapus buku ini ?");

    if (cfm == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData));
        showData(getData());
        alert(`[Buku ${bookDataDetail[0].title}] telah dihapus dari rak`);
    } else {
        return 0;
    }
}