import { ApolloServer } from 'apollo-server-express';
import { startStandaloneServer } from '@apollo/server/standalone';
import express from 'express';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
async function initServer()
{
    const app=express()
    app.use(cors())
    dotenv.config();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });
      await server.start()
    //   await startStandaloneServer(server)
    server.applyMiddleware({ app });
      app.use((req,res)=>{
             res.send("hello")
      })
      const PORT=process.env.PORT||5000;
      try{
        await mongoose.connect(process.env.mongodb);
        console.log('connected to MongoDb at port')
      }
      catch(error)
      {
        console.log(error);
      }
      app.listen(PORT,()=>{
        console.log("Express is running")
      })
    
}
initServer()
