export const formatJSONResponse = (
    response: Record<string, unknown>,
    statusCode = 200,
) => {
  return {
    statusCode,
    body: JSON.stringify({ apiVersion: '1.0.0', ...response }),
  };
};
