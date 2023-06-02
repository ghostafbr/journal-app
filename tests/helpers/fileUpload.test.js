import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dqukcyidd',
  api_key: '816462172125171',
  api_secret: 'kFK56VE3Vd1kVtRp8vV9NYAFu_Q',
  secure: true,
});

describe('FileUpload test', () => {
  test('Should upload file to cloudinary', async () => {
    const imageUrl =
      'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    const cloudResp = await cloudinary.api.delete_resources(
      ['journal-app/' + imageId],
      { resource_type: 'image' }
    );
  });

  test('should return null', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
