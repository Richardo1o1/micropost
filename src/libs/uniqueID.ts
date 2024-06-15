//Return 10-digit number for uniqueID
const getUniqueID = ( prefix : string ) : string => {

  if ( prefix.length !== 2 || isNaN(Number(prefix))) {
    throw new Error('Input must be a 2-digit number');
  }

  const randomID = Math.random().toString(10).substring(2,5) + Date.now().toString(10).substring(4,9)
  return prefix + randomID
}

export default getUniqueID;