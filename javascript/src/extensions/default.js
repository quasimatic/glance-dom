import customLabel from './locators/custom-label';
import containsText from './locators/contains-text';
import exactText from './locators/exact-text';
import value from './locators/value';
import className from './locators/class';
import nodeType from './locators/node-type';
import css from './locators/css';
import image from './locators/image';
import attribute from './locators/attribute';
import visibility from './filters/visibility';
import leafNodeTarget from './filters/leaf-node';
import inputAfter from './filters/input-after';
import index from './filters/index';
import containedNearScope from './filters/contained-near-scope';
import closest from './filters/closest';
import levelMatches from './filters/level-matches';

export default [customLabel, containsText, exactText, value, className, image, attribute, nodeType, css, levelMatches, visibility, leafNodeTarget, inputAfter, containedNearScope, index, closest];