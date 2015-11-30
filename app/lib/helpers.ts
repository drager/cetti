export function updateIn(path: Array<string|number>, newValue, object) {
  if (path.length > 1) {
    newValue = updateIn(path.slice(1), newValue, object[path[0]]);
  }

  let clone;
  if (Array.isArray(object)) {
    clone = [...object];
  } else {
    clone = Object.assign({}, object);
  }
  clone[path[0]] = newValue;

  return clone;
}
