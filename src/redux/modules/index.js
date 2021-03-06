import { all } from 'redux-saga/effects';
import profiles from "./profiles";

// Put modules that have their reducers nested in other (root) reducers here
const nestedSlices = [];

// Put modules whose reducers you want in the root tree in this array.
const rootSlices = [
  profiles,
];

const sagas = [...rootSlices, ...nestedSlices]
  .map((slice) => slice.sagas)
  .reduce((acc, sagas) => [...acc, ...sagas]);

export function* rootSaga() {
  yield all(sagas.map((saga) => saga()));
}

function getReducers() {
  const reducerObj = {};
  rootSlices.forEach((slice) => {
    reducerObj[slice.name] = slice.reducer;
  });
  return reducerObj;
}

export const reducers = getReducers();
