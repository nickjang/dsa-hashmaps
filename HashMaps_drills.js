const HashMap = require('./hashmap');

/**
 * 1. Create a HashMap class
 */
function main() {
  const lotr = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  lotr.set('Hobbit', 'Bilbo');
  lotr.set('Hobbit', 'Frodo');
  lotr.set('Wizard', 'Gandalf');
  lotr.set('Human', 'Aragorn');
  lotr.set('Elf', 'Legolas');
  lotr.set('Maiar', 'The Necromancer');
  lotr.set('Maiar', 'Sauron');
  lotr.set('RingBearer', 'Gollum');
  lotr.set('LadyOfLight', 'Galadriel');
  lotr.set('HalfElven', 'Arwen');
  lotr.set('Ent', 'Treebeard');
  console.log(lotr);
  /**
   * The old values are replaced. The capacity is 24 because it started at 8, 
   * and when the table was more than half full, the table resized to by size ratio (3).
   */
}
//main();

/**
 * 2. WhatDoesThisDo
      const WhatDoesThisDo = function () {
        let str1 = 'Hello World.';
        let str2 = 'Hello World.';
        let map1 = new HashMap();
        map1.set(str1, 10);
        map1.set(str2, 20);
        let map2 = new HashMap();
        let str3 = str1;
        let str4 = str2;
        map2.set(str3, 20);
        map2.set(str4, 10);

        console.log(map1.get(str1));
        console.log(map2.get(str3));
      }
 * The output is 20 and 10 because the keys are reset to new values in each map.
 */

/**
 * 3. Demonstrate understanding of Hash maps
 * 1)
 *   0. 22
 *   1. 10
 *   2. 88
 *   3.
 *   4. 4
 *   5. 15
 *   6. 28
 *   7. 17
 *   8. 59
 *   9. 31
 *   10.
 *
 * 2)
 *   0.
 *   1. 28 -> 19 -> 10
 *   2. 20
 *   3. 12
 *   4.
 *   5. 5
 *   6. 15 -> 33
 *   7.
 *   8. 17
 */

/**
 * 4.Remove duplicates
 * 'google' -> 'gole'
 */
function removeDuplicates(str) {
  const visited = {};
  let newString = '';
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (visited[char]) continue;
    newString += char;
    visited[char] = true;
  }
  return newString;
}
//console.log(removeDuplicates('google all that you think can think of'));

/**
 * 5. Any permutation is a palidrome
 * 'acecarr' -> true
 * 'north' -> false
 */
function anyPermutationIsAPalindrome(str) {
  const charCount = {};
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (charCount[char]) charCount[char]++;
    else charCount[char] = 1;
  }

  let hasOddCount = false;
  for (const count in charCount) {
    if (count % 2) {
      if (!hasOddCount) hasOddCount = true;
      else return false;
    }
  }
  return true;
}
//console.log(anyPermutationIsAPalindrome('acecarr'));

/**
 * 6. Anagram grouping
 * ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'] -> [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]
 */
function anagramGrouping(words) {
  const result = [];
  const groups = {};

  let sortedWord;
  for (const word of words) {
    sortedWord = word.split('').sort().join('');
    if (!groups[sortedWord]) groups[sortedWord] = [word];
    else groups[sortedWord].push(word);
  }
  for (const key in groups) result.push(groups[key]);
  return result;
}
//console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

/**
 * 7. Separate Chaining
 */
const LinkedList = require('./linkedlist');

class SeparateChainingHashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
  }

  get(key) {
    const list = this._hashTable[this._findSlot(key)];
    let currNode = list.head;
    while (currNode) {
      if (currNode.value.key === key)
        return currNode.value.value;
      currNode = currNode.next;
    }
    throw new Error('Key error');
  }

  set(key, value) {
    if (this.length + 1 > this._capacity) {
      this._resize(this._capacity * SeparateChainingHashMap.SIZE_RATIO);
    }
    //Find the slot where this key should be in
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this._hashTable[index] = new LinkedList();
    }

    const list = this._hashTable[index];
    let currNode = list.head;
    while (currNode) {
      if (currNode.value.key === key) {
        currNode.value.value = value;
        return;
      }
      currNode = currNode.next;
    }
    this.length++;
    list.insertFirst({ key, value });
  }

  delete(key) {
    const list = this._hashTable[this._findSlot(key)];

    if (!list.head) {
      throw new Error('Key error');
    } else if (list.head.value.key === key) {
      list.head = list.head.next;
      return;
    }

    let prevNode = list.head;
    let currNode = list.head.next;

    while (currNode) {
      if (currNode.value.key === key) {
        prevNode.next = currNode.next;
        currNode = currNode.next;
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
    throw new Error('Key error');
  }

  _findSlot(key) {
    return SeparateChainingHashMap._hashString(key) % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && slot.head) {
        const index = this._findSlot(slot.head.value.key);
        this._hashTable[index] = slot;
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}
SeparateChainingHashMap.SIZE_RATIO = 3;

function display(separateChainingHashMap) {
  console.log('length:', separateChainingHashMap.length);
  console.log('capacity:', separateChainingHashMap._capacity);

  console.log('[');
  for (const slot of separateChainingHashMap._hashTable) {
    if (!slot) console.log('  empty,');
    else {
      let str = '';

      if (slot.head === null)
        return '  head -> null,';
      else {
        str += `  (head -> ${slot.head.value.value})`;

        let currNode = slot.head.next;
        while (currNode) {
          str += ` -> ${currNode.value.value}`;
          currNode = currNode.next;
        }
        str += ' -> null,';
        console.log(str);
      }
    }
  }
  console.log(']');
}

const lotr = new SeparateChainingHashMap();
lotr.set('Hobbit', 'Bilbo');
lotr.set('Hobbit', 'Frodo');
lotr.set('Wizard', 'Gandalf');
lotr.set('Human', 'Aragorn');
lotr.set('Elf', 'Legolas');
lotr.set('Maiar', 'The Necromancer');
lotr.set('Maiar', 'Sauron');
lotr.set('RingBearer', 'Gollum');
lotr.set('LadyOfLight', 'Galadriel');
lotr.set('HalfElven', 'Arwen');
lotr.set('Ent', 'Treebeard');
display(lotr);