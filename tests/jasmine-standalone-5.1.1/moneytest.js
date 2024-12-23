import { formateCrurrency } from "../../script/utils/money.js";

describe('test suait: FormateCurrency', () => {
  it('converts cents to dollars', () => {
    expect(formateCrurrency(2095)).toEqual('20.95');
  });

  it('work with Zero', () => {
    expect(formateCrurrency(0)).toEqual('0.00');
  });

  it('roundof to nearest value', () => {
    expect(formateCrurrency(2000.5)).toEqual('20.01');
  });
});