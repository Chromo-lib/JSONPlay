// 1000 -> 1 000
export default function formatNumber (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,' ') + ' ms';
}