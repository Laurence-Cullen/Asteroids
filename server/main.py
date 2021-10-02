import subprocess

from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from load_env import load_env_variables

ENVIRON = load_env_variables()


class AngleVector(BaseModel):
    altitude: float
    azimuth: float


app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/light_curve")
async def light_curve(
        stl_file: bytes = File(...),
        light_vec: AngleVector = Form(...),
        rot_axis: AngleVector = Form(...)
):
    pass


def make_blend_file():
    subprocess.run([ENVIRON["BLENDER_PATH"], "-b", "-P", ENVIRON["SCRIPT_PATH"]])


def main():
    print(ENVIRON["BLENDER_PATH"])


if __name__ == '__main__':
    main()
