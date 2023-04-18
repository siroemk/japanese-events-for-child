const { Main } = require('./index');
const { NumberPrompt, Select } = require('enquirer');

jest.mock('enquirer', () => {
  return {
    NumberPrompt: jest.fn(),
    Select: jest.fn(),
  };
});

const runTestWithInputs = async (birthDate, gender) => {
  NumberPrompt.mockImplementation(() => {
    return {
      run: () => Promise.resolve(birthDate),
    };
  });

  Select.mockImplementation(() => {
    return {
      run: () => Promise.resolve(gender),
    };
  });

  const main = new Main();
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

  await main.run();

  return consoleSpy;
};

describe('Test user inputs', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should correctly handle user inputs and display all events for a boy', async () => {
    const consoleSpy = await runTestWithInputs(20220101, '男の子');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お誕生日　　　　　　　　　　2021/12/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お宮参り　　　　　　　　　　2021/12/31'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お食い初め　　　　　　　　　2022/03/10'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('初節句　　　　　　　　　　　2022/05/05'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ハーフバースデー　　　　　　2022/06/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('七五三（５才）　　　　　　　2027/11/15'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('小学校入学　　　　　　　　　2028/04/01'));

    // For a boy, the Shichi-Go-San events for 3-year-old and 7-year-old should not be displayed
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('七五三（３才）　　　　　　　2025/11/15'));
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('七五三（７才）　　　　　　　2029/11/15'));

    consoleSpy.mockRestore();
  });

  test('Should correctly handle user inputs and display all events for a girl', async () => {
    const consoleSpy = await runTestWithInputs(20201231, '女の子');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お誕生日　　　　　　　　　　2020/12/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お宮参り　　　　　　　　　　2021/01/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('桃の節句　　　　　　　　　　2021/03/03'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お食い初め　　　　　　　　　2021/03/10'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ハーフバースデー　　　　　　2021/05/31'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('七五三（３才）　　　　　　　2023/11/15'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('小学校入学　　　　　　　　　2027/04/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('七五三（７才）　　　　　　　2027/11/15'));

    // For a girl, the Shichi-Go-San event for 5-year-old should not be displayed
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('七五三（５才）　　　　　　　2025/11/15'));

    consoleSpy.mockRestore();
  });

  test('Should correctly handle user inputs and display all events when gender is not specified', async () => {
    const consoleSpy = await runTestWithInputs(20230401, '回答しない');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お誕生日　　　　　　　　　　2020/12/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お宮参り　　　　　　　　　　2021/01/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('桃の節句　　　　　　　　　　2021/03/03'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('お食い初め　　　　　　　　　2021/03/10'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('ハーフバースデー　　　　　　2021/05/31'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('七五三（３才）　　　　　　　2023/11/15'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('小学校入学　　　　　　　　　2027/04/01'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('七五三（７才）　　　　　　　2027/11/15'));

    consoleSpy.mockRestore();
  });

  test('Should return an error when an invalid month is entered', async () => {
    const consoleSpy = await runTestWithInputs(20001301, '男の子');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('入力された誕生日は存在しませんでした...'));

    consoleSpy.mockRestore();
  });

  test('Should return an error when an invalid date is entered', async () => {
    const consoleSpy = await runTestWithInputs(20000540, '女の子');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('入力された誕生日は存在しませんでした...'));

    consoleSpy.mockRestore();
  });

  test('Should return an error when a date with other than 8 digits is entered', async () => {
    const consoleSpy = await runTestWithInputs(200005400, '回答しない');

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('誕生日が不明です...8桁で入力してください'));

    consoleSpy.mockRestore();
  });
});
