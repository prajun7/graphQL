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

## Modifying data (Same as POST, PUT, DELETE on REST APIs)
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

## Some examples,

Getting all the authors with just the name
<img width="889" alt="Screen Shot 2022-12-11 at 4 10 39 PM" src="https://user-images.githubusercontent.com/67757251/206929348-b93fa7e8-c0dd-4f16-b9b1-44a7723916fc.png">

Getting all the authors with the name and id
<img width="825" alt="Screen Shot 2022-12-11 at 4 10 50 PM" src="https://user-images.githubusercontent.com/67757251/206929352-721fb447-4cd2-4cb2-929e-aa76ecc257be.png">

Getting all the books with the name, id and authorId
<img width="1073" alt="Screen Shot 2022-12-11 at 4 11 11 PM" src="https://user-images.githubusercontent.com/67757251/206929353-f42585d2-8e1a-40c3-ad45-0f2c27de06d9.png">

Getting all the books with the book name, id and name of the author
<img width="1072" alt="Screen Shot 2022-12-11 at 4 11 32 PM" src="https://user-images.githubusercontent.com/67757251/206929354-92836b58-ee53-419a-b4b3-731d7022dbaf.png">

Getting all the authors and also getting all the name of the books that they have written
<img width="1073" alt="Screen Shot 2022-12-11 at 4 13 40 PM" src="https://user-images.githubusercontent.com/67757251/206929336-8518d05c-27a4-42d7-94c6-5985fac5c178.png">

Getting the single author by passing the author id
<img width="983" alt="Screen Shot 2022-12-11 at 4 28 56 PM" src="https://user-images.githubusercontent.com/67757251/206929868-fa5a3073-2875-4400-8310-489a9491c16b.png">

Getting the single book by passing the book id
<img width="1083" alt="Screen Shot 2022-12-11 at 4 29 28 PM" src="https://user-images.githubusercontent.com/67757251/206929884-2104c183-3ffb-48f0-8534-d240e93056d3.png">

Using the mutation, i.e. adding the book
<img width="1086" alt="Screen Shot 2022-12-11 at 4 15 48 PM" src="https://user-images.githubusercontent.com/67757251/206929338-87723c23-cf74-4e6a-adce-0d464a241d6c.png">



