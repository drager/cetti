import { cettiClient } from './lib/client-creator';

export async function getBuilds() {
  const bucket = cettiClient.bucket('build');
  const builds = await (async() => {
    try {
      const response = await fetch('https://api.travis-ci.org/repos/drager/cetti/builds');
      const data = await response.json();
      return data;
    } catch (e) {
      throw e;
    }
  })();

  for (const build of builds) {
    bucket.value(build);
  }
}
