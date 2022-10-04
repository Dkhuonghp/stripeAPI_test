const express = require ('express')
const app = express()
const PORT = 3000
const DOMAIN = 'http://localhost:3000'
app.use(express.static('public'))

const stripe = require('stripe')('sk_test_51LB9jtLBhnAcZbQVx9nX43NN93jJOLjp9qmRTVlOXHD89gqZzKRZrobzf1cQGL41x2iQ1vNAznuACjUupEOa0rIf00hAbBDhpc');

app.post('/create-checkout-session', async(req, res) => {
    try {
        const prices = await stripe.prices.list()
        console.log(prices);
        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: prices.data[0].id,
                quantity: 1,
            }],
            
            mode: 'payment',
            success_url: `${DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/index.html`
        });
        console.log(session);
        res.redirect(303, session.url)
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, console.log("run server"))
