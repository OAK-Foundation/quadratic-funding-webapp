import _ from 'lodash';
import { WsProvider, ApiPromise } from '@polkadot/api';
import qfConfig from '../../quadraticFunding/config'

/**
 * Ellipsis a address
 * For Example, address = '0xe62278ac258bda2ae6e8EcA32d01d4cB3B631257', showLength = 6, return '0xe622...631257'
 * @param {*} address, an address
 * @param {*} showLength, the length of shown characters at the start and the end
 */
export const ellipsisAddress = (address, showLength = 8) => {
  if (!address) {
    return '';
  }
  const { length } = address;
  if (length <= showLength * 2) {
    return address;
  }
  return `${address.slice(0, showLength)}...${address.slice(
    length - showLength,
    length
  )}`;
};

// Format unit to OAK number
export const unitToNumber = (unit) => {
  const arrs = unit.split(' ');
  let magnification = 1;
  if (arrs[1] === 'KOAK') {
    magnification = 1000;
  } else if (arrs[1] === 'MOAK') {
    magnification = 1000000;
  }
  return Number(arrs[0]) * magnification;
}

/**
 * number with thousand commas, maximum 2 fraction digits.
 * @param {*} num number/string
 * @returns formated text
 */
export const numberWithCommas = (num) => {
  num = _.toNumber(num);
  return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/**
 * Get grant matching amount
 * @param {*} contributions 
 * @returns matching value
 */
export const getMatching = (contributions) => {
  let sqrtValue = 0;
  _.forEach(contributions, (item) => {
    const value = unitToNumber(item.value);
    sqrtValue += Math.sqrt(value);
  });

  return sqrtValue ** 2;
};

let web3Api = null;

export const getWeb3Api = async() => {
  if (!web3Api) {
    const { endpoint, types } = qfConfig;
    const wsProvider = new WsProvider(endpoint);
    web3Api = await ApiPromise.create({
      provider: wsProvider,
      types,
    });
  }
  return web3Api;
}