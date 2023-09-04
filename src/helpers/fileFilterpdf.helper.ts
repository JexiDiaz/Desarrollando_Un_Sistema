export const fileFilterpdf = (
    req: Express.Request,
    file: Express.Multer.File,
    callback,
) => {
    //Si el archivo no existe o no viene entonces:
    if(!file) return callback(new Error('Archivo vacio'), false);

    //Llegamos hasta el mimetype y tomamos la extension del archivo  pdf
    const fileExtension = file.mimetype.split('/')[1];

    //Estan serian las extensiones validas para los archivos pdf 
    const validExtension = ['pdf', 'PDF'];

   //Si las extensiones validas incluyen la extension del archivo entre() y sera true
    if(validExtension.includes(fileExtension)) {
        return callback(null, true);
    }

    callback(null, false);
};