FROM ubuntu:16.04

RUN apt -yqq update
RUN apt -yqq install python3-pip curl git
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt install -yq nodejs
RUN npm install -g bower

ADD . /opt/ths-client
WORKDIR /opt/ths-client


RUN bower install --allow-root
RUN pip3 install -r requirements.txt



# expose port
# EXPOSE 5000

# start app
RUN python3 ./setup.py build
RUN python3 ./setup.py install

CMD [ "python3", "./run.py" ]
