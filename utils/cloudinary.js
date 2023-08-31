import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
  cloud_name: 'memories',
  api_key: '628391574854572',
  api_secret: 'XlB54R74QtmzOIfXafo9wlFUbbw',
  secure: true
});

export default cloudinary