# Learning GraphQL

GraphQL is the popular technology when it comes to server side APIs for good reason. It is incredibly fast to develop with, and it makes building a front-end painlessly easy.

With GraphQL we compose a query of exactly the data we want from the database. And we send that composed  query to the server. The graphQL server is going to parse that query and send us exactly that information that we have included in our compose query. This helps to prevent getting all those extra data that we might have gotten if we were using REST APIs. By using GraphQL we only get the information that we ask for. This is the main advantage of using GraphQL over REST. 

GraphQL also allows to mutate data in the server which allows to update and delete data just like in REST APIs.

GraphQL was designed to allow the client to ask for only the data it needs. While the server might be able to deliver more data to the client for a single request, it would only send the data requested by the client. If we want the client to control the type and amount of data it needs, GraphQL would be ideal for the project.

GraphQL simplifies the task of aggregating data from multiple sources or APIs and then resolving the data to the client in a single API call. On the other hand, API technologies like REST would require multiple HTTP calls to access data from multiple sources.

 A REST API might be easier to design compare to GraphQL because we can establish multiple endpoints for specific needs, and we can fine-tune specific queries to retrieve the data in an efficient way.

 The main benefit of using GraphQL is the ability to send a query that specifies only the information we need and receiving exactly that. However, we can achieve this same effect using REST, by passing the name of the fields we want to use in the URL, then implementing the parsing and returning logic yourself: `GET /books/1492030716?fields=title,pageCount`

### Couple of Sub-Project to Learn GraphQL
 - express-graphql