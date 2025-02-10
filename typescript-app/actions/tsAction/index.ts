type Something = {
  name: string;
  age: number;
};

export async function main (params: any, thing: Something) {
  // alrighty then
  const result = {
    statusCode: 200,
    body: 'this is a Typescript action',
    params,
    thing
  }
  const x = { ...result, foo: 'bar '}

  return result
}
