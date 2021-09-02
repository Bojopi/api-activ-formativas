const path = require('path')
// const { v4: uuidv4 } = require('uuid')

//extensiones
// const extensionArchivo = ['docx']

const subirArchivos = ( files, extensionArchivo = ['docx'], carpeta = '' ) => {

    return new Promise((resolve, reject) => {
        const{ archivo } = files
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length - 1 ]
    
        //Validar la extension
        if (!extensionArchivo.includes(extension)) {
            return reject(`La extension: ${extension} no es permitida, solo se permiten archivos ${extensionArchivo}`)
        }
    
        // const nombreTemp = uuidv4() + '.' + extension
    
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, archivo.name)
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
    
            resolve( archivo.name )
        })
    })

}


module.exports = {
    subirArchivos
}