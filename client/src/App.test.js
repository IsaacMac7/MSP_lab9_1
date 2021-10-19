import {jest} from '@jest/globals';
import defaultExport from './ExtractSales';
import axios from "axios";

jest.mock('./ExtractSales');
console.log(defaultExport);
/*
test('Extract user from one date', () => {
  expect(ExtractSales.App('2021-02-01')).toStrictEqual(new Object());
});
*/