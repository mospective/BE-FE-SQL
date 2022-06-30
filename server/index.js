const express = require("express");
const path = require("path");
const sequelize = require("./database");
const UserRoute = require("./routes/User");

sequelize.sync().then(() => console.log("db is ready"));

const app = express();

app.get("/test", (req, res) => {
    res.send("Welcome to backend");
});

// var usersRouter = require('./routes/User');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Add user
app.post('/users', async (req, res) => {
    await UserRoute.create(req.body);
    res.send("User has been inserted");
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await UserRoute.findAll();
    res.send(users);
});

// Get a user by id
app.get('/users/:id', async (req, res) => {
    const requestId = req.params.id;
    const user = await UserRoute.findOne({ where: { id: requestId } })
    res.send(user);
});

// Get a user and update it
app.put('/users/:id', async (req, res) => {
    const requestId = req.params.id;
    const user = await UserRoute.findOne({ where: { id: requestId } });
    console.log(user);
    user.username = req.body.username;
    await user.save();
    res.send('updated');
});

app.delete('/users/:id', async (req, res) => {
    const requestId = req.params.id;
    await UserRoute.destroy({ where: { id: requestId } });
    res.send('Removed')
})

const port = process.env.PORT || 8080;

app.listen(port);

console.log(`App is listening on port ${port}`);