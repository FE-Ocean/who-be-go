var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MANDARIN_URL } from './BASE_URL.js';
// 이미지 업로드
const handleUploadImage = (image) => __awaiter(void 0, void 0, void 0, function* () {
    const formData = new FormData();
    formData.append('image', image);
    const data = yield fetch(MANDARIN_URL + '/image/uploadfile', {
        method: 'POST',
        body: formData,
    });
    const result = yield data.json();
    return `${MANDARIN_URL}/${result.filename}`;
});
export { handleUploadImage };
