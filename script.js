// Danh sách sách mẫu
let books = [
    { id: "B001", title: "Clean Code", available: true, borrower: "" },
    { id: "B002", title: "You Don’t Know JS", available: true, borrower: "" },
    { id: "B003", title: "The Pragmatic Programmer", available: true, borrower: "" },
  ];
  
  // Người dùng mặc định (đơn giản hóa)
  const userCredentials = {
    username: "admin",
    password: "123456"
  };
  
  let currentUser = null;
  
  // === ĐĂNG NHẬP ===
  function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (username === userCredentials.username && password === userCredentials.password) {
      currentUser = username;
      document.getElementById("login-form").style.display = "none";
      document.getElementById("library-interface").style.display = "block";
      document.getElementById("user-name").innerText = username;
      loadBooks();
    } else {
      alert("Invalid username or password!");
    }
  }
  
  // === ĐĂNG XUẤT ===
  function logout() {
    currentUser = null;
    document.getElementById("login-form").style.display = "block";
    document.getElementById("library-interface").style.display = "none";
    clearInputs();
  }
  
  // === HIỂN THỊ DANH SÁCH SÁCH ===
  function loadBooks() {
    const tableBody = document.querySelector("#book-table tbody");
    tableBody.innerHTML = ""; // Clear old rows
  
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.available ? "Available" : "Borrowed"}</td>
        <td>${book.borrower || "-"}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // === MƯỢN SÁCH ===
  function borrowBook() {
    const bookId = document.getElementById("book-id").value.trim();
    const book = books.find(b => b.id.toLowerCase() === bookId.toLowerCase());
  
    if (!book) {
      alert("Book not found!");
      return;
    }
  
    if (!book.available) {
      alert("Book is already borrowed.");
      return;
    }
  
    book.available = false;
    book.borrower = currentUser;
    alert(`You have borrowed "${book.title}".`);
    loadBooks();
    clearInputs();
  }
  
  // === TRẢ SÁCH ===
  function returnBook() {
    const bookId = document.getElementById("book-id").value.trim();
    const book = books.find(b => b.id.toLowerCase() === bookId.toLowerCase());
  
    if (!book) {
      alert("Book not found!");
      return;
    }
  
    if (book.available || book.borrower !== currentUser) {
      alert("You can't return this book.");
      return;
    }
  
    book.available = true;
    book.borrower = "";
    alert(`You have returned "${book.title}".`);
    loadBooks();
    clearInputs();
  }
  
  // === KIỂM TRA TRẠNG THÁI SÁCH ===
  function checkBookStatus() {
    const bookId = document.getElementById("check-book-id").value.trim();
    const book = books.find(b => b.id.toLowerCase() === bookId.toLowerCase());
    const statusEl = document.getElementById("book-status");
  
    if (!book) {
      statusEl.textContent = "Book not found.";
      return;
    }
  
    if (book.available) {
      statusEl.textContent = `"${book.title}" is available.`;
      statusEl.style.color = "#27ae60"; // green
    } else {
      statusEl.textContent = `"${book.title}" is borrowed by ${book.borrower}.`;
      statusEl.style.color = "#e74c3c"; // red
    }
  }
  
  // === XÓA INPUT ===
  function clearInputs() {
    document.getElementById("book-id").value = "";
    document.getElementById("check-book-id").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("book-status").textContent = "";
  }
  