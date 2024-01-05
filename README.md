For api calls please look into Makefile

temp notes:

curl -i -X POST 16.170.236.220:80/v1/user/signup \
	-H "Content-type: application/json" \
    -d '{"password": "bigsecret", "email": "ff@gmail.com"}'

curl 16.171.177.119:80/v1/user


psql "host=main-db1.cbr8sqx7ajlk.eu-north-1.rds.amazonaws.com port=5432 dbname=ha user=root sslrootcert=eu-north-1-bundle.pem sslmode=verify-full"

psql -U root -h main-db1.cbr8sqx7ajlk.eu-north-1.rds.amazonaws.com -p 5432 ha

DATABASE_URL=postgres://root:rootroot@main-db1.cbr8sqx7ajlk.eu-north-1.rds.amazonaws.com:5432/ha

terraform apply -var-file="secret.tfvars"
