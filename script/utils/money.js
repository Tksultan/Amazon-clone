export function formateCrurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2)
}