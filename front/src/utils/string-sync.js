import {diff_match_patch} from './google-diff-match-patch';


const stringPatcher = new diff_match_patch();


const createStringPatch = (oldValue, nextValue) => {
    return stringPatcher.patch_make(oldValue, nextValue);
};


const patchString = (oldValue, patch) => {
    return stringPatcher.patch_apply(patch, oldValue)[0];
};