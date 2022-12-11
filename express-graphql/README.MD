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

### To GET all the books with id, name and authorId
```
{
  books {
    name,
    id,
	authorId
  }
}
```
Here we can modify the query to just ger name and id only.<br>
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
Since `books` and `authors` table are related with each other with the foreign key.
We can get the book and by using the `authorId` we can get the name of the author as well.
We need to add the authors field inside the books.
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
Here we get list of all the books for each authors.<br>
In normal `REST APIs` this will require to run one query for the authors, another query for author 1,
author 2, and author 3. So, it will 4 total query and will also return bunch of unnecessay data we don't actually want. 

