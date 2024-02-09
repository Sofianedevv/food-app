import imageUrlBuilder from '@sanity/image-url';
import { config } from './sanity';

const builder = imageUrlBuilder(config);

export function urlFor(source) {
  return builder.image(source).url();
}
