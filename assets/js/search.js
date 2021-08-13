btnSearch.addEventListener("click",function(e) {
    e.preventDefault()
    if (localStorage.getItem(localStorageKey) == "") {    
        alert("Buku tidak ditemukan");
        return location.reload();
    } else {
        const getByTitle = getData().filter(a => a.title == searchValue.value.trim());
        if (getByTitle.length == 0) {
            const getByAuthor = getData().filter(a => a.author == searchValue.value.trim());
            if (getByAuthor.length == 0) {
                const getByYear = getData().filter(a => a.year == searchValue.value.trim());
                if (getByYear.length == 0) {
                    alert(`Buku yang anda cari tidak ditemukan`);
                    return location.reload();
                } else {
                    showSearchResult(getByYear);
                }
            } else {
                showSearchResult(getByAuthor);
            }
        } else {
            showSearchResult(getByTitle);
        }
    }

    searchValue.value = '';
})

function showSearchResult(books) {
    const searchResult = document.querySelector("#searchResult");

    searchResult.innerHTML = '';

    books.forEach(book => {
        let el = `
        <article class="book_item" style="color: white;">
            <h3>Hasil Pencarian :</h3><p class="search">Pencarian menunjukkan buku "${book.title}" </p>
            <h3>${book.title}</h3>
            <p>Penulis Buku : ${book.author}</p>
            <p>Tahun Penerbit : ${book.year}</p>
            <p class="ket">Keterangan : <span>${book.isCompleted ? '<medium style="color: green;">Sudah dibaca</medium>' : '<medium style="color: red;">Belum selesai dibaca</medium>'}</span></p>
        </article>
        `

        searchResult.innerHTML += el;
    });
}