const express = require('express')
const { MongoClient } = require('mongodb')
const { v4:uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

require('dotenv').config()
const url = process.env.URI 

const PORT = 8000

const app = express()

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
  res.json('Hello welcome to myapp')
})

app.get('/test',(req, res)=>{
  res.json('Hello welcome to test')
})


app.post('/signup', async (req, res)=>{
  const client = new MongoClient(url)
  const { email, password } = req.body
  const generateUserId = uuidv4()
  const hashPassword = await bcrypt.hash(password, 10)

  try{
    await client.connect()
    const database = await client.db('tinder-clone')

    const users = await database.collection('users')
    const existingUser = await users.findOne({email})

    if(existingUser){
      return res.status(409).send('User already exists. Please login')
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashed_password: hashPassword
    }

    const insertedUser = await users.insertOne(data)

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24
    })

    res.status(201).json({token, userId: generateUserId})
  }catch(err){
      console.log(err)
  }finally{
    await client.close()
  }
})

app.post('/login', async(req,res)=>{
  const client = new MongoClient(url)
  const { email, password } = req.body
  
  try{
    const database = await client.db('tinder-clone')
    const users = await database.collection('users')
    const user = await users.findOne({email})

    const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if(user && correctPassword){
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24
      })
      res.status(201).json({token, userId: user.user_id})
    }else{
      res.status(400).send('Invalid Credentials')
    }

  }catch(err){
     console.log(err) 
  }finally{
    await client.close()
  }

})

app.get('/user', async (req, res)=>{
  const client = new MongoClient(url)
  const  userId = req.query.userId
  try {
      await client.connect()
      const database = await client.db('tinder-clone')

      const users = await database.collection('users')
      const query = ({ user_id: userId})

      const user = await users.findOne(query)

      res.send(user)

  } finally {
    await client.close()
  }
})

app.get('/gendered-users', async (req, res)=>{
  const client = new MongoClient(url)
  const gender = req.query.gender
  const query = { gender_identity: { $eq : gender }}


  try {
      await client.connect()
      const database = await client.db('tinder-clone')

      const users = await database.collection('users')
      const findUsers = await users.find(query).toArray()

      res.send(findUsers)

  } finally {
    await client.close()
  }
})

app.put('/user', async(req,res)=>{
  const client = new MongoClient(url)
  const formData = req.body.formData
  
  try{
    const database = await client.db('tinder-clone')
    const users = await database.collection('users')
    const query = {user_id: formData.user_id}
    const updateDocument = {
      $set : {
          first_name: formData.first_name,
          dob_day: formData.dob_day,
          dob_month: formData.dob_month,
          dob_year: formData.dob_year,
          show_gender: formData.show_gender,
          gender_identity: formData.gender_identity,
          gender_interest: formData.gender_interest,
          url: formData.url,
          about: formData.about,
          matches: formData.matches
      }
    } 
    const updatedUser = await users.updateOne(query, updateDocument)
    res.send(updatedUser)

  }finally {
      await client.close() 
  }

})

app.put('/addmatch', async (req,res)=>{
  const client = new MongoClient(url)
  const {userId, matchedUserId} = req.body
  
  try{
    await client.connect()
    const database = await client.db('tinder-clone')
    const users = await database.collection('users')
    
    const query = {user_id: userId}
    const updateDocument = {
      $push : {matches : { user_id: matchedUserId }}
    }
     
    const user = await users.updateOne(query, updateDocument)
    res.send(user)

  }finally {
      await client.close() 
  }

})

app.get('/users', async (req, res)=>{
  const client = new MongoClient(url)
  const  userIds = JSON.parse(req.query.userIds)


  try {
      await client.connect()
      const database = await client.db('tinder-clone')
      const users = await database.collection('users')

      const pipeline = [
        {
          '$match':{
            'user_id': {
              '$in': userIds
            }
          }
        }
      ]

      const foundUsers = await users.aggregate(pipeline).toArray()

      res.send(foundUsers)

  } finally {
    await client.close()
  }
})

app.get('/messages', async (req, res)=>{
  const client = new MongoClient(url)
  const  { userId, correspondingUserId } =req.query 

  console.log(userId, correspondingUserId)
  try {
      await client.connect()
      const database = await client.db('tinder-clone')
      const messages = await database.collection('messages')

      const query = {
        from_userId : userId, to_userId: correspondingUserId
      }

      const foundMessages = await messages.find(query).toArray()

      res.send(foundMessages)

  } finally {
    await client.close()
  }
})

app.post('/message', async (req, res)=>{
  const client = new MongoClient(url)
  const  message = req.body.message 

  try {
      await client.connect()
      const database = await client.db('tinder-clone')
      const messages = await database.collection('messages')
 
      const insertedMessage = await messages.insertOne(message)
 
      res.send(insertedMessage)

  } finally {
    await client.close()
  }
})

app.listen(PORT, ()=>console.log('server running on PORT '+ PORT))
