const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    //useNewUrlParser: true,
    //useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new campground({
            author: '672ab57c7f3c691bf1af130a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur sint eum incidunt assumenda reiciendis beatae debitis cumque? Dolore dolorem, cum possimus adipisci iure perspiciatis et minus ipsum, architecto veniam quos?',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})