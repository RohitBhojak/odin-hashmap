class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export default class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.bucketArray = new Array(this.capacity);
    this.bucketArray.fill(null);
  }

  #hash(key) {
    let hashCode = 0;
    const PRIME_NUMBER = 29;
    for (let i = 0; i < key.length; i++) {
      hashCode += PRIME_NUMBER * hashCode + key.charCodeAt(i);
      hashCode %= this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const HASH_CODE = this.#hash(key);
    if (this.bucketArray[HASH_CODE] === null) {
      // empty bucket
      this.bucketArray[HASH_CODE] = new Node(key, value);
    } else {
      let current = this.bucketArray[HASH_CODE];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }
        if (current.next === null) break;
      }

      current.next = new Node(key, value);
    }
  }

  get(key) {
    const HASH_CODE = this.#hash(key);
    let current = this.bucketArray[HASH_CODE];
    while (current && current.key !== key) {
      current = current.next;
    }
    return current;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const HASH_CODE = this.#hash(key);
    let current = this.bucketArray[HASH_CODE];

    if (current && current.key === key) {
      this.bucketArray[HASH_CODE] = current.next;
      return true;
    }

    let prev = null;

    while (current && current.key !== key) {
      prev = current;
      current = current.next;
    }

    if (current && current.key === key) {
      prev.next = current.next;
      return true;
    }

    return false;
  }
}
