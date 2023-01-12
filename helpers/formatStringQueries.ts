/**
 * Function to get KV pairs of required fields
 * @param queries query params passed to the API
 * @param stringFields array of fields which return string to pick from query params
 * @param arrayFields array of fields which return array (comma separated) to pick from query params
 * @returns object having keys contained in fields[]
 */
export const formatStringQueries = (
  queries: { [key: string]: string | undefined },
  stringFields: string[],
  arrayFields: string[]
): { [query: string]: string } =>
  Object.keys(queries).reduce((prevValue, query) => {
    let currentValue;
    if (stringFields.includes(query)) currentValue = queries[query];
    if (arrayFields.includes(query))
      currentValue = (queries[query] as string)?.split(","); // Convert comma separated string to array

    if (currentValue) return { ...prevValue, [query]: currentValue };
    return prevValue;
  }, {});
