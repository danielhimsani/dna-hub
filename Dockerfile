FROM python:3.8

EXPOSE 80
COPY server/* .
RUN pip install -r requirements.txt
COPY client/dist dist/
CMD ["python", "main_server.py"]