import axios from "axios";

function App(startDay) {
    var dict = {};
    axios.get('http://localhost:8080/salesapi/read').then((response)=>{
        var res = response.data;

        // get total stock of starting week for each product
        for (const r of res) {
            const startDate = Date.parse(startDay);
            var lastDate = new Date(startDate);
            lastDate.setMonth(lastDate.getMonth() + 6);
            const curDate = Date.parse(r.stockDate);

            if (curDate < lastDate && curDate >= startDate) {
                if (dict[r.stockInfo] === undefined) {
                    dict[r.stockInfo] = Number(r.stockAmt);
                }
                else {
                    dict[r.stockInfo] = Number(dict[r.stockInfo]) + Number(r.stockAmt);
                }
            }
        }
    })

    return (dict);
}
export default App('2021-02-01');