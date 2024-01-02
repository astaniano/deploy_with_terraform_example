# ---------------------
# Variables
# ---------------------
HOST=127.0.0.1
PORT=3000

# ---------------------
# API calls block below
# ---------------------
u/signup:
	curl -X POST $(HOST):$(PORT)/v1/user/signup \
	-H "Content-type: application/json" \
    -d '{"password": "bigsecret", "email": "ff@gmail.com"}'	| python3 -m json.tool

