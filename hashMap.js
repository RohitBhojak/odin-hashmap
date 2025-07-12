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
      let ptr = this.bucketArray[HASH_CODE];
      while (ptr !== null) {
        if (ptr.key === key) {
          ptr.value = value;
          return;
        }
        if (ptr.next === null) break;
      }

      ptr.next = new Node(key, value);
    }
  }

  get(key) {
    const HASH_CODE = this.#hash(key);
    let ptr = this.bucketArray[HASH_CODE];
    while (ptr !== null && ptr.key !== key) {
      ptr = ptr.next;
    }
    return ptr;
  }
}
