function keepaTimeToUnixEpoch(time: number): number {
  return (time + 21564000) * 60000;
}

export function keepaTimeToDateString(time: number): string {
  if (!time) return null;

  const date = new Date(keepaTimeToUnixEpoch(time));
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  return formatter.format(date);
}

export function dateToStandardFormat(dateArg: string | Date): string {
  const date = new Date(dateArg);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  return formatter.format(date);
}

export function dateStringToKeepaTime(date: string): number {
  if (!date) return null;

  return new Date(date).getTime() / 60000 - 21564000;
}

export function keepaPriceToStdFormat(input: number): string {
  if (!input) return null;

  const inputStr = input.toString();
  if (inputStr.length < 3) return null;

  return inputStr.slice(0, -2) + '.' + inputStr.slice(-2);
}

export function findPreciseHistoricalPricing(
  pricingArray: number[],
  targetDate: string,
): { date: string; price: string } {
  const targetTime = dateStringToKeepaTime(targetDate);

  for (let i = 0; i < pricingArray.length; i += 2) {
    const currentDate = pricingArray[i];
    const currentPrice = pricingArray[i + 1];

    if (
      currentDate >= targetTime - 360 &&
      currentDate <= targetTime + 360 &&
      currentPrice !== -1
    ) {
      const formattedDate = keepaTimeToDateString(currentDate);
      const formattedPrice = keepaPriceToStdFormat(currentPrice);

      return { date: formattedDate, price: formattedPrice };
    }
  }

  console.log('No precise price found');

  return { date: null, price: null };
}

export function formatDate(date: string): string | null {
  if (!date) return null;

  const [day, month, year] = date.split('/');
  const formattedDate = `${year}-${month}-${day}`;
  const dateObject = new Date(formattedDate).toISOString();

  return dateObject;
}

export function getLastPrice(prices: string[]): string {
  for (let i = prices.length - 1; i >= 0; i--) {
    if (prices[i] !== null) {
      return prices[i];
    }
  }
  return null;
}
