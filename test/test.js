import http from "k6/http";
import { check } from "k6";

export default function() {
  let res = http.get(`http://54.191.22.251:${__ENV.PORT}`);

  check(res, {
    "status was 200": r => r.status == 200
  });
}
