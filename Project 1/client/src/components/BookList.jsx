import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import BuyNowForm from "./BuyNowForm";

function BookList() {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState("Author");
  const [allBooks, setAllBooks] = useState([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const navigate = useNavigate();
  const token = useSelector((state) => {
    return state.auth.token;
  });

   const role = useSelector((state) => {
    return state.auth.role;
  });

  
 

  const loadBooks = async () => {
    try {
      const res = await axios.get("http://localhost:8080/book/get-book", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(res.data.allbook);
      setAllBooks(res.data.allbook || []);
    } catch (err) {
      console.log("Error fetching books", err);
    }
  };




  const addToCart = async (bookId) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/cart/addcart",
        { bookId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("book added to cart");
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  };

  const authorName = (e) => {
  setAuthor(e.target.value);
};

const searchBooks = async (e) => {
  e.preventDefault();

  // If search box is empty → load all books
  if (!author.trim()) {
    loadBooks();
    return;
  }

  try {
    const query = author.trim().toLowerCase();

    // Client-side title matches (always available from allBooks)
    const titleMatches = (allBooks || []).filter((b) =>
      (b.title || "").toLowerCase().includes(query)
    );

    // Try author endpoint but don't let it break title matches
    let authorMatches = [];
    try {
      const res = await axios.get(`http://localhost:8080/book/search/${author}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      authorMatches = res.data.books || [];
    } catch (innerErr) {
      // author endpoint may return 404 when no author found — that's okay
      console.debug("Author search failed or returned no results", innerErr?.response?.status || innerErr.message);
      authorMatches = [];
    }

    // Merge authorMatches + titleMatches, dedupe by _id
    const merged = [...authorMatches];
    const existingIds = new Set(authorMatches.map((b) => b._id));
    for (const t of titleMatches) {
      if (!existingIds.has(t._id)) merged.push(t);
    }

    if (merged.length === 0) {
      alert("No books found");
      setBooks([]);
    } else {
      setBooks(merged);
    }
  } catch (err) {
    console.error(err);
    // Fallback: if something unexpected failed, still try title matches
    const fallback = (allBooks || []).filter((b) => (b.title || "").toLowerCase().includes(author.trim().toLowerCase()));
    if (fallback.length) setBooks(fallback);
    else alert("No books found");
  }
};


  useEffect(() => {
    loadBooks();
  }, []);

  const getMyorder = (book) => {
    navigate("/buy", { state: book });
  };


const deleteBook=async(id)=>{
  try{
    const res =await axios.delete(`http://localhost:8080/book/delete-book/${id}`,{headers: {
          Authorization: `Bearer ${token}`,
        }})
        if(res){
          alert("book remove Successfully!")
          setBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
          setAllBooks((prevBooks) => prevBooks.filter((b) => b._id !== id));
        }

  }catch(err){
alert("not able to remove!")
  }
}


useEffect(()=>{if(!token ){
  navigate("/")
}})

// Apply filters and sorting on the client side using the canonical `allBooks` list
const applyFiltersAndSort = () => {
  try {
    let items = (allBooks && allBooks.length) ? [...allBooks] : [...books];

    if (category) {
      items = items.filter((b) => (b.category || "").toLowerCase().includes(category.toLowerCase()));
    }

    if (minPrice) {
      items = items.filter((b) => Number(b.price) >= Number(minPrice));
    }

    if (maxPrice) {
      items = items.filter((b) => Number(b.price) <= Number(maxPrice));
    }

    if (sortBy === "price-asc") items.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sortBy === "price-desc") items.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sortBy === "title-asc") items.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === "title-desc") items.sort((a, b) => b.title.localeCompare(a.title));

    setBooks(items);
    setShowFilter(false);
    setShowSort(false);
  } catch (err) {
    console.error("Filter/sort error", err);
  }
};

const resetFilters = () => {
  setCategory("");
  setMinPrice("");
  setMaxPrice("");
  setSortBy("");
  setBooks(allBooks || []);
  setShowFilter(false);
  setShowSort(false);
};

  if (token &&books != 0 && role=="buyer") {
    return (
      <>
        <style>{`
          .booklist-page { padding-top: 40px; padding-bottom: 40px }
          .booklist-hero { display:flex; justify-content:center; margin-bottom: 24px }
          .book-card:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(2,6,23,0.16); }
          .booklist-container { background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); padding: 24px; border-radius: 14px }
        `}</style>
        <form
          className="d-flex align-items-center justify-content-center"
          style={{ marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <div style={{ width: '380px' }} className="me-3">
              <input
                className="form-control w-100"
                type="search"
                placeholder="Search by title or author"
                  onChange={authorName}
                  style={{ borderRadius: 10, background: 'rgba(255,255,255,0.9)', border: '1px solid #000' }}
              />
            </div>

            <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
              <button className="btn text-white px-4 me-2" type="submit" style={{ background: 'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius: 10, boxShadow: '0 10px 30px rgba(11,95,255,0.12)' }}>
                Search
              </button>

              <div className="d-flex gap-2">
                <button type="button" className="btn text-dark px-3" onClick={() => { setShowFilter((s) => !s); setShowSort(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                  Filter
                </button>
                <button type="button" className="btn text-dark px-3" onClick={() => { setShowSort((s) => !s); setShowFilter(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                  Sort
                </button>
              </div>
            </div>
        </form>

          {/* Filter panel */}
          {showFilter && (
            <div className="container mb-3">
              <div className="row g-2 justify-content-center">
                <div className="col-12 col-sm-6 col-md-4">
                  <input className="form-control" placeholder="Category (e.g. Fiction)" value={category} onChange={(e)=>setCategory(e.target.value)} />
                </div>
                <div className="col-6 col-sm-3 col-md-2">
                  <input className="form-control" placeholder="Min Price" type="number" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
                </div>
                <div className="col-6 col-sm-3 col-md-2">
                  <input className="form-control" placeholder="Max Price" type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
                </div>
                <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                  <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                  <button className="btn btn-outline-light" onClick={resetFilters} style={{borderRadius:8}}>Reset</button>
                </div>
              </div>
            </div>
          )}

          {/* Sort panel */}
          {showSort && (
            <div className="container mb-3">
              <div className="row g-2 justify-content-center align-items-center">
                <div className="col-12 col-sm-6 col-md-4">
                  <select className="form-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                    <option value="">Sort by</option>
                    <option value="price-asc">Price: Low → High</option>
                    <option value="price-desc">Price: High → Low</option>
                    <option value="title-asc">Title A → Z</option>
                    <option value="title-desc">Title Z → A</option>
                  </select>
                </div>
                <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                  <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                  <button className="btn btn-outline-light" onClick={()=>{setSortBy(""); setBooks(allBooks || []); setShowSort(false);}} style={{borderRadius:8}}>Reset</button>
                </div>
              </div>
            </div>
          )}
        <div className="container">
           <div className="row">{/*{style={styles.grid}} */}
          {" "}
          {books.map((book, index) => {
            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div   style={styles.card}>
                {" "}
                <img
                  src={book.image}
                  alt={book.title}
                  style={styles.image}
                />{" "}
                <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                <p>Stock : {book.stock}</p>{" "}
                <div className="d-flex gap-2 ">
                  <button
                    style={styles.cartButton}
                    onClick={() => addToCart(book._id)}
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => {
                      getMyorder(book);
                    }}
                    style={{
                      background: 'linear-gradient(90deg,#0b5fff,#6d28d9)',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: 8,
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {" "}
                    Buy{" "}
                  </button>
                </div>
              </div></div>
            );
          })}{" "}
        </div>
        </div>
      </>
    );
  }
  else if(token && role=="seller" && books!=0){
    return (
      <>
        <style>{`
          .booklist-hero { display:flex; justify-content:center; margin-top: 56px; margin-bottom: 24px }
          .book-card:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(2,6,23,0.16); }
        `}</style>
        <form
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "7rem", marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <div style={{ width: '380px' }} className="me-3">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search by title or author"
                  onChange={authorName}
                  style={{ borderRadius: 10, background: 'rgba(255,255,255,0.9)', border: '1px solid #000' }}
            />
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
            <button className="btn text-white px-4 me-2" type="submit" style={{ background: 'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius: 10, boxShadow: '0 10px 30px rgba(11,95,255,0.12)' }}>
              Search
            </button>

            <div className="d-flex gap-2">
              <button type="button" className="btn text-dark px-3" onClick={() => { setShowFilter((s) => !s); setShowSort(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                Filter
              </button>
              <button type="button" className="btn text-dark px-3" onClick={() => { setShowSort((s) => !s); setShowFilter(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                Sort
              </button>
            </div>
          </div>
        </form>
         <div className="container">
         {showFilter && (
          <div className="container mb-3">
            <div className="row g-2 justify-content-center">
              <div className="col-12 col-sm-6 col-md-4">
                <input className="form-control" placeholder="Category (e.g. Fiction)" value={category} onChange={(e)=>setCategory(e.target.value)} />
              </div>
              <div className="col-6 col-sm-3 col-md-2">
                <input className="form-control" placeholder="Min Price" type="number" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
              </div>
              <div className="col-6 col-sm-3 col-md-2">
                <input className="form-control" placeholder="Max Price" type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
              </div>
              <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                <button className="btn btn-outline-light" onClick={resetFilters} style={{borderRadius:8}}>Reset</button>
              </div>
            </div>
          </div>
        )}

        {showSort && (
          <div className="container mb-3">
            <div className="row g-2 justify-content-center align-items-center">
              <div className="col-12 col-sm-6 col-md-4">
                <select className="form-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                  <option value="">Sort by</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="title-asc">Title A → Z</option>
                  <option value="title-desc">Title Z → A</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                <button className="btn btn-outline-light" onClick={()=>{setSortBy(""); setBooks(allBooks || []); setShowSort(false);}} style={{borderRadius:8}}>Reset</button>
              </div>
            </div>
          </div>
        )}
           <div className="row">{/*{style={styles.grid}} */}
          {" "}
          {books.map((book, index) => {
            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div   style={styles.card}>
                {" "}
                <img
                  src={book.image}
                  alt={book.title}
                  style={styles.image}
                />{" "}
                <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                <p>Stock : {book.stock}</p>{" "}
               
              </div></div>
            );
          })}{" "}
        </div>
        </div>
      </>
    );

  }
  else if(token && role=="admin" && books!=0){
    return (
      <div style={{paddingTop:"100px"}}>
      <style>{`
        .admin-hero { text-align:center; margin-bottom:18px }
        .book-card:hover { transform: translateY(-6px); box-shadow: 0 26px 60px rgba(2,6,23,0.16); }
      `}</style>
      <h2 className="text-center mb-4 admin-hero">Book List (Admin Panel)</h2>
        <form
          className="d-flex align-items-center justify-content-center "
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
          role="search"
          onSubmit={searchBooks}
        >
          <div style={{ width: '380px' }} className="me-3">
            <input
              className="form-control w-100"
              type="search"
              placeholder="Search by title or author"
                  onChange={authorName}
                  style={{ borderRadius: 10, background: 'rgba(255,255,255,0.9)', border: '1px solid #000' }}
            />
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
            <button className="btn text-white px-4 me-2" type="submit" style={{ background: 'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius: 10, boxShadow: '0 10px 30px rgba(11,95,255,0.12)' }}>
              Search
            </button>

            <div className="d-flex gap-2">
              <button type="button" className="btn text-dark px-3" onClick={() => { setShowFilter((s) => !s); setShowSort(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                Filter
              </button>
              <button type="button" className="btn text-dark px-3" onClick={() => { setShowSort((s) => !s); setShowFilter(false); }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(11,95,255,0.18)', borderRadius: 8, padding: '8px 12px' }}>
                Sort
              </button>
            </div>
          </div>
        </form>
         <div className="container">
         {showFilter && (
          <div className="container mb-3">
            <div className="row g-2 justify-content-center">
              <div className="col-12 col-sm-6 col-md-4">
                <input className="form-control" placeholder="Category (e.g. Fiction)" value={category} onChange={(e)=>setCategory(e.target.value)} />
              </div>
              <div className="col-6 col-sm-3 col-md-2">
                <input className="form-control" placeholder="Min Price" type="number" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} />
              </div>
              <div className="col-6 col-sm-3 col-md-2">
                <input className="form-control" placeholder="Max Price" type="number" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} />
              </div>
              <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                <button className="btn btn-outline-light" onClick={resetFilters} style={{borderRadius:8}}>Reset</button>
              </div>
            </div>
          </div>
        )}

        {showSort && (
          <div className="container mb-3">
            <div className="row g-2 justify-content-center align-items-center">
              <div className="col-12 col-sm-6 col-md-4">
                <select className="form-select" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                  <option value="">Sort by</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="title-asc">Title A → Z</option>
                  <option value="title-desc">Title Z → A</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 col-md-2 d-flex gap-2">
                <button className="btn text-white" onClick={applyFiltersAndSort} style={{background:'linear-gradient(90deg,#0b5fff,#6d28d9)', borderRadius:8}}>Apply</button>
                <button className="btn btn-outline-light" onClick={()=>{setSortBy(""); setBooks(allBooks || []); setShowSort(false);}} style={{borderRadius:8}}>Reset</button>
              </div>
            </div>
          </div>
        )}
           <div className="row">{/*{style={styles.grid}} */}
          {" "}
          {books.map((book, index) => {
            return (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div   style={styles.card}>
                {" "}
                <img
                  src={book.image}
                  alt={book.title}
                  style={styles.image}
                />{" "}
                <p className="fw-bold mt-4">Title : {book.title}</p>{" "}
                <p>Author : {book.author}</p> <p>Price: ₹{book.price}</p>{" "}
                <p>Stock : {book.stock}</p>{" "}
               
                <div className="d-flex gap-2  text-center ">
                  <button style={styles.deleteButton} onClick={()=>{deleteBook(book._id)}}>
                    Delete
                  </button>
                </div>
              </div></div>
            );
          })}{" "}
        </div>
        </div>
      </div>
    );
  }
  
  else {
    return <h1 className="text-center">Loading...</h1>;
  }
}

const styles = {
  page: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "20px",
    // backgroundColor: "black",
    width: "100%",
  },
  card: {
    padding: "18px",
    borderRadius: "14px",
    minHeight: "420px",
    boxShadow: "0 18px 46px rgba(2,6,23,0.12)",
    background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(245,247,250,0.96))",
    border: "1px solid rgba(0,0,0,0.04)",
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  
 
  
  },
  image: {
    width: "100%",
    height: "18rem",
    objectFit: "cover",
    borderRadius: "10px",
  },
  cartButton: {
    background: '#0b1220',
    color: '#fff',
    padding: '10px 12px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    boxShadow: '0 10px 30px rgba(11,95,255,0.12)'
  },
  deleteButton: {
    background: 'linear-gradient(90deg,#ff5f6d,#ffc371)',
    color: '#fff',
    padding: '10px 12px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    width: '100%'
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "linear-gradient(90deg,#0b5fff,#6d28d9)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 12px 36px rgba(11,95,255,0.12)",
  },
};

export default BookList;
