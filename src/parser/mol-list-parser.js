export default function parseMolList(plaintextData) {
  if (!plaintextData) return;

  const parsedData = plaintextData.match(/[^\r\n]+/g).map(line => {
    if (!line) return;
    const [quantidade, ...name] = line.split(/ (.*)/);
    return { quantidade, name: name[0] };
  });

  // console.log(parsedData);
  return parsedData;
}
