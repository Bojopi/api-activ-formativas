const express = require('express')
const cors = require('cors')

const { dbConex } = require('../database/configdb');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //path
        this.path = {
            user: '/api/user',
            auth: '/api/auth',
            actividad: '/api/actividad',
            uploads: '/api/uploads',
            // categoria: '/api/categorias',
            // imagen: '/api/imagenes',
            // userWeb2: '/api/userWeb2',
            // auth2: '/api/auth2',
        }

        //conectar la bd
        this.conexionDB()

        //Middlewares
        this.middlewares()
        
        //rutas
        this.routes()
    }

    async conexionDB () {
        await dbConex()
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use(express.json())

        //Directorio público
        this.app.use(express.static('public'))

        //fileupload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }))

        //carpeta pública
        this.app.use('/uploads', express.static('/uploads'))
    }

    routes() {
        this.app.use(this.path.user, require('../routes/user'))
        this.app.use(this.path.auth, require('../routes/auth'))
        this.app.use(this.path.actividad, require('../routes/formulario'))
        this.app.use(this.path.uploads, require('../routes/uploads'))
        // this.app.use(this.path.imagen, require('../routes/imagen'))
        // this.app.use(this.path.userWeb2, require('../routes/userWeb2'))
        // this.app.use(this.path.auth2, require('../routes/auth2'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port)
        })
    }
}


module.exports = Server