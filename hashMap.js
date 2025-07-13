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
    this.size = 0;
  }

  #hash(key) {
    let hashCode = 0;
    const PRIME_NUMBER = 29;
    for (let i = 0; i < key.length; i++) {
      hashCode = (PRIME_NUMBER * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  #grow() {
    this.capacity *= 2;
    const entries = this.entries();
    this.bucketArray = new Array(this.capacity);
    this.bucketArray.fill(null);
    this.size = 0;
    for (let entry of entries) {
      this.set(...entry);
    }
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
        current = current.next;
      }

      current.next = new Node(key, value);
    }
    this.size++;
    if (this.size / this.capacity > this.loadFactor) {
      this.#grow();
    }
  }

  get(key) {
    const HASH_CODE = this.#hash(key);
    let current = this.bucketArray[HASH_CODE];
    while (current && current.key !== key) {
      current = current.next;
    }
    return current ? current.value : null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const HASH_CODE = this.#hash(key);
    let current = this.bucketArray[HASH_CODE];

    if (current && current.key === key) {
      this.bucketArray[HASH_CODE] = current.next;
      this.size--;
      return true;
    }

    let prev = null;

    while (current && current.key !== key) {
      prev = current;
      current = current.next;
    }

    if (current && current.key === key) {
      prev.next = current.next;
      this.size--;
      return true;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.bucketArray.fill(null);
    this.size = 0;
  }

  keys() {
    const arr = [];
    for (let bucket of this.bucketArray) {
      while (bucket) {
        arr.push(bucket.key);
        bucket = bucket.next;
      }
    }
    return arr;
  }

  values() {
    const arr = [];
    for (let bucket of this.bucketArray) {
      while (bucket) {
        arr.push(bucket.value);
        bucket = bucket.next;
      }
    }
    return arr;
  }

  entries() {
    const arr = [];
    for (let bucket of this.bucketArray) {
      while (bucket) {
        arr.push([bucket.key, bucket.value]);
        bucket = bucket.next;
      }
    }
    return arr;
  }
}
