declare module 'radium' {
  interface D {
    <T>(clazz: T): T;
  }

  const radium: D;
  export default radium;
}
