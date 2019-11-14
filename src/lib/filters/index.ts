export const filterBy = <T>(cb: (item: T) => boolean) => (list: T[]) =>
  list.filter(cb);
