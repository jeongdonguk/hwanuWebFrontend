import {v4 as uuidv4} from 'uuid';
import axios from 'axios';
import {getPostFileUploadUrl, UploadFile} from './../../api/postApi'

// toast ui 가 주는 base64이미지 정보를 miniO로 던지기 위한 변환 작업
export const base64ToBlob = (base64) => {
    const [meta, data] = base64.split(',');
    const mime = meta.match(/:(.*?);/)[1]; // MIME 타입 추출
    const binary = atob(data); // base64 → binary 디코딩
    const array = [];

    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }

    return new Blob([new Uint8Array(array)], { type: mime });
};

// 이미지를 presigned url로 업로드하고 이미지에 해당하는 주소만 리턴
export const replaceBase64Images = async (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const images = Array.from(tempDiv.querySelectorAll("img"));
  console.log("images : ", images)

  const uploadPromises = images.map(async (img) => {
    const src = img.getAttribute("src");
    if (src?.startsWith("data:image/")) {
      const blob = base64ToBlob(src);
      const ext = blob.type.split('/')[1]; // 확장자 (예: png, jpeg)
      const filename = `${uuidv4()}.${ext}`; // UUID로 고유 파일명 생성

      // 백엔드에 presigned URL 요청
      // presigned URL을 통해 S3 또는 MinIO에 직접 업로드
      const data = await getPostFileUploadUrl(filename, blob.type)
      await UploadFile(blob, data.upload_url)

      // 업로드된 이미지 URL로 src 속성 교체
      img.setAttribute("src", data.public_url);
      console.log("data : ", data)
    }
  });

  await Promise.all(uploadPromises); // 병렬 업로드

  return tempDiv.innerHTML; // 이미지 src가 실제 URL로 교체된 HTML 반환
};