export default function assign(target: object, ...sources: Array<object>): object {
  let to: object = target || {}
  for (let index = 0; index < sources.length; index++) {
    const source = sources[index];
    if (source != null) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          (to as any)[key] = (source as any)[key]
        }
      }
    }
  }
  return to
}