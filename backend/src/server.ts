import express, {Express, Request, Response} from "express"
import cors from "cors"

import devicesDataFromFile from "./devices.json"

const devices: devicesData = devicesDataFromFile

const PORT = 3000
let app:Express = express()

app.use(cors())
app.get('/devices', (req:Request, res:Response) => {
    console.log("API endpoint /devices was requested")
    res.status(200).send({devices})
})

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});
