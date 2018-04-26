const getData = () => {
  const items = [];
  const colors = ['red', 'green', 'blue'];
  for (let i = 0; i < 6; i += 1) items.push(i);
  return Promise.resolve({colors, items});
};

export default getData;
