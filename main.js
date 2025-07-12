import HashMap from "./hashMap.js";

const map = new HashMap();

for (let i = 0; i < 26; i++) {
  const char = String.fromCharCode(i + 97);
  map.set(char, i);
}

// map.set("a", "new value");

// console.log(map.remove("q"));
// console.log(map.remove("a"));
console.log(map.get("a"));
console.log(map.get("q"));
console.log(map.has("a"));
console.log(map.has("q"));
console.log(map.has("ab"));

console.log(map.length());
console.log(map.keys());
console.log(map.values());
console.log(map.entries());
