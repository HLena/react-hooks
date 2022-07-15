
export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/elena25/image/upload';

    const formaData = new FormData();
    formaData.append('upload_preset', 'react-journal');
    formaData.append('file', file);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formaData
        });
        if(response.ok) {
            const cloudResp = await response.json();
            return cloudResp.secure_url;
        } else {
            // throw await response.json();
            return null;
        }

    } catch (error) {
        console.log(error)
    }

}