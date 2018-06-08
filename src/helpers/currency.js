export default function numberToPilas(num) {
  var num = num.toFixed(2).split('.');
  num[0] = 'R$ ' + num[0].split(/(?=(?:...)*$)/).join('.');
  return num.join(',');
}
