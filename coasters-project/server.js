require('./db/database-conection')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'hbs')

const Coaster = require("./model/coaster.model")


app.get("/", (req, res) => {
    res.render("home-page")
})

app.get("/rollerCosterGalery", (req, res) => {
    Coaster.find()
        .sort({ title: 1 })
        .then(allCoster => res.render('coster-page', { costers: allCoster }))
        .catch(err => console.log(err))

})

app.get("/largeCoaster", (req, res) => {
    Coaster.find({ length: { $gt: 100 } })
        .then(largCoaster => res.render("largeCoaster-page", { largCoaster: largCoaster }))
})


app.listen(5005, () => console.log("SERVIDOR PUESTO EN MARCHA!!!"))