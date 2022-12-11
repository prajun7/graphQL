const express = require('express')
const expressGraphQL = require('express-graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
}  = require('graphql')
const app = express()

/* 
  Imitates how the database will look like
  We are not using any database instead we are using list of authors and books as our database
*/
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

/*
  Creating BookType

   - fields is used to define what the BookType returns and it should be a function which returns an object
   - fileds is a funciton which is returning an object including books' information like id, name and authorId

  fields: () => ({
    ...
  }), 
  Here fields is returning a function instaed of an actualy object.
  It is returning a function that retuns an object.
  And the reason we are returning a function that returns an object instead of returning just an object is,
  that BookType references AuthorType, that is we need AuthorType to be defined before BookType.
  Also, if we look at AuthorType, we can see that AuthorType references BookType.
  So, both the BookType and AuthorType depend on each other.
  If we just return an object from the fields, we will get AuthorType is not defined or BookType is not defined error
  So, that we need to return a function, so that everything can get defined before they actually getting called.
*/
const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'This represents a book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: {
      type: AuthorType,
      resolve: (book) => {
        return authors.find(author => author.id === book.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents a author of a book',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) => {
        return books.filter(book => book.authorId === author.id)
      }
    }
  })
})

/*
  RootQueryType is used to query or GET the data from the database
  It has logic to get both the books and authors
  All the GET queries will be in RootQueryType
  It is using the AuthorType and BookType that we had defined at the top

  Inside the fields we have the query for getting a single book, books, authors and a single author.
  It also consists of a funciton called resolve, which takes two arguments,
    1. parent -> the parent itself
    2. arges -> this is the object of all the arguments that we provide from the frontend
  resolve function consists of a logic to get the book or books.
  It is the funciton that has the logic which is needed to execute when we send the query.
  If we had the database connection, the resolve function will hold the logic to 
  get data from the database.
  In RootMutationType, resolve function holds the logic to update or delete the data
*/
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query to get the required information',
  fields: () => ({
    book: {
      type: BookType,
      description: 'A Single Book',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => books.find(book => book.id === args.id)
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of All Books',
      resolve: () => books
    },
    author: {
      type: AuthorType,
      description: 'A Single Author',
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (parent, args) => authors.find(author => author.id === args.id)
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of All Authors',
      resolve: () => authors
    },
  })
})

/*
  RootMutationType is used to mutate the data (same as DELETE, PUT, UPDATE in REST APIS)
*/
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addBook: {
      type: BookType,
      description: 'Add a book',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: (parent, args) => {
        const book = { id: books.length + 1, name: args.name, authorId: args.authorId }
        books.push(book)
        return book
      }
    },
    addAuthor: {
      type: AuthorType,
      description: 'Add an author',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = { id: authors.length + 1, name: args.name }
        authors.push(author)
        return author
      }
    },
    updateBook: {
      type: BookType,
      description: 'Updates the name and authorID of the book.',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        const book = books.find(book => book.id === args.id)
        book.name = args.name
        book.authorId = args.authorId
        return book
      }
    },
    updateAuthor: {
      type: AuthorType,
      description: 'Update the name of the author',
      args: {
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: (parent, args) => {
        const author = authors.find(author => author.id === args.id)
        author.name = args.name
        return author
      }
    }
  })
})
/*
This is the main schema, which we pass into the expressGraphQL function.
By the help of the schema our program knows what data to access when we send the query

Here we are passing in RootQueryType which have all the logic to get the data
Also, RootMutationType which have all the logic to mutate the data
*/
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

/*
  We need to pass in the schema in the expressGraphQL function beacuse the way that graphQL knows which 
  data to access based on the query that we send is by the help of this schema.
  Schema shows how all of our data interacts together and that schema is what we need to pass into 
  expressGraphQL function. 

  The `graphiql: true` option gives us the actual user interface to access our graphQL without 
  having to call through postman
*/
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true 
}))
app.listen(5000, () => console.log('Server Running'))