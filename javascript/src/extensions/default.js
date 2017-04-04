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
import shortestPath from './filters/shortest-path';
import index from './filters/index';

export default [customLabel, containsText, exactText, value, className, attribute, nodeType, css, visible, leafNodeTarget, inputAfter, shortestPath, index];