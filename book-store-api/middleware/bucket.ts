import multer from 'multer';
import multerS3 from 'multer-s3';

import s3 from '../minIO/s3';

const bucket = 'book-store';

const storage = multerS3({
    s3,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, Date.now().toString() + file.originalname);
    },
});

export const upload = multer({ storage });
