const searchExport = (query) => {
  let search
  if (query.search) {
    const searchParam = [
      { id_case: new RegExp(query.search, 'i') },
      { name: new RegExp(query.search, 'i') },
    ];
    search = searchParam
  } else {
    search = {}
  }

  return search
}

const searchFilter = (param, arrayData) => {
  const query = new RegExp(param, 'i')
  const newObject = []

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arrayData.length; i++) {
    const obj = {}

    obj[arrayData[i]] = query;
    newObject.push(obj);
  }

  return newObject
}

module.exports = {
  searchExport, searchFilter
}
