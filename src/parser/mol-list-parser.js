export default function parseMolList(plaintextData, options) {
  if (!plaintextData) return;

  const parsedData = plaintextData.match(/[^\r\n]+/g).map(line => {
    if (!line) return;

    if (
      options.ignoreBasics &&
      line.match(/(\d\s)(Plains|Island|Mountain|Swamp|Forest|Wastes)/)
    ) {
      return;
    }

    const [quantidade, ...name] = line.split(/ (.*)/);
    return { quantidade, name: name[0] };
  });

  // console.log(parsedData);
  return parsedData.filter(n => n);
}
