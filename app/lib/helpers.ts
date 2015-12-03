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

export function classNames(...names: string[]) {
  return names.filter(name => !!name).join(' ');
}

const dateFormat = new Intl.DateTimeFormat('sv-SE', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
});

export function formatDate(timestamp: number) {
  return dateFormat.format(new Date(timestamp));
}

export function isoDate(timestamp: number) {
  return new Date(timestamp).toISOString();
}
