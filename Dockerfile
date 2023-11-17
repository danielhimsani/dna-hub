FROM python:3.8

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 80
COPY . .
COPY client/dist dist/
CMD ["python", "main_server.py"]