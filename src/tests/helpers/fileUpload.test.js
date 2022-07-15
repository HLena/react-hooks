import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'elena25', 
    api_key: '487995517235612', 
    api_secret: 'OBZM7VuwWUDCEGTRmZCkQhKn8dg',
  });


describe('Pruebas en file upload', () => {


    test('Debe cargar un archivo y retornar el URL', async (done) => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();
        
        const  file = new File([blob], 'foto.png');
        let url = await fileUpload(file);

        expect(typeof url).toBe('string');


        //Delete Image

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });

    })

    test('Debe retornar un errro', async() => {
        
        const  file = new File([], 'foto.png');
        let url = await fileUpload(file);

        expect(url).toBe(null);

    })
    
})
