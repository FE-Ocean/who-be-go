import { MANDARIN_URL } from '../url/BASE_URL.js';

// 이미지 업로드
const handleUploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    const data = await fetch(MANDARIN_URL + '/image/uploadfile', {
        method: 'POST',
        body: formData,
    });
    const result = await data.json();
    return `${MANDARIN_URL}/${result.filename}`;
};

export { handleUploadImage };
