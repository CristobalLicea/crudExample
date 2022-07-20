const http = require('http');
const express = require('express');
const fs = require('fs')
const genId = require('./helper.js')

const app = express();
const server = http.createServer(app);
const port = 3987;

app.use(express.json());

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync('students.json', stringifyData);
};

const getUserData = () => {
  const jsonData = fs.readFileSync('students.json');
  return JSON.parse(jsonData);
};

//create
app.post('/students', (req, res) => {
  const users = getUserData();
  const newId = () => {
    const nid = genId.genId();

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === nid) {
        return newId();
      }
    }
    return nid;
  }

  if (!req.body.first) {
    return res.status(401).send({ error: true, message: 'User data is missing First Name'})
  }

  if (!req.body.last) {
    return res.status(401).send({ error: true, message: 'User data is missing Last Name'})
  }

  if (!req.body.grade) {
    return res.status(401).send({ error: true, message: 'User data is missing Grade'})
  }

  if (!req.body.classes) {
    return res.status(401).send({ error: true, message: 'User data is missing Classes'})
  }

  const newUser = {
    id: newId(),
    firstName: req.body.firstName, 
    lastName: req.body.lastName,
    createdOn: new Date(),
    updatedOn: '',
    grade: req.body.grade,
    classes : req.body.classes,
  }

  users.push(newUser)

  saveUserData(users)
  res.send( {success: true, message: 'User Added Succesfully'})
})


//read
app.get('/students', (req, res) => {
  const users = getUserData();
  let data = users;
  if (req.query.sort) {
    const sorted = users.sort(function(a, b) {
      var textA = a.firstName;
      var textB = b.firstName;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    if (req.query.sort === 'asc') {
      data = sorted;
    };
  
    if (req.query.sort === 'desc') {
      data = sorted.reverse();
    };
  }
  if (req.query.limit) {
    const newList = []
    for (let i = 0; i < parseInt(req.query.limit); i++) {
      newList.push(data[i])
    }
    data = newList
  }
  res.send(data)
});

app.get(`/students/:id`,  (req, res) => {
  const users = getUserData();
  const found = users.find(user => user.id === req.params.id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

//delete
app.delete('/students/:id', (req, res) => {
  const users = getUserData();
  const id = parseInt(req.params.id)
  const filterUser = users.filter(user => user.id !== id);
  
  if (users.length === filterUser.length) {
    return res.status(409).send({ error:true, message: 'User does not exist'})
  }
  saveUserData(filterUser)
  res.send( { success: true, message: 'User has been DELETED'})
})

//update
app.put('students/:id', (req, res) => {
  const users = getUserData();
  const found = users.find(user => user.id === req.params.id);

  if (found) {
    const updated = {
      id: found.id,
      firstName: req.body.firstName||found.firstName,
      lastName: req.body.lastName||found.lastName,
      grade: req.body.grade||found.grade,
      classes: req.body.classes||found.classes,
      createdOn: found.createdOn,
      updatedOn: new Date ()
    }

    const targetIndex = users.indexOf(found)
    users.splice(targetIndex, 1 , updated);
    saveUserData(users)
    res.send( { success: true, message: 'User has been updated'})
  } else {
    res.status(404).send( { error: true, message: 'User could not be updated'})
  }
})

server.listen(port, () => console.log(`server is listening on ${port}` ));