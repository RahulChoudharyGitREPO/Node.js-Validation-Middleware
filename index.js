const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for custom validation
app.use((req, res, next) => {
    const { body } = req;

    // Define expected schema
    const expectedSchema = {
        ID: 'number',
        Name: 'string',
        Rating: 'number',
        Description: 'string',
        Genre: 'string',

    };

    // Validate each field
    const errors = [];
    for (const key in expectedSchema) {
        if (typeof body[key] !== expectedSchema[key]) {
            errors.push(`Invalid type for ${key}. Expected ${expectedSchema[key]}.`);
        }
    }

    // Respond based on validation
    if (errors.length > 0) {
        res.status(400).json({
            error: true,
            message: 'Bad request. Some data is incorrect.',
            details: errors
        });
    } else {
        next();
    }
});

// POST route
app.post('/', (req, res) => {
    console.log(req.body)
    //printing the data to console use postman to see the data {
    //     ID: 1,
    //     Name: 'Ms Dhoni',
    //     Rating: 4.5,
    //     Description: 'A description of the movie',
    //     Genre: 'Action , Sports',
    //     Cast: [ 'ssr' ]
    //   }
    res.status(200).send('Data received');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
