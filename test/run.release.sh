#!/bin/bash

k6 run --vus 1000 --duration 60s test.release.js --out influxdb=http://18.237.21.121:8086/demo