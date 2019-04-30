import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "300s"
};
var number = Math.floor(Math.random() * 10)
export default function() {
  http.get(`http://localhost:3004/api/restaurants/${number}/reviews`);
 // sleep(1);
};

