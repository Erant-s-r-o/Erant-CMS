// Import the Cloudinary class.
import { Cloudinary } from '@cloudinary/url-gen';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { scale } from '@cloudinary/url-gen/actions/resize';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { auto } from '@cloudinary/url-gen/qualifiers/gravity';
import { Resize } from '@cloudinary/url-gen/actions';
// Import Appwrite MongoDB
import collections from '$lib/collections';
import { Databases } from 'appwrite';
import { Collection } from './appwrite';

// Create a Cloudinary instance and set your cloud name.
export function getCloudinary() {
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'dbec8wss6'
		},
		url: {
			secure: true // force https
		}
	});
	return cld;
}

// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
const myImage = cld.image(
	'https://res.cloudinary.com/dbec8wss6/image/upload/v1675438429/cld-sample-5.jpg'
);

// Resize to 250 x 250 pixels using the 'fill' crop mode.
myImage.resize(fill().width(250).height(250));

// Render the image in an 'img' element.
const imgElement = document.createElement('img');
document.body.appendChild(imgElement);
imgElement.src = myImage.toURL();