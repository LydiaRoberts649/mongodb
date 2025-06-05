use plp_bookstore;
[
  {
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "published_year": 1954,
    "price": 25.99,
    "in_stock": true,
    "pages": 1178,
    "publisher": "George Allen & Unwin"
  },
  {
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "genre": "Romance",
    "published_year": 1813,
    "price": 12.50,
    "in_stock": true,
    "pages": 279,
    "publisher": "T. Egerton, Whitehall"
  },
  {
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949,
    "price": 10.00,
    "in_stock": false,
    "pages": 328,
    "publisher": "Secker & Warburg"
  },
  {
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Southern Gothic",
    "published_year": 1960,
    "price": 14.75,
    "in_stock": true,
    "pages": 281,
    "publisher": "J.B. Lippincott & Co."
  },
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "published_year": 1925,
    "price": 9.99,
    "in_stock": true,
    "pages": 180,
    "publisher": "Charles Scribner's Sons"
  },
  {
    "title": "Dune",
    "author": "Frank Herbert",
    "genre": "Science Fiction",
    "published_year": 1965,
    "price": 18.00,
    "in_stock": true,
    "pages": 412,
    "publisher": "Chilton Books"
  },
  {
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "published_year": 1997,
    "price": 22.00,
    "in_stock": true,
    "pages": 309,
    "publisher": "Bloomsbury Publishing"
  },
  {
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "published_year": 1937,
    "price": 15.50,
    "in_stock": true,
    "pages": 310,
    "publisher": "George Allen & Unwin"
  },
  {
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "genre": "Coming-of-age",
    "published_year": 1951,
    "price": 11.25,
    "in_stock": false,
    "pages": 277,
    "publisher": "Little, Brown and Company"
  },
  {
    "title": "Sapiens: A Brief History of Humankind",
    "author": "Yuval Noah Harari",
    "genre": "Non-fiction",
    "published_year": 2011,
    "price": 20.00,
    "in_stock": true,
    "pages": 443,
    "publisher": "Harper"
  }
]
db.books.find({genre:"Fiction"});
db.books.find({published_year:{$gt:2010}});
db.books.find({author:"Delia Owens"});
db.books.deleteOne({title:'The Martian'})
db.books.find({in_stock:true} && {published_year:{$gt:2010}})
db.books.find({},
              {title:1,author:1,price:1})
db.books.find({}).sort({price:1})
db.books.find({}).limit(5)
db.books.find({}).skip(5)
db.books.aggregate({$group:{
                    _id:"$genre",
                    average_price:{$avg:"$price"}}})
db.books.aggregate({$group:{
                    _id:"$author",
                    Number_of_books:{$sum:1}}})

db.books.aggregate([
  {
    
    $addFields: {
      decade: {
        $multiply: [
          { $floor: { $divide: [{$toInt:"$published_year"}, 10] } },
          10
        ]
      }
    }
  },
  {
    
    $group: {
      _id: "$decade",    
      book_count: { $sum: 1 } 
    }
  },
  {
    
    $sort: {
      _id: 1 
    }
  }
])

db.books.createIndex({title:1})
db.books.createIndex({author:1,published_year:-1})
db.books.explain('executionStats')