import {jest} from '@jest/globals';
import { processData } from './testFunc';
import axios from "axios";
import { List } from '@mui/icons-material';

// return a random integer in the min and max range
function RndInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

// return a list of random integer
function RndList(times) {
  var list = [];
  for (var i = 0; i < times; i++) {
    list.push(RndInt(1, 20));
  }
  return list;
}

// return sum of all the lists
function SumOfList(list) {
  var total = 0;
  list.forEach(s => total += s);
  return total;
}

// return a dictionary mocking the data processed after receiving from the database
function mockDatabase(num, listAmt, info, month) {
  // mocking the database
  var data = [];
  for (var i = 0; i < num; i++) {
    //month.setDate(month.getDate() + (Math.random() % 28)).toString()
    var tempMonth = new Date(month);
    var randDate = tempMonth.setDate(tempMonth.getDate() + RndInt(1, 27));
    const newData = new Object({
      salesId: String(i), 
      stockInfo: info,
      stockDate: new Date(randDate).toISOString().substr(0, 10),
      stockAmt: String(listAmt[i]),
      salesPrice: 10,
    });
    data.push(newData);
  }
  return data;
}


test('database with only one product from the same month', () => {
  var monthDesired = new Date("2021-02-01");
  var listAmt = RndList(10);
  var total = SumOfList(listAmt);
  var data = mockDatabase(10, listAmt, "Panadol", monthDesired);
  
  var expectedResult = {Panadol: total};

  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});


test('database with only one product from different months', () => {
  // Any group of entries using monthDesired must be part of the final dictionary
  var monthDesired = new Date("2021-03-01");

  var month1 = new Date("2021-02-01");
  var listAmt1 = RndList(10);
  var total1 = SumOfList(listAmt1);
  var data1 = mockDatabase(10, listAmt1, "Panadol", month1);

  var listAmt2 = RndList(10);
  var total2 = SumOfList(listAmt2);
  var data2 = mockDatabase(10, listAmt2, "Panadol", monthDesired);

  var data = data1.concat(data2);

  var expectedResult = {Panadol: total2};
 
  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});


test('database with multiple products from the same month', () => {
  var monthDesired = new Date("2021-02-01");

  var listAmt1 = RndList(10);
  var total1 = SumOfList(listAmt1);
  var data1 = mockDatabase(10, listAmt1, "Panadol", monthDesired);

  var listAmt2 = RndList(5);
  var total2 = SumOfList(listAmt2);
  var data2 = mockDatabase(5, listAmt2, "Ibuprofen", monthDesired);

  var data = data1.concat(data2);

  var expectedResult = {Panadol: total1, Ibuprofen: total2};

  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});


test('database with only multiple products from different months', () => {
  var monthDesired = new Date("2021-02-01");

  var listAmt1 = RndList(10);
  var total1 = SumOfList(listAmt1);
  var data1 = mockDatabase(10, listAmt1, "Panadol", monthDesired);

  var month2 = new Date("2021-03-01");
  var listAmt2 = RndList(5);
  var total2 = SumOfList(listAmt2);
  var data2 = mockDatabase(5, listAmt2, "Ibuprofen", month2);

  var data = data1.concat(data2);

  var expectedResult = {Panadol: total1};

  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});


test('database with multiple products from multiple months with some being on the same month', () => {
  var monthDesired = new Date("2021-02-01");

  var listAmt1 = RndList(10);
  var total1 = SumOfList(listAmt1);
  var data1 = mockDatabase(10, listAmt1, "Panadol", monthDesired);

  var month2 = new Date("2021-03-01");
  var listAmt2 = RndList(10);
  var total2 = SumOfList(listAmt2);
  var data2 = mockDatabase(10, listAmt2, "Ibuprofen", month2);

  var listAmt3 = RndList(3);
  var total3 = SumOfList(listAmt3);
  var data3 = mockDatabase(3, listAmt3, "Tylenol", monthDesired);

  var data = data1.concat(data2).concat(data3);

  var expectedResult = {Panadol: total1, Tylenol: total3};

  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});


test('database with multiple products from multiple months with mixed data', () => {
  var monthDesired = new Date("2021-02-01");

  var listAmt1 = RndList(10);
  var total1 = SumOfList(listAmt1);
  var data1 = mockDatabase(10, listAmt1, "Panadol", monthDesired);

  var month2 = new Date("2021-03-01");
  var listAmt2 = RndList(10);
  var total2 = SumOfList(listAmt2);
  var data2 = mockDatabase(10, listAmt2, "Ibuprofen", month2);

  var listAmt3 = RndList(3);
  var total3 = SumOfList(listAmt3);
  var data3 = mockDatabase(3, listAmt3, "Tylenol", monthDesired);

  var listAmt4 = RndList(10);
  var total4 = SumOfList(listAmt4);
  var data4 = mockDatabase(10, listAmt4, "Panadol", monthDesired);

  var month5 = new Date("2021-04-01");
  var listAmt5 = RndList(10);
  var total5 = SumOfList(listAmt5);
  var data5 = mockDatabase(10, listAmt5, "Panadol", month5);

  var data = data1.concat(data2).concat(data3).concat(data4).concat(data5);

  var expectedResult = {Panadol: total1 + total4, Tylenol: total3};

  expect(processData(data, monthDesired)).toStrictEqual(expectedResult);
});