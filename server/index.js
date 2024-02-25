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

    res.status(201).json({token, userId: generateUserId})
  }catch(err){
      console.log(err)
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

app.get('/users', async (req, res)=>{
  const client = new MongoClient(url)
  
  try {
      await client.connect()
      const database = await client.db('tinder-clone')

      const users = await database.collection('users')
      const returnUsers = await users.find().toArray()

      res.send(returnUsers)

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

app.listen(PORT, ()=>console.log('server running on PORT '+ PORT))
