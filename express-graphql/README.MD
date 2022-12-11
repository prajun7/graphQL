Leaning GraphQL by building APIs using Node.js and Express-GraphQL for books and authors.
- By Web Dev Simplified
- https://www.youtube.com/watch?v=ZQL7tL2S0oQ

Using authors and books list instead of connecting with database.

```
authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]
```

We have a `books` table which has foreign key for the `authors` table.

See comments in code for better understanding.

## To Run
- npm install
- npm run devStart
(check package.json file)
- go to localhost:5000/graphql

## Getting data
We are creating `RootQueryType` in our code
### To GET all the books with id, name and authorId
```
query {
	books {
		name,
		id,
		authorId
	}
}
```
We can remove the above query because by default GraphQL always represents the query,
So, we can also get the same result by,
```
{
	books {
		name,
		id,
		authorId
	}
}
```
Here we can modify the query to just get name and id only.<br>
This is the beauty of GraphQL.<br>
We can do similar to get all the authors.<br>

### To GET the single author with id and name
We need to pass the id of the author as the arg parameter
```
{
	author(id: 2) {
		name
	}
}
```
We can do similar to get the single book.<br>
We need to pass the id of the book that we want<br>

### To GET the `book' name` and `name of the author` who wrote that book
Since `books` and `authors` table are related with each other with the foreign key.<br>
We can get the book and by using the `authorId` we can get the name of the author as well.<br>
We need to add the authors field inside the books.<br>
```
{
	books {
		id,
		name,
		author {
			name
		}
	}
}
```
We will get the author inside the book array.

### To GET list of all the books for each authors
We need to add the books field inside the authors.
```
{
	authors {
		id,
		name,
		books {
			name
		}
	}
}
```
Here we get the list of all the books for each author.<br>
In normal `REST APIs,` this will require running one query for the authors, and another query for author 1,author 2, and author 3. 
So, it will 4 total queries and will also return a bunch of unnecessary data we don't want. 

## Modifying data (Same as POST, PUT, DELETE on REST APIS)
For modifying the data we used mutations. Mutations are GraphQL version of using POST, PUT
and DELETE on a rest API server.
We are creating `RootMutationType` in our code

### To Add a Book
We need to use `mutation` keyword because by default GraphQl uses `query` but we won't to use `mutation`. 
```
mutation {
	addBook (name: "New Book", authorId: 1) {
		id
		name
	}
}
```
Here we are adding the new book with authorId of 1. And returning that book's id and name.
Now if we run the query to get all of the Books we will see the new book that we have added.
If we restart the server the new book is going to disappeared because we are not actually persisiting to the databse.
Similarly we can do the same for the Author.

