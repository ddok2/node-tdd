import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    return res.send('Hello World');
});

app.post('/login', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Bad Request');
    }

    if (req.body.email === 'email@email.com'
        && req.body.password === '1234') {
        return res.send({
            id: 'id',
            email: 'email@email.com',
            name: 'Sung',
            age: 'undefined'
        });
    }
    return res.status(401).send('Unauthorized');
});

app.listen(3000, () => {
    console.log('working...');
});

export default app;
