import http from "k6/http";
import { check } from "k6";

export default function() {
  let res = http.get(`http://52.27.92.223:3004`, { tags: { env: "release" } });

  check(
    res,
    {
      "status was 200": r => r.status == 200
    },
    { env: "release" }
  );
}
