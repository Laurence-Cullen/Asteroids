FROM continuumio/miniconda3

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

RUN conda install -c conda-forge opencv

RUN apt update

RUN apt --yes install blender

RUN apt --yes install ffmpeg

COPY *.py /code/

ENV BLENDER_PATH=blender

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
