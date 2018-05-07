const transformArrayToObj = array => (
  array.reduce((accum, item) => (
    {
      ...accum,
      [item.id]: item
    }
  ), {})
);

export default transformArrayToObj;
