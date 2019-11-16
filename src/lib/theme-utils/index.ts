export const forEachClass = <T>(
  obj: { [key: string]: T },
  cb: (data: T) => any
) =>
  Object.keys(obj).reduce(
    (acc, name) =>
      Object.assign(acc, {
        [`&.${name}`]: cb(obj[name])
      }),
    {}
  );
