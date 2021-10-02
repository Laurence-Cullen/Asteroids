import subprocess

from fastapi import FastAPI, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile
from PIL import Image, ImageStat

from load_env import load_env_variables
from jinja2 import Template

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


def make_blend_file(stl_path):
    with open(ENVIRON["SCRIPT_PATH"], mode="r") as file:
        script_template = Template(file.read())

    # create temp dir for cleaning up templated script
    with tempfile.TemporaryDirectory() as temp_dir_name:
        temp_script_path = f"{temp_dir_name}/temp_blender_script.py"

        blend_file_path = f"{temp_dir_name}/animation.blend"
        with open(temp_script_path, mode="w") as fp:
            rendered_script = script_template.render(
                stl_path=stl_path,
                blend_path=blend_file_path
            )

            fp.write(rendered_script)

        subprocess.run([ENVIRON["BLENDER_PATH"], "-b", "-P", temp_script_path])
        subprocess.run([ENVIRON["BLENDER_PATH"], "-b", blend_file_path, "-o", "//frames/###.TIFF", "-t", "1", "-a"])

        for frame in range(1, 361):
            file_name = f"{temp_dir_name}/frames/{str(frame).zfill(3)}.TIFF"
            image = Image.open(file_name)
            stats = ImageStat.Stat(image)
            pass


def main():
    make_blend_file(stl_path="/Users/laurence/dev/Asteroids/server/216kleopatra.stl")


if __name__ == '__main__':
    main()
