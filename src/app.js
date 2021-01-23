const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Creando il server con Express
const app = express()
const port = process.env.PORT || 3009

// Definendo la posizione del file di configurazione per Express
const public_path = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
console.log(public_path)

// Impostando delle impostazioni nel server
app.set("view engine", "hbs") // Questo è il view engine che useremo
app.set("views", viewsPath) // Questa è la posizione dei hbs files


// Caricando i "partials"
hbs.registerPartials(partialsPath)


// Impostando la directory static
app.use(express.static(public_path))


//Impostando le diverse "route" del server
app.get("", (req, res) => {
    res.render("index", {
        title: "Il meteo",
        name: "Leonardo Polo"
    })
})


app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Leonardo Polo",
        message: "Utilizza questo sito per sapere il meteo della tua zona"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Inserisci il nome della località e il sito ti dirà tutte le informazioni",
        title: "Help",
        name: "Leonardo Polo"
    })
})

app.get("/weather", (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "Perfavore, inserisci un indirizzo valido"
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if(error){
            return res.send({error});   
        }
    
        forecast.forecast(latitude , longitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            }
           )  
        })
    }) 
})


app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Pagina non trovata, 404",
        name: "Leonardo Polo",
        errorMessage: "404, pagina non trovata"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Polo Leonardo",
        errorMessage: "Errore nel trovare la pagina richiesta"
    })
})


// Avviando il server su una porta desiderata
app.listen(port, () => {
    console.log("Il server è pronto alla porta " + port)
})

