require('dotenv').config();

const bodyParser = require("body-parser");
const cors = require("cors");
const {express} = require("./importModule");
const app = express();
app.use(cors());


app.use(bodyParser.json())

app.use('/', require('./router/authenticatedUser/user/Addresses'))
app.use('/', require('./Positions'))
app.use('/', require('./Department'))
app.use('/', require('./Salaries'))
app.use('/', require('./Employees'))

app.listen(process.env.PORT, () => {
    console.log("server started")
});