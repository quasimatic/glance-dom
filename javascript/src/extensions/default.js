import customLabel from './locators/custom-label';
import containsText from './locators/contains-text';
import exactText from './locators/exact-text';
import value from './locators/value';
import className from './locators/class';
import nodeType from './locators/node-type';
import css from './locators/css';
import attribute from './locators/attribute';
import visible from './filters/visible';
import leafNodeTarget from './filters/leaf-node-target';
import inputAfter from './filters/input-after';
import index from './filters/index';
import containedNearScope from './filters/contained-near-scope';
import closest from './filters/closest';

export default [customLabel, containsText, exactText, value, className, attribute, nodeType, css, visible, leafNodeTarget, inputAfter, containedNearScope, index, closest];