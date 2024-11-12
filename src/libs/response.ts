export const successResponse = (respone: Record<string, unknown> | {}) => {
  return {
    statusCode: 200,
    isBase64Encoded: false,
    body: JSON.stringify(respone),
  };
}

export const clientErrorResponse = (error: Record<string, unknown> | {}) => {
  return {
    statusCode: 400,
    isBase64Encoded: false,
    body: JSON.stringify(error),
  };
}