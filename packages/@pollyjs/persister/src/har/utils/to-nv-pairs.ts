const { keys } = Object;
const { isArray } = Array;

export interface NVPairs extends Array<{
  name: string
  value: string
  _fromType?: string
}> {}

export default function toNVPairs(o: { [key: string]: string | string[] }) {
  return keys(o || {}).reduce((pairs: NVPairs, name: string) => {
    const value = o[name];

    if (isArray(value)) {
      // _fromType is used to convert the stored header back into the
      // type it originally was. Take the following example:
      //   { 'content-type': ['text/htm'] }
      //     => { name: 'content-type', value: 'text/html', _fromType: 'array }
      //     => { 'content-type': ['text/htm'] }
      pairs.push(...value.map(v => ({ name, value: v, _fromType: 'array' })));
    } else {
      pairs.push({ name, value });
    }

    return pairs;
  }, []);
}
