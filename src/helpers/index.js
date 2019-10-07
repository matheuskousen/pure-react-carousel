import PropTypes from 'prop-types';

export function cn(a) {
  return a
    .map((b) => {
      if (b === false) return null;
      return b;
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function randomHexColor() {
  // eslint-disable-next-line no-bitwise
  return `#${((Math.random() * 0xffffff) << 0).toString(16)}`;
}

export function slideUnit(visibleSlides = 1) {
  return 100 / visibleSlides;
}

export function slideSize(totalSlides, visibleSlides) {
  return ((100 / totalSlides) * visibleSlides) / visibleSlides;
}

export function slideTraySize(totalSlides, visibleSlides, infiniteLoop = 'off') {
  let duplicateSlides = 0;
  if (infiniteLoop !== 'off') duplicateSlides = Math.ceil(visibleSlides / 2) * 2;
  return (100 * (totalSlides + duplicateSlides)) / visibleSlides;
}

export function pct(num) {
  return `${num}%`;
}

/**
 * Compute a new position in a fixed set after advancing or retreating by a certain abount. In our
 * case, compute a new slide in a fixed set of slides after clicking next or back buttons.
 *
 * @param {Integer} currentSlide The current slide index
 * @param {Integer} step A value to advance or rewind when clicking button next or back respectively
 * @param {Integer} totalSlides The total number of slides.
 */
export function move(currentSlide, step, totalSlides) {
  const res = (currentSlide + step) % totalSlides;
  if (res < 0) return totalSlides + res;
  return res;
}

export const LOADING = 'loading';
export const SUCCESS = 'success';
export const ERROR = 'error';

export const CarouselPropTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  direction: PropTypes.oneOf(['forward', 'backward']),
  height: (props, propName) => {
    const prop = props[propName];
    if (props.orientation === 'vertical' && (prop === null || typeof prop !== 'number')) {
      return new Error(
        `Missing required property '${propName}' when orientation is vertical.  You must supply a number representing the height in pixels`,
      );
    }
    return null;
  },
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  isBgImage: (props, propName) => {
    const value = props[propName];
    if (value === true && props.tag === 'img') {
      return new Error(
        `HTML img elements should not have a backgroundImage.  Please use ${propName} for other block-level HTML tags, like div, a, section, etc...`,
      );
    }
    return null;
  },
  infiniteLoop: PropTypes.oneOf(['off', 'manual', 'auto']),
};

/**
 * Cap a value at a minimum value and a maximum value.
 * @param  {number} min The smallest allowed value.
 * @param  {number} max The largest allowed value.
 * @param  {number} x   A value.
 * @return {number}     Either the original value, the minimum value, or the maximum value.
 */
export const boundedRange = ({ min, max, x }) => Math.min(max, Math.max(min, x));
