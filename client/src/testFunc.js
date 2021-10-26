export const processData = (data, week)=>{
var dict = {};
for (const r of data) {
  const startDate = Date.parse(week);
  var lastDate = new Date(startDate);
  lastDate.setDate(lastDate.getDate() + 6);
  const curDate = Date.parse(r.stockDate);

  if (curDate <= lastDate && curDate >= startDate) {
    if (dict[r.stockInfo] === undefined) {
      dict[r.stockInfo] = Number(r.stockAmt);
    }
    else {
      dict[r.stockInfo] = Number(dict[r.stockInfo]) + Number(r.stockAmt);
    }
  }
}


return dict;
}