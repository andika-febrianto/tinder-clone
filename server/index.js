const express = require('express')
const { MongoClient } = require('mongodb')
const url ='mongodb+srv://admin-andika:biocom1454@cluster0.ydgzo.mongodb.net/Cluster0?authSource=admin&replicaSet=atlas-u70cy9-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true'
const { v4:uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const PORT = 8000

const app = express()

app.use(cors())
app.use(express.json())

app.get('/',(req, res)=>{
  res.json('Hello welcome to myapp')
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

    res.status(201).json({token, userId: generateUserId, email: sanitizedEmail})
  }catch(err){
      console.log(err)
  }
})

app.get('/users', async (req, res)=>{
  const client = new MongoClient(url)
  
  try {
      await client.connect()
      const database = client.db('tinder-clone')

      const users = database.collection('users')
      const returnUsers = await users.find().toArray()

      res.send(returnUsers)

  } finally {
    await client.close()
  }
})

app.listen(PORT, ()=>console.log('server running on PORT '+ PORT))
