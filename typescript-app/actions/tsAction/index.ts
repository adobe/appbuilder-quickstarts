interface ActionParams {
  LOG_LEVEL?: string;
  [key: string]: unknown;
}

export async function main (params: ActionParams) {
  const result = {
    statusCode: 200,
    body: 'this is a TypeScript action'
  }

  return result
}
