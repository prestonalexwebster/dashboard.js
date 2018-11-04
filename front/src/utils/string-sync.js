import {diff_match_patch} from './google-diff-match-patch';

/**
 * Utils for compact strings synchronization. It allows to send compact patches of strings instead of full string values.
 */


const stringPatcher = new diff_match_patch();

/**
 * Creates patch, representing strings diff.
 */
const createStringPatch = (oldValue, nextValue) => {
    return stringPatcher.patch_make(oldValue, nextValue);
};

/**
 *
 * Applies patch to string, transforming it to the second argument
 */
const patchString = (oldValue, patch) => {
    return stringPatcher.patch_apply(patch, oldValue)[0];
};