import http from "k6/http";
import { check } from "k6";

export default function() {
  let res = http.get(`http://34.221.230.9:3004`);

  check(res, {
    "status was 200": r => r.status == 200
  });
}
