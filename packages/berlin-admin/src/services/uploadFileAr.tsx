import { ApiRequest } from 'berlin-common';

const URL = {
  UPLOADVIDEO: '/api/v1/uploader/videos?lang=ar',
  UPLOADIMAGE: '/api/v1/uploader/images?lang=ar',
  UPLOADDOC: '/api/v1/uploader/docs?table_name=',
  DELETEIMGANDVIDEO: '/api/v1/uploader/files/',
};

type UploadFilesType = {
  files: FileList;
  tableName: { name: string; id: string };
  type: 'image' | 'video' | 'application/pdf' | string;
};

export const uploadFilesAr = async ({
  files,
  tableName,
  type = 'image',
}: UploadFilesType) => {
  const formData = new FormData();
  let url = '';
  let key = '';
  if (type === 'image') {
    url = `${URL.UPLOADIMAGE}&table_name=${tableName.name}&id=${tableName.id}`;
    key = 'images';
  } else if (type === 'video') {
    url = `${URL.UPLOADVIDEO}&table_name=${tableName.name}&id=${tableName.id}`;
    key = 'videos';
  } else if (type === 'doc') {
    url = `${URL.UPLOADDOC}${tableName.name}&id=${tableName.id}`;
    key = 'docs';
  }

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    formData.append(key, file);
  }
  try {
    const response = await ApiRequest.post(url, formData);
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};

export const deleteImgVideo = async (
  imgOrVideoId: number,
  media: string,
  tName: string,
  tId: string
) => {
  try {
    const response = await ApiRequest.delete(
      `${URL.DELETEIMGANDVIDEO}${imgOrVideoId}?for=${media}&table_name=${tName}&id=${tId}&lang=ar`
    );
    return response; // Assuming the API response contains the 'data' property
  } catch (error) {
    throw error; // Re-throw the error to handle it higher up in the call stack
  }
};
