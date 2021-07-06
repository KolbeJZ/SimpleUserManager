git clone https://github.com/KolbeJZ/SimpleUserManagerDocker.git

docker build -t this_lab:1.0 .

docker run -d --rm --name this_app -p 3000:3000 this_lab:1.0

run http://localhost:3000
