import { v4 as uuid } from 'uuid';

export const fileNamer = (
    req: Express.Request,
    file: Express.Multer.File,
    callback,
) => {
    if(!file) return callback( new Error('Archivo vacio'), false);

    const fileExtension = file.mimetype.split('/') [1];

    // Creo una interpretacion , uniendo el uuid con la extension del archivo
    const fileNamer =  `${uuid()}.${fileExtension}`;

    //Retornar el nombre del archivo
    callback(null, fileNamer);
};