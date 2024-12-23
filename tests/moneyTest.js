import { formateCrurrency } from "../script/utils/money.js";

console.log('converts cents to dollars');

if (formateCrurrency(2095) === '20.95'){
  console.log('passed')
}else{
  console.log('failed')
}

console.log('work with 0');

if (formateCrurrency(0) === '0.00'){
  console.log('passed')
}else{
  console.log('failed')
}

console.log('round of forword');

if (formateCrurrency(2000.5) === '20.01'){
  console.log('passed')
}else{
  console.log('failed')
}

console.log('round of backourd');


if (formateCrurrency(2000.4) === '20.00'){
  console.log('passed')
}else{
  console.log('failed')
}