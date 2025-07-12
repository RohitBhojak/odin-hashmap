import HashMap from "./hashMap.js";

const map = new HashMap();

for (let i = 97; i < 123; i++) {
  const char = String.fromCharCode(i);
  map.set(char, i - 97);
}

map.set("a", "new value");

console.log(map.get("a"));
