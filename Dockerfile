#Start with the node base image
FROM node:16.3.0

#Metadata information on the image
LABEL maintainer="Kolbe Zimmerman"
LABEL description ="Image Lab Project"
LABEL cohort ="Cohort 12"
LABEL animal="Lion"

#Set the working folder that will contain our node application. This command also
#set the current work directory in the container to /app
WORKDIR /app

#Copy the files from the locat systems current directory in to containers
# current directory, which is /app as set by the WORKDIR command above.
COPY . .

#The application will listen on port 3000 inside the container.
EXPOSE 3000

#RUn the npm install command to install all the supported Node modules that 
#are listed in the package.json file.
RUN npm install

#Command to run when the container starts
CMD ["npm","start"]